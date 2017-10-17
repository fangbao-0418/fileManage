# 安装

npm install

# pm2 启动

```
npm install pm2 -g
pm2 start ./bin/www --watch 启动并进行监听
```

# debug
```
DEBUG=my-app pm2 start ./bin/www --watch
pm2 logs www
```
