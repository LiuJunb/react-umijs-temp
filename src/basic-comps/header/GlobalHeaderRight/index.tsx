import { Space, Menu } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import React from 'react';
// import { useModel } from 'umi';
import HeaderDropdown from '../HeaderDropdown';
import NoticeIconView from '../NoticeIconView';
import AvatarDropdown from '../AvatarDropdown';

import styles from './index.less';

export type SiderTheme = 'light' | 'dark';

const GlobalHeaderRight: React.FC<{}> = () => {
  // const { initialState } = useModel('@@initialState');

  // if (!initialState || !initialState.settings) {
  //   return null;
  // }

  // const { navTheme, layout } = initialState.settings;
  const className = styles.right;

  // if ((navTheme === 'dark' && layout === 'top') || layout === 'mix') {
  //   className = `${styles.right}  ${styles.dark}`;
  // }

  return (
    <Space className={className}>
      {/* left 组件文档 */}
      <HeaderDropdown
        overlay={
          <Menu>
            <Menu.Item
              onClick={() => {
                window.open('/~docs');
              }}
            >
              组件文档
            </Menu.Item>
            <Menu.Item
              onClick={() => {
                window.open('https://pro.ant.design/docs/getting-started');
              }}
            >
              Ant Design Pro 文档
            </Menu.Item>
          </Menu>
        }
      >
        <span className={styles.action}>
          <QuestionCircleOutlined />
        </span>
      </HeaderDropdown>

      {/* center */}
      <NoticeIconView />

      {/* right user */}
      <AvatarDropdown />
    </Space>
  );
};
export default GlobalHeaderRight;
