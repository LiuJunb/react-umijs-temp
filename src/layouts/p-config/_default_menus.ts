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
      path: '/main/home',
      name: '首页',
      // icon: <CrownOutlined />,
      // component: './Welcome',
    },
    {
      path: '/main/sys',
      name: '系统管理',
      access: 'canAdmin',
      // component: './Admin',
      routes: [
        {
          path: '/main/sys/dept',
          name: '部门管理',
          // component: './Welcome',
        },
        {
          path: '/main/sys/menu',
          name: '菜单管理',
          // component: './Welcome',
        },
        {
          path: '/main/sys/role',
          name: '角色管理',
          // component: './Welcome',
        },
        {
          path: '/main/sys/user',
          name: '用户管理',
          // component: './Welcome',
        },
      ],
    },
  ],
};
export { route };
