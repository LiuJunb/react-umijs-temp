# umi project

## Getting Started

Install dependencies,

```bash
$ yarn
```

Install types

```bash
yarn add @umi/types --dev
```

Start the dev server,

```bash
$ yarn start
```
## 9.


## 8.


## 7.Umi 项目集成 dumi
https://d.umijs.org/zh-CN/guide/advanced#umi-%E9%A1%B9%E7%9B%AE%E9%9B%86%E6%88%90%E6%A8%A1%E5%BC%8F

```bash
yarn add @umijs/preset-dumi -dev
```

.umirc.ts
```js
 resolve: {
    includes: ['src/components'],
},
```


## 6.重写头部的样式

/layout/index.less

```less

@hheight: 60px; // 默认是 48px
// 头部导航栏的高度
@navHeight: @hheight;
// logo图片的高度
@logoHeight: @hheight;


// 重写antd 组件样式 https://pro.ant.design/docs/style-cn
/* 定义单个全局样式 */
// :global(.ant-pro-fixed-header) {
//   height: @navHeight !important;
// }

/* 定义多个全局样式 */
:global {
  .ant-layout{

    .ant-layout-header{
      // 左边头部
      height: @navHeight !important;
      // 左边头部 logo
      .logo{
        height: @logoHeight;
      }

      // 中间头部
      .ant-pro-top-nav-header-menu{
        line-height: @navHeight;
        // 有头部一级菜单（选中样式）
        .ant-menu-item-only-child:hover,
        .ant-menu-item-active,
        .ant-menu-item-selected{
          color: #3D84FD;
          font-size: 15px;
          background-color: transparent;
        }
      }
    }
  }

  // 菜单
  .ant-design-pro .ant-layout-sider-light{
    padding-top: @navHeight !important;
  }
}

.liu-pro-layout{

}



```

## 6.修改头部的logo

```jsx
<ProLayout
  logo={() => <img src="/icons/logo/logo2.png" className="logo"></img>}
  title = ''
>
</ProLayout>    
```

## 5. 编写部门页面

添加 @ant-design/pro-table
```json
yarn add @ant-design/pro-table
```

dept.tsx
```jsx
import React, { useRef } from 'react';
import { PlusOutlined, EllipsisOutlined } from '@ant-design/icons';
import { Button, Tag, Space, Menu, Dropdown } from 'antd';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable, { TableDropdown } from '@ant-design/pro-table';
import request from 'umi-request';
import styles from './index.less';
import { PageContainer } from '@ant-design/pro-layout';

type GithubIssueItem = {
  url: string;
  id: number;
  number: number;
  title: string;
  labels: {
    name: string;
    color: string;
  }[];
  state: string;
  comments: number;
  created_at: string;
  updated_at: string;
  closed_at?: string;
};

const columns: ProColumns<GithubIssueItem>[] = [
  {
    dataIndex: 'index',
    valueType: 'indexBorder',
    width: 48,
  },
  {
    title: '标题',
    dataIndex: 'title',
    copyable: true,
    ellipsis: true,
    tip: '标题过长会自动收缩',
    formItemProps: {
      rules: [
        {
          required: true,
          message: '此项为必填项',
        },
      ],
    },
    width: '30%',
  },
  {
    title: '状态',
    dataIndex: 'state',
    initialValue: 'open',
    filters: true,
    onFilter: true,
    valueType: 'select',
    valueEnum: {
      all: { text: '全部', status: 'Default' },
      open: {
        text: '未解决',
        status: 'Error',
      },
      closed: {
        text: '已解决',
        status: 'Success',
        disabled: true,
      },
      processing: {
        text: '解决中',
        status: 'Processing',
      },
    },
  },
  {
    title: '标签',
    dataIndex: 'labels',
    renderFormItem: (_, { defaultRender }) => {
      return defaultRender(_);
    },
    render: (_, record) => (
      <Space>
        {record.labels.map(({ name, color }) => (
          <Tag color={color} key={name}>
            {name}
          </Tag>
        ))}
      </Space>
    ),
  },
  {
    title: '创建时间',
    key: 'created_at',
    dataIndex: 'created_at',
    valueType: 'date',
  },
  {
    title: '操作',
    valueType: 'option',
    render: (text, record, _, action) => [
      <a
        key="editable"
        onClick={() => {
          action.startEditable?.(record.id);
        }}
      >
        编辑
      </a>,
      <a href={record.url} target="_blank" rel="noopener noreferrer" key="view">
        查看
      </a>,
      <TableDropdown
        key="actionGroup"
        onSelect={() => action.reload()}
        menus={[
          { key: 'copy', name: '复制' },
          { key: 'delete', name: '删除' },
        ]}
      />,
    ],
  },
];

const menu = (
  <Menu>
    <Menu.Item key="1">1st item</Menu.Item>
    <Menu.Item key="2">2nd item</Menu.Item>
    <Menu.Item key="3">3rd item</Menu.Item>
  </Menu>
);

export default (props: any) => {
  // return <div className={styles.dept}>dept page</div>;

  const actionRef = useRef<ActionType>();

  return (
    <PageContainer>
      <ProTable<GithubIssueItem>
        columns={columns}
        actionRef={actionRef}
        request={async (params = {}) =>
          request<{
            data: GithubIssueItem[];
          }>('https://proapi.azurewebsites.net/github/issues', {
            params,
          })
        }
        editable={{
          type: 'multiple',
        }}
        rowKey="id"
        search={{
          labelWidth: 'auto',
        }}
        pagination={{
          pageSize: 5,
        }}
        dateFormatter="string"
        headerTitle="高级表格"
        toolBarRender={() => [
          <Button key="button" icon={<PlusOutlined />} type="primary">
            新建
          </Button>,
          <Dropdown key="menu" overlay={menu}>
            <Button>
              <EllipsisOutlined />
            </Button>
          </Dropdown>,
        ]}
      />
    </PageContainer>
  );
};

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
