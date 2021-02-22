import React from 'react';
import styles from './index.less';

export interface DemoCompProps {
  value?: boolean;
  onChange?: (value: boolean) => void;
}

// 登录页面
const DemoComp: React.FC<DemoCompProps> = ({ value = false }) => {
  return <div className={styles.demo}>demo comps: {value}</div>;
};

export default DemoComp;
