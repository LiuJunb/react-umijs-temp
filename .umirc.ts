import { defineConfig } from 'umi';

export default defineConfig({
  mock: false,
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    // 重定向
    { path: '/', redirect: '/child/sys/dept' },
    // 登录页面
    { exact: true, path: '/login', component: '@/login/index' },
    // 组件文档
    // { exact: true, path: '/~docs', component: '@/components/index' },
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
        // 用户
        {
          exact: true,
          path: '/child/sys/user',
          component: '@/pages/system/user/index',
        },
        // 用户详情
        {
          exact: true,
          path: '/child/sys/user/detail',
          component: '@/pages/system/user/detail/index',
        },
        // 新建、编辑用户
        {
          exact: true,
          path: '/child/sys/user/create',
          component: '@/pages/system/user/create/index',
        },

        // 首页 - 模块
        { exact: true, path: '/child/home', component: '@/pages/home/index' },
      ],
    },
  ],
  // https://github.com/ant-design/ant-design/blob/master/components/style/themes/default.less
  theme: {
    '@primary-color': '#3D84FD', // #3988FF
    '@layout-header-background': '#14305A',
  },
});
