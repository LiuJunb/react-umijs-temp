import React from 'react';
import styles from './index.less';

// home page
export default (props: any) => {
  return <div className={styles.login}>home page: {props.name}</div>;
};
