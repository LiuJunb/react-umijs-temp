import React, { useState } from 'react';
import styles from './index.less';
import ProLayout from '@ant-design/pro-layout';
import { route } from './p-config/_default_menus';
import { history } from 'umi';
import { HomeOutlined } from '@ant-design/icons';
// 全局布局组件
export default (props: any) => {
  const [pathname, setPathname] = useState('/child/sys/dept');
  return (
    <ProLayout
      className={styles['liu-pro-layout']}
      menuItemRender={(item: any, dom: any) => (
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
          menu: {dom}
        </div>
      )}
      subMenuItemRender={(_, dom) => (
        <div>
          <HomeOutlined />
          {dom}
        </div>
      )}
      route={route}
      location={{
        pathname,
      }}
      layout="mix"
      fixedHeader={true}
      fixSiderbar={true}
      // splitMenus={true}
      navTheme="light"
      logo={() => <img src="/icons/logo/logo2.png" className="logo"></img>}
      title=""
    >
      {props.children}
    </ProLayout>
  );
};
