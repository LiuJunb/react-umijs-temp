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
