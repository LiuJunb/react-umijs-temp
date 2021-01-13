import React, { useState } from 'react';
import styles from './index.less';
import ProLayout from '@ant-design/pro-layout';
import { route } from './p-config/_default_menus';
import { history } from 'umi';
// 全局布局组件
export default (props: any) => {
  const [pathname, setPathname] = useState('/main/sys/dept');
  return (
    <ProLayout
      menuItemRender={(item: any, dom: any) => (
        <div
          onClick={() => {
            if (item.path === '/main/sys') {
              history.push('/main/sys/dept');
              setPathname('/main/sys/dept');
            } else {
              history.push(item.path || '/main/sys/dept');
              setPathname(item.path || '/main/sys/dept');
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
  );
};
