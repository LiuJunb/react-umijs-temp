import React, { useState } from 'react';
// import styles from './index.less';
import { PageContainer } from '@ant-design/pro-layout';
import { Link, history } from 'umi';

// 新建用户页面
export default () => {
  function itemRender(route: any, params: any, routes: any) {
    // console.log(route) // {path: "", breadcrumbName: "系统管理"}
    // console.log(params) //
    // console.log(routes) // [ {path: "", breadcrumbName: "系统管理"},  ]
    // console.log(paths) // []
    const last = routes.indexOf(route) === routes.length - 1;
    // 最后一个
    if (last || !route.path) {
      return <span>{route.breadcrumbName}</span>;
    }
    return <Link to={route.path}>{route.breadcrumbName}</Link>;
  }

  const { query } = history.location;

  // 用户的id
  const [userId] = useState(query!.id || null);
  const [titleName] = useState(userId ? '编辑' : '新建');

  return (
    <PageContainer
      fixedHeader
      header={{
        title: `${titleName}用户`,
        breadcrumb: {
          itemRender,
          routes: [
            {
              path: '',
              breadcrumbName: '系统管理',
            },
            {
              path: '/child/sys/user',
              breadcrumbName: '用户管理',
            },
            {
              path: '',
              breadcrumbName: titleName,
            },
          ],
        },
      }}
    >
      ppp
    </PageContainer>
  );
};
