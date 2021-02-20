import React from 'react';
import styles from './index.less';

// 用户详情页面
export default (props: any) => {
  return (
    <div className={styles['user-detail']}>user detail page: {props.name}</div>
  );
};
