# 使用 Node.js 16 版本的官方基础镜像
FROM node:16-alpine

# 设置工作目录为 /app
WORKDIR /app

# 复制 package.json 和 yarn.lock 到工作目录
COPY package.json yarn.lock ./

# 安装项目依赖
RUN yarn install --frozen-lockfile

# 复制项目所有文件到工作目录
COPY . .

# 编译项目（如果需要，取决于你的项目配置）
RUN yarn build

# 暴露应用程序运行的端口（通常是 3000）
EXPOSE 3002

# 指定启动应用程序的命令
CMD ["yarn", "start"]
