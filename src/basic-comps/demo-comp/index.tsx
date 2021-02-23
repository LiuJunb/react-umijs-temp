/**
 * 组件模板
 */
import React from 'react';
import styles from './index.less';

export interface DemoCompProps {
  value?: boolean;
  onChange?: (value: boolean) => void;
}

const DemoComp: React.FC<DemoCompProps> = ({ value = false }) => {
  return <div className={styles.demo}>demo comps: {value}</div>;
};

export default DemoComp;
