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

## 15.

## 14.

## 13.

## 12.

## 11.登录页面
安装依赖
```
yarn add @ant-design/pro-form@1.15.4
yarn add @ant-design/icons@4.5.0

```




## 10.demo案例
```jsx
import React, { useEffect }  from 'react';
import Slider from '../../components/slider';
import RecommendList from '../../components/list';
import Scroll from '../../base-ui/scroll';
import {
  Content
} from './style'

// 连接redux
import { connect } from "react-redux";
import * as actionTypes from './store/actionCreators';

function Recommend (props) {
   //mock 数据
  //  const bannerList = [1,2,3,4].map ((item,index) => {
  //   return { 
  //     imageUrl: "http://p1.music.126.net/ZYLJ2oZn74yUz5x8NBGkVA==/109951164331219056.jpg", 
  //     index
  //   }
  //  });


  // const recommendList = [1,2,3,4,5,6,7,8,9,10].map (item => {
  //   return {
  //     id: 1,
  //     picUrl: "https://p1.music.126.net/fhmefjUfMD-8qtj3JKeHbA==/18999560928537533.jpg",
  //     playCount: 17171122,
  //     name: "朴树、许巍、李健、郑钧、老狼、赵雷"
  //   }
  // });

  // 拿到数据
  const { bannerList, recommendList } = props;
  // 获取数据
  const { getBannerDataDispatch, getRecommendListDataDispatch } = props;
  
  useEffect (() => {
    getBannerDataDispatch ();
    getRecommendListDataDispatch ();
    //eslint-disable-next-line
  }, []);
  // 将 immutable 的数据转成 js 对象数据
  const bannerListJS = bannerList ? bannerList.toJS () : [];
  const recommendListJS = recommendList ? recommendList.toJS () :[];
  return (
  <Content>
    <Scroll className="list">
      <div>
        <Slider bannerList={bannerListJS}></Slider>
        <RecommendList recommendList={recommendListJS}></RecommendList>
      </div>
    </Scroll>
  </Content> 
  )
}

// 2.映射 Redux 全局的 state 到组件的 props 上
const mapStateToProps = (state) => ({
  // 不要在这里将数据 toJS
  // 不然每次 diff 比对 props 的时候都是不一样的引用，还是导致不必要的重渲染，属于滥用 immutable
  bannerList: state.getIn (['recommend', 'bannerList']),
  recommendList: state.getIn (['recommend', 'recommendList']),
});
// 1.映射 dispatch 到 props 上
const mapDispatchToProps = (dispatch) => {
  return {
    // 获取网络中的数据，存到redux中
    getBannerDataDispatch () {
      dispatch (actionTypes.getBannerList ());
    },
    getRecommendListDataDispatch () {
      dispatch (actionTypes.getRecommendList ());
    },
  }
};

// 将 ui 组件包装成容器组件
export default connect (mapStateToProps, mapDispatchToProps)(React.memo (Recommend));

// export default React.memo (Recommend);
```

## 9.编写头部组件

## 8.添加需要兼容的：目标浏览器

以后在使用到兼容的插件的时候，就会根据这个目标浏览器来转换代码

```bash
"browserslist": [
    "> 1%",
    "last 2 versions",
    "not ie <= 10"
]
```

## 7.集成编码规范

1.安装插件

```bash
yarn add @umijs/fabric --dev

```

2.新建配置文件

新建：.eslintrc.js

```js
module.exports = {
  extends: [require.resolve('@umijs/fabric/dist/eslint')],

  // in antd-design-pro
  globals: {
    ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION: true,
    page: true,
  },

  rules: {
    // your rules
  },
};
```

新建：.prettierrc.js

```js
const fabric = require('@umijs/fabric');

module.exports = {
  ...fabric.prettier,
};
```

新建：.stylelintrc.js

```js
module.exports = {
  extends: [require.resolve('@umijs/fabric/dist/stylelint')],
  rules: {
    // your rules
  },
};
```

新建：.eslintignore

```json

/lambda/
/scripts
/config
.history
public

dist
.umi
mock

```

新建：.prettierignore

```json
**/*.md
**/*.svg
**/*.ejs
**/*.html
package.json
.umi
.umi-production
.umi-test

/dist
.dockerignore
.DS_Store
.eslintignore
*.png
*.toml
docker
.editorconfig
Dockerfile*
.gitignore
.prettierignore
LICENSE
.eslintcache
*.lock
yarn-error.log
.history


```

3.vscode 安装插件

Prettier - Code formatter

ESLint

4.vscode 编辑 settings 文件

```json

{

    .....
    .....
    .....
    .....

    // "eslint.autoFixOnSave": false,
    "eslint.options": {
        "extensions": [
            ".js",
            ".jsx",
            ".tsx",
            ".vue"
        ]
    },
    "eslint.validate": [
        "javascript",
        "javascriptreact",
        {
            "language": "vue",
            "autoFix": true
        },
        {
            "language": "javascript",
            "autoFix": true
        },
        {
            "language": "javascriptreact",
            "autoFix": true
        },
        {
            "language": "typescript",
            "autoFix": true
        },
        {
            "language": "typescriptreact",
            "autoFix": true
        }
    ],
    "eslint.format.enable": true,
    "eslint.run": "onSave",
    "editor.codeActionsOnSave": {
        // eslint
        "source.fixAll.eslint": true,
        // stylelint
        "source.fixAll.stylelint": true,
    },
    // eslint
    // perttier format ( editor.formatOnSave:true 使用perttier格式化；为false使用eslint格式化 )
    "editor.formatOnSave": true,
    "editor.defaultFormatter": "SimonSiefke.prettier-vscode",
    // perttier


    .....
    .....
}
```

5.添加脚本

```bash

  {
      "lint": "umi g tmp && npm run lint:js && npm run lint:style && npm run lint:prettier",
      "lint-staged": "lint-staged",
      "lint-staged:js": "eslint --ext .js,.jsx,.ts,.tsx ",

      "lint:fix": "eslint --fix --cache --ext .js,.jsx,.ts,.tsx --format=pretty ./src && npm run lint:style",
      "lint:js": "eslint --cache --ext .js,.jsx,.ts,.tsx --format=pretty ./src",
      "lint:prettier": "prettier --check \"src/**/*\" --end-of-line auto",
      "lint:style": "stylelint --fix \"src/**/*.less\" --syntax less",

      "precommit": "lint-staged",
      "prettier": "prettier -c --write \"src/**/*\"",
  }

```

6. 配置

```json
  "gitHooks": {
    "pre-commit": "lint-staged"
  },
  "lint-staged": {
    "**/*.less": "stylelint --syntax less",
    "**/*.{js,jsx,ts,tsx}": "npm run lint-staged:js",
    "*.{js,jsx,less,md,json}": [
      "prettier --write"
    ],
    "*.ts?(x)": [
      "prettier --parser=typescript --write"
    ]
  },
```

yarn precommit
git commit -m"xx"

7.报错

JSON schema for the TypeScript compiler's configuration file

Cannot find type definition file for 'json5'.ts

Parsing error: "parserOptions.project" has been set for @typescript-eslint/parser.
The file does not match your project config: .eslintrc.js.
The file must be included in at least one of the projects provided.eslint

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
  .ant-layout {
    .ant-layout-header {
      // 左边头部
      height: @navHeight !important;
      // 左边头部 logo
      .logo {
        height: @logoHeight;
      }

      // 中间头部
      .ant-pro-top-nav-header-menu {
        line-height: @navHeight;
        // 有头部一级菜单（选中样式）
        .ant-menu-item-only-child:hover,
        .ant-menu-item-active,
        .ant-menu-item-selected {
          color: #3d84fd;
          font-size: 15px;
          background-color: transparent;
        }
      }
    }
  }

  // 菜单
  .ant-design-pro .ant-layout-sider-light {
    padding-top: @navHeight !important;
  }
}
```

## 6.修改头部的 logo

```jsx
<ProLayout
  logo={() => <img src="/icons/logo/logo2.png" className="logo"></img>}
  title=""
></ProLayout>
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
import { route } from './p-config/_default_menus';
import { history } from 'umi';
// 全局布局组件
export default (props: any) => {
  const [pathname, setPathname] = useState('/child/sys/dept');
  return (
    <div className={styles.layout}>
      <ProLayout
        menuItemRender={(item, dom) => (
          <div
            onClick={() => {
              if (item.path === '/child/sys') {
                history.push('/child/sys/dept');
                setPathname('/child/sys/dept');
              } else {
                history.push(item.path || '/child/sys/dept');
                setPathname(item.path || '/child/sys/dept');
              }
            }}
          >
            pre {dom}
          </div>
        )}
        subMenuItemRender={(_, dom) => <div>pre {dom}</div>}
        route={route}
        location={{
          pathname,
        }}
        layout="mix"
        fixedHeader={true}
        fixSiderbar={true}
        splitMenus={true}
        navTheme="light"
      >
        {props.children}
      </ProLayout>
    </div>
  );
};
```

## 3.配置左边的菜单

layout/index.tsx

```js
import React, { useState } from 'react';
import styles from './index.less';
import ProLayout from '@ant-design/pro-layout';
import { route } from './p-config/_default_menus';
import { history } from 'umi';
// 全局布局组件
export default (props: any) => {
  const [pathname, setPathname] = useState('/child/sys/dept');
  return (
    <div className={styles.layout}>
      <ProLayout
        menuItemRender={(item, dom) => (
          <div
            onClick={() => {
              history.push(item.path || '/child/sys/dept');
              setPathname(item.path || '/child/sys/dept');
            }}
          >
            pre {dom}
          </div>
        )}
        subMenuItemRender={(_, dom) => <div>pre {dom}</div>}
        route={route}
        location={{
          pathname,
        }}
      >
        {props.children}
      </ProLayout>
    </div>
  );
};
```

p-config/\_default_menus.ts

```js
import React from 'react';
import {
  SmileOutlined,
  CrownOutlined,
  TabletOutlined,
} from '@ant-design/icons';

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
        },
      ],
    },
  ],
};
export { route };
```

## 2.集成 pro-layout

1.启用插件

```js
  "dependencies": {
    "@ant-design/pro-layout": "^6.5.0",
    ....
  },
```

2.使用 pro-layout 的组件

layout/index.tsx

```js
import React from 'react';
import styles from './index.less';
import ProLayout from '@ant-design/pro-layout';
// 全局布局组件
export default (props: any) => {
  return (
    <div className={styles.layout}>
      <ProLayout>{props.children}</ProLayout>
    </div>
  );
};
```

src/gloable.less
需要重新启动

```less
body {
  & > div {
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
      ],
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
export default (props: any) => {
  return <div className={styles.layout}>{props.children}</div>;
};
```
