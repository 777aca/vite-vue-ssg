# Vue 3 + TypeScript + Vite + ssg + unhead

- 用 Vite-SSG 编写一个 SSG 官网项目，了解了 SSG 项目的页面路由方式
- 编写可复用的多语言的 SSG 页面组件，通过路由切换实现语言切换功能
- 使用 unhead 为每个页面注入头部元信息，使得每个页面在搜索引擎与社交媒体上都能正确美观地展示
- 使用 @media 解决实现 SSG 静态页面的响应式中的问题，以及 Vuetify 网格布局在 SSG 响应式中的实践
- 优雅处理静态页面的 404 问题，避免软 404，提高页面收录质量和用户体验

## 页面目录结构

```
/pages
	/ja-jp
		index.vue
	/en-us
		index.vue
	index.vue     # zh-cn

```

## nginx 配置

```
server{
    listen 80;
    server_name xxx.com;
    rewrite ^/(.*)/$ /$1 permanent;
    
    location ~ /(css|js|img|font|assets)/{
        root /srv/dist;
        try_files $uri =404;
    }
    location /{
        root /srv/dist;
        index index.html;
        try_files $uri $uri.html $uri/index.html =404;
    }

    error_page 404 403 500 502 503 504 /404.html;

    location = /404.html {
        root /srv/dist;
    }
}

```