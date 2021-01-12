# umi project

## Getting Started

Install dependencies,

```bash
$ yarn
```

Start the dev server,

```bash
$ yarn start
```

## 4.配置菜单的样式
```js
import React, { useState } from 'react';
import styles from './index.less';
import ProLayout from '@ant-design/pro-layout';
import { route  } from './p-config/_default_menus';
import { history } from 'umi';
// 全局布局组件
export default (props:any) => {

  const [pathname, setPathname] = useState('/child/sys/dept');
  return (
    <div className={styles.layout}>
      <ProLayout
         menuItemRender={(item, dom) => 
          <div
          onClick={() => {
            if(item.path === '/child/sys'){
              history.push('/child/sys/dept');
              setPathname('/child/sys/dept');
            } else {
              history.push(item.path || '/child/sys/dept');
              setPathname(item.path || '/child/sys/dept');
            }
           
          }}
          >pre {dom}</div>
         }
         subMenuItemRender={(_, dom) => <div>pre {dom}</div>}
         route={route}
         location={{
          pathname
         }}

         layout="mix"
         fixedHeader={true}
         fixSiderbar={true}
         splitMenus={true}

         navTheme="light"

      >
        { props.children }
      </ProLayout>
    </div>
  );
}

```

## 3.配置左边的菜单

layout/index.tsx
```js
import React, { useState } from 'react';
import styles from './index.less';
import ProLayout from '@ant-design/pro-layout';
import { route  } from './p-config/_default_menus';
import { history } from 'umi';
// 全局布局组件
export default (props:any) => {

  const [pathname, setPathname] = useState('/child/sys/dept');
  return (
    <div className={styles.layout}>
      <ProLayout
         menuItemRender={(item, dom) => 
          <div
          onClick={() => {
            history.push(item.path || '/child/sys/dept');  
            setPathname(item.path || '/child/sys/dept');
          }}
          >pre {dom}</div>
         }
         subMenuItemRender={(_, dom) => <div>pre {dom}</div>}
         route={route}
         location={{
          pathname
         }}

      >
        { props.children }
      </ProLayout>
    </div>
  );
}

```
p-config/_default_menus.ts
```js
import React from 'react';
import { SmileOutlined, CrownOutlined, TabletOutlined } from '@ant-design/icons';

const route = {
    path: '/',
    routes: [
      {
        path: '/child/home',
        name: '首页',
        // icon: <CrownOutlined />,
        // component: './Welcome',
      },
      {
        path: '/child/sys',
        name: '系统管理',
        access: 'canAdmin',
        // component: './Admin',
        routes: [
          {
            path: '/child/sys/dept',
            name: '部门管理',
            // component: './Welcome',
          },
          {
            path: '/child/sys/menu',
            name: '菜单管理',
            // component: './Welcome',
          },
          {
            path: '/child/sys/role',
            name: '角色管理',
            // component: './Welcome',
          },
          {
            path: '/child/sys/user',
            name: '用户管理',
            // component: './Welcome',
          }
        ],
      }
    ]
}
export {
    route
}

```



## 2.集成pro-layout

1.启用插件
```js
  "dependencies": {
    "@ant-design/pro-layout": "^6.5.0",
    ....
  },
```

2.使用pro-layout的组件

layout/index.tsx
```js
import React from 'react';
import styles from './index.less';
import ProLayout from '@ant-design/pro-layout';
// 全局布局组件
export default (props:any) => {
  return (
    <div className={styles.layout}>
      <ProLayout
        
      >
        { props.children }
      </ProLayout>
    </div>
  );
}

```

src/gloable.less
需要重新启动
```less
body {
    &>div{
        height: 100%;
    }
}
```


## 1.新建路由

.umirc.ts 配置
```js

import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    // 重定向
    { path: '/', redirect: '/child/sys/dept'  },
    // 登录页面
    { exact: true, path: '/login', component: '@/login/index' },
    // layouts
    { path: '/child', component: '@/layouts/index', 
      routes: [
        // 用户系统-模块
        // 重定向
        { exact: true, path: '/child/sys', redirect: '/child/sys/dept'},
        // 默认第一个页面
        { exact: true, path: '/child/sys/dept', component: '@/pages/system/dept/index'},
        { exact: true, path: '/child/sys/menu', component: '@/pages/system/menu/index' },
        { exact: true, path: '/child/sys/role', component: '@/pages/system/role/index' },
        { exact: true, path: '/child/sys/user', component: '@/pages/system/user/index' },

         // 首页 - 模块
        { exact: true, path: '/child/home', component: '@/pages/home/index' },
      ]
    },
    
  ],
});


```

目录结构
```js

src
├── layouts
│   ├── index.less
│   └── index.tsx
├── login
│   ├── index.less
│   └── index.tsx
└── pages
    ├── home
    │   ├── index.less
    │   └── index.tsx
    └── system
        ├── dept
        │   ├── index.less
        │   └── index.tsx
        ├── menu
        │   ├── index.less
        │   └── index.tsx
        ├── role
        │   ├── index.less
        │   └── index.tsx
        └── user
            ├── index.less
            └── index.tsx

```

layouts/index.tsx
```js

import React from 'react';
import styles from './index.less';

// 全局布局组件
export default (props:any) => {
  return (
    <div className={styles.layout}>
      { props.children }
    </div>
  );
}

```
