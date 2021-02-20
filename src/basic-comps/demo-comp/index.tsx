import React from 'react';
import styles from './index.less';

// 登录页面
export default (props: any) => {
  return <div className={styles.demo}>demo comps: {props.name}</div>;
};
