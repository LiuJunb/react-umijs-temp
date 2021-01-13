## 8.
## 7.
## 6.
## 5.
## 4.
## 3.
## 2.

## 1.基座-集成qinakun

```bash
yarn add @umijs/plugin-qiankun -D
```

http://localhost:8000 基座

http://localhost:8000/child/fsweb 子系统
http://localhost:8000/child/gyss 子系统
http://localhost:8000/child/zhmx 子系统
http://localhost:8000/child/sys 子系统


1.注册子应用信息  
2.配置 xxx 关联的路由
```js
import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  qiankun: {
    master: {
      // 1.注册子应用信息  2.配置 xxx 关联的路由
      apps: [
        {
          name: 'fsweb', // 唯一 id, 应用名称
          entry: '//localhost:7001', // html entry
        },
      ],
    },
  },
  routes: [
    // 重定向
    { path: '/', redirect: '/child/sys/dept' },
    // 登录页面
    { exact: true, path: '/login', component: '@/login/index' },
    // layouts
    {
      path: '/child',
      component: '@/layouts/index',
      routes: [
        // 用户系统-模块
        // 重定向
        { exact: true, path: '/child/sys', redirect: '/child/sys/dept' },
        // 默认第一个页面
        {
          exact: true,
          path: '/child/sys/dept',
          component: '@/pages/system/dept/index',
        },
        {
          exact: true,
          path: '/child/sys/menu',
          component: '@/pages/system/menu/index',
        },
        {
          exact: true,
          path: '/child/sys/role',
          component: '@/pages/system/role/index',
        },
        {
          exact: true,
          path: '/child/sys/user',
          component: '@/pages/system/user/index',
        },

        // 首页 - 模块
        { exact: true, path: '/child/home', component: '@/pages/home/index' },
        // 2.配置 fsweb 关联的路由
        {
          path: '/child/fsweb', // 子应用的路由
          microApp: 'fsweb', // 微应用名称
        },
      ],
    },
  ],
});

```




