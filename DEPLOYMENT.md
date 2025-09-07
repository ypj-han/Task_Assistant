# 部署说明

## 开发环境部署

### 1. 环境准备

确保你的系统已安装：
- Node.js 16.0 或更高版本
- npm 或 yarn 包管理器

### 2. 克隆项目

```bash
git clone <repository-url>
cd task-decomposition-assistant
```

### 3. 安装依赖

```bash
npm install
```

### 4. 启动开发服务器

```bash
npm run dev
```

应用将在 `http://localhost:3000` 启动。

## 生产环境部署

### 1. 构建生产版本

```bash
npm run build
```

这将在 `dist` 目录生成生产版本的文件。

### 2. 部署到静态服务器

#### Nginx 配置示例

```nginx
server {
    listen 80;
    server_name your-domain.com;
    root /path/to/dist;
    index index.html;

    # 处理 React Router 的路由
    location / {
        try_files $uri $uri/ /index.html;
    }

    # 静态资源缓存
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # API 代理（如果需要后端服务）
    location /api {
        proxy_pass http://localhost:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

#### Apache 配置示例

在 `dist` 目录创建 `.htaccess` 文件：

```apache
RewriteEngine On
RewriteBase /
RewriteRule ^index\.html$ - [L]
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.html [L]
```

### 3. 部署到云平台

#### Vercel 部署

1. 安装 Vercel CLI：
```bash
npm i -g vercel
```

2. 部署：
```bash
vercel
```

#### Netlify 部署

1. 将构建文件上传到 Netlify
2. 设置构建命令：`npm run build`
3. 设置发布目录：`dist`
4. 设置重定向规则：`/* /index.html 200`

#### GitHub Pages 部署

1. 在 `package.json` 中添加：
```json
{
  "homepage": "https://yourusername.github.io/repository-name",
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}
```

2. 安装 gh-pages：
```bash
npm install --save-dev gh-pages
```

3. 部署：
```bash
npm run deploy
```

## 环境变量配置

创建 `.env` 文件：

```env
# API 配置
VITE_API_BASE_URL=https://your-api-domain.com/api

# 其他配置
VITE_APP_NAME=任务拆解助手
VITE_APP_VERSION=1.0.0
```

## 性能优化

### 1. 代码分割

项目已配置了自动代码分割，按需加载组件。

### 2. 静态资源优化

- 图片使用 WebP 格式
- 启用 gzip 压缩
- 设置适当的缓存头

### 3. 监控和分析

可以集成以下工具：
- Google Analytics
- Sentry（错误监控）
- Web Vitals 监控

## 安全考虑

### 1. HTTPS

生产环境必须使用 HTTPS。

### 2. 内容安全策略

在 `index.html` 中添加 CSP 头：

```html
<meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline';">
```

### 3. 环境变量

敏感信息使用环境变量，不要硬编码在代码中。

## 故障排除

### 常见问题

1. **路由不工作**
   - 确保服务器配置了正确的重定向规则
   - 检查 `basename` 配置

2. **API 请求失败**
   - 检查 CORS 配置
   - 验证 API 地址是否正确

3. **构建失败**
   - 检查 Node.js 版本
   - 清除 node_modules 重新安装

### 日志查看

开发环境查看浏览器控制台，生产环境查看服务器日志。

## 维护

### 定期更新

- 定期更新依赖包
- 监控安全漏洞
- 更新 Node.js 版本

### 备份

- 定期备份用户数据（如果使用数据库）
- 备份配置文件
- 备份构建文件 