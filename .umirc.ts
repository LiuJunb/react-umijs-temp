import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  // 1.yarn add @umijs/plugin-qiankun -D  ; 2. slave:{}  3.package.json name 4.app.ts
  // 会自动在路由前面添加一个: 前缀
  qiankun: {
    slave: {},
  },
  routes: [
    // 重定向
    { path: '/', redirect: '/main/sys/dept' },
    // 登录页面
    { exact: true, path: '/login', component: '@/login/index' },
    // layouts
    {
      path: '/main',
      component: '@/layouts/index',
      routes: [
        // 用户系统-模块
        // 重定向
        { exact: true, path: '/main/sys', redirect: '/main/sys/dept' },
        // 默认第一个页面
        {
          exact: true,
          path: '/main/sys/dept',
          component: '@/pages/system/dept/index',
        },
        {
          exact: true,
          path: '/main/sys/menu',
          component: '@/pages/system/menu/index',
        },
        {
          exact: true,
          path: '/main/sys/role',
          component: '@/pages/system/role/index',
        },
        {
          exact: true,
          path: '/main/sys/user',
          component: '@/pages/system/user/index',
        },

        // 首页 - 模块
        { exact: true, path: '/main/home', component: '@/pages/home/index' },
      ],
    },
  ],
});
