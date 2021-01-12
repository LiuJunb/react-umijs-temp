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
