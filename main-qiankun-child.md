## 6.
## 5.
## 4.
## 3.
## 2.

1.yarn add @umijs/plugin-qiankun -D  ; 2. slave:{}  3.package.json name 4.app.ts

## 1. 子系统-集成qinakun框架
1.安装
```bash
yarn add @umijs/plugin-qiankun -D
```

2.slave:{}
```js
import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  // 1.yarn add @umijs/plugin-qiankun -D  ; 2. slave:{}  3.package.json name 4.app.ts
  // 会自动在路由前面添加一个: package.json name 前缀
  qiankun: {
    slave: {}
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

```

3.package.json name

```json
{
  "name": "fsweb",
  "private": true,
  "scripts": {
    "start": "umi dev",
    "build": "umi build",
    "postinstall": "umi generate tmp",
    "prettier": "prettier --write '**/*.{js,jsx,tsx,ts,less,md,json}'",
    "test": "umi-test",
    "test:coverage": "umi-test --coverage"
  },
  "gitHooks": {
    "pre-commit": "lint-staged"
  },
  "lint-staged": {
    "*.{js,jsx,less,md,json}": [
      "prettier --write"
    ],
    "*.ts?(x)": [
      "prettier --parser=typescript --write"
    ]
  },
  "dependencies": {
    "@ant-design/pro-layout": "^6.5.0",
    "@ant-design/pro-table": "^2.23.0",
    "@umijs/preset-react": "1.x",
    "umi": "^3.3.4"
  },
  "devDependencies": {
    "@types/react": "^16.9.0",
    "@types/react-dom": "^16.9.0",
    "@umijs/plugin-qiankun": "^2.19.0",
    "@umijs/test": "^3.3.4",
    "lint-staged": "^10.0.7",
    "prettier": "^2.2.0",
    "react": "^16.12.0",
    "react-dom": "^16.12.0",
    "typescript": "^4.1.2",
    "yorkie": "^2.0.0"
  }
}

```

4.app.ts

```js
export const qiankun = {
  // 应用加载之前
  async bootstrap(props:any) {
    console.log('fsweb bootstrap', props);
  },
  // 应用 render 之前触发
  async mount(props:any) {
    console.log('fsweb mount', props);
  },
  // 应用卸载之后触发
  async unmount(props:any) {
    console.log('fsweb unmount', props);
  },
};
```


