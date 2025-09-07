import { DecompositionRequest, DecompositionResponse, ApiError } from '../types';

// 配置选项
const CONFIG = {
  // 如果使用自己的后端API
  API_BASE_URL: (import.meta as any).env?.VITE_API_BASE_URL || '/api',
  
  // 如果直接使用OpenAI API
  OPENAI_API_KEY: (import.meta as any).env?.VITE_OPENAI_API_KEY,
  OPENAI_API_URL: 'https://api.openai.com/v1/chat/completions',
  
  // 使用模式：'backend' 或 'openai'
  API_MODE: (import.meta as any).env?.VITE_API_MODE || 'backend'
};

class ApiClient {
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${CONFIG.API_BASE_URL}${endpoint}`;
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        const errorData: ApiError = await response.json();
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('网络请求失败');
    }
  }

  private async openAIRequest<T>(messages: any[]): Promise<T> {
    if (!CONFIG.OPENAI_API_KEY) {
      throw new Error('OpenAI API key not configured');
    }

    const response = await fetch(CONFIG.OPENAI_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${CONFIG.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages,
        temperature: 0.7,
        max_tokens: 1000,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error?.message || 'OpenAI API request failed');
    }

    const data = await response.json();
    return data;
  }

  async decomposeGoal(request: DecompositionRequest): Promise<DecompositionResponse> {
    if (CONFIG.API_MODE === 'openai') {
      return this.decomposeGoalWithOpenAI(request);
    } else {
      return this.request<DecompositionResponse>('/decompose', {
        method: 'POST',
        body: JSON.stringify(request),
      });
    }
  }

  private async decomposeGoalWithOpenAI(request: DecompositionRequest): Promise<DecompositionResponse> {
    const systemPrompt = `你是一个专业的任务拆解助手，专门帮助ADHD用户将复杂目标拆解为可执行的小任务。

请遵循以下规则：
1. 将目标拆解为3-12个具体的小任务
2. 每个任务应该在5-30分钟内完成
3. 任务描述要具体、可操作
4. 按逻辑顺序排列任务
5. 为每个任务估算完成时间（分钟）
6. 根据目标内容自动分类（工作、学习、生活、健康、其他）

请以JSON格式返回结果，格式如下：
{
  "goal": "原始目标",
  "tasks": [
    {
      "title": "任务标题",
      "description": "任务描述",
      "estimatedTime": 15,
      "priority": "medium"
    }
  ],
  "estimatedTotalTime": 120,
  "category": "分类"
}`;

    const userPrompt = `请帮我拆解以下目标：${request.goal}`;

    const response = await this.openAIRequest<{
      choices: Array<{
        message: {
          content: string;
        };
      }>;
    }>([
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userPrompt }
    ]);

    try {
      const content = response.choices[0]?.message?.content;
      if (!content) {
        throw new Error('No response content');
      }

      // 尝试解析JSON响应
      const jsonMatch = content.match(/```json\s*([\s\S]*?)\s*```/) || 
                       content.match(/\{[\s\S]*\}/);
      
      if (!jsonMatch) {
        throw new Error('Invalid response format');
      }

      const parsed = JSON.parse(jsonMatch[1] || jsonMatch[0]);
      
      return {
        goal: parsed.goal || request.goal,
        tasks: parsed.tasks || [],
        estimatedTotalTime: parsed.estimatedTotalTime || 0,
        category: parsed.category || '其他'
      };
    } catch (error) {
      console.error('Failed to parse OpenAI response:', error);
      throw new Error('任务拆解失败，请重试');
    }
  }

  async transcribeAudio(audioBlob: Blob): Promise<{ text: string }> {
    if (CONFIG.API_MODE === 'openai') {
      return this.transcribeAudioWithOpenAI(audioBlob);
    } else {
      const formData = new FormData();
      formData.append('audio', audioBlob, 'recording.wav');
      
      return this.request<{ text: string }>('/transcribe', {
        method: 'POST',
        body: formData,
        headers: {}, // 让浏览器自动设置 Content-Type
      });
    }
  }

  private async transcribeAudioWithOpenAI(audioBlob: Blob): Promise<{ text: string }> {
    if (!CONFIG.OPENAI_API_KEY) {
      throw new Error('OpenAI API key not configured');
    }

    const formData = new FormData();
    formData.append('file', audioBlob, 'audio.wav');
    formData.append('model', 'whisper-1');

    const response = await fetch('https://api.openai.com/v1/audio/transcriptions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${CONFIG.OPENAI_API_KEY}`,
      },
      body: formData,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error?.message || '语音识别失败');
    }

    const data = await response.json();
    return { text: data.text };
  }

  async clearData(): Promise<{ message: string }> {
    return this.request<{ message: string }>('/clear-data', {
      method: 'POST',
    });
  }

  // 检查API配置
  checkConfiguration(): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (CONFIG.API_MODE === 'openai') {
      if (!CONFIG.OPENAI_API_KEY) {
        errors.push('OpenAI API key not configured');
      }
    } else if (CONFIG.API_MODE === 'backend') {
      if (!CONFIG.API_BASE_URL) {
        errors.push('Backend API URL not configured');
      }
    } else {
      errors.push('Invalid API mode');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }
}

export const apiClient = new ApiClient(); 