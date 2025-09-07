import React, { useState, useRef } from 'react';
import { Mic, MicOff, Send, Loader2 } from 'lucide-react';
import { apiClient } from '../utils/api';
import { StorageManager } from '../utils/storage';
import { generateId, validateGoalInput } from '../utils/helpers';
import { Goal, Task, DecompositionRequest } from '../types';
import { useLanguage } from '../contexts/LanguageContext';
import toast from 'react-hot-toast';

interface GoalInputProps {
  onGoalCreated: (goal: Goal) => void;
}

const GoalInput: React.FC<GoalInputProps> = ({ onGoalCreated }) => {
  const { t } = useLanguage();
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const [audioChunks, setAudioChunks] = useState<Blob[]>([]);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const validation = validateGoalInput(input);
    if (!validation.isValid) {
      toast.error(validation.error!);
      return;
    }

    setIsLoading(true);
    try {
      const request: DecompositionRequest = {
        goal: input.trim(),
      };

      const response = await apiClient.decomposeGoal(request);
      
      const goal: Goal = {
        id: generateId(),
        title: response.goal,
        tasks: response.tasks.map(task => ({
          ...task,
          id: generateId(),
          isCompleted: false,
          createdAt: new Date(),
        })),
        createdAt: new Date(),
        isCompleted: false,
        category: response.category,
      };

      StorageManager.addGoal(goal);
      onGoalCreated(goal);
      setInput('');
      toast.success(t('messages.goalCreated'));
    } catch (error) {
      console.error('创建目标失败:', error);
      toast.error(t('messages.createGoalFailed'));
    } finally {
      setIsLoading(false);
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      const chunks: Blob[] = [];

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunks.push(e.data);
        }
      };

      recorder.onstop = async () => {
        const audioBlob = new Blob(chunks, { type: 'audio/wav' });
        setIsLoading(true);
        try {
          const response = await apiClient.transcribeAudio(audioBlob);
          setInput(response.text);
          toast.success(t('messages.voiceRecognitionComplete'));
        } catch (error) {
          console.error('语音识别失败:', error);
          toast.error(t('messages.voiceRecognitionFailed'));
        } finally {
          setIsLoading(false);
        }
      };

      recorder.start();
      setMediaRecorder(recorder);
      setAudioChunks(chunks);
      setIsRecording(true);
      toast.success(t('messages.recordingStarted'));
    } catch (error) {
      console.error('无法访问麦克风:', error);
      toast.error(t('messages.microphoneAccessFailed'));
    }
  };

  const stopRecording = () => {
    if (mediaRecorder && isRecording) {
      mediaRecorder.stop();
      mediaRecorder.stream.getTracks().forEach(track => track.stop());
      setIsRecording(false);
      toast.success(t('messages.recordingStopped'));
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="card max-w-2xl mx-auto">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          {t('goalInput.title')}
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          {t('goalInput.subtitle')}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={t('goalInput.placeholder')}
            className="input-field min-h-[120px] resize-none"
            disabled={isLoading}
          />
          
          <div className="absolute bottom-3 right-3 flex items-center space-x-2">
            <button
              type="button"
              onClick={isRecording ? stopRecording : startRecording}
              disabled={isLoading}
              className={`p-2 rounded-lg transition-colors ${
                isRecording
                  ? 'bg-red-100 text-red-600 hover:bg-red-200'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
              aria-label={isRecording ? '停止录音' : '开始录音'}
            >
              {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
            </button>
            
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Send className="w-4 h-4" />
              )}
              <span>{t('goalInput.decomposeGoal')}</span>
            </button>
          </div>
        </div>

        {isRecording && (
          <div className="flex items-center justify-center space-x-2 text-red-600">
            <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse"></div>
            <span className="text-sm">{t('goalInput.recording')}</span>
          </div>
        )}
      </form>

      <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
        <h3 className="font-medium text-blue-900 dark:text-blue-100 mb-2">
          {t('goalInput.tips.title')}
        </h3>
        <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
          <li>{t('goalInput.tips.tip1')}</li>
          <li>{t('goalInput.tips.tip2')}</li>
          <li>{t('goalInput.tips.tip3')}</li>
          <li>{t('goalInput.tips.tip4')}</li>
        </ul>
      </div>
    </div>
  );
};

export default GoalInput; 