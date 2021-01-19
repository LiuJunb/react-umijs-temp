import React from 'react';
import styles from './index.less';
import { Select } from 'antd';

const { Option } = Select;

export default (props: any) => {
  return (
    <div className={styles.menu}>
      menu page : {props.name}
      <Select defaultValue="lucy" style={{ width: 120 }} allowClear>
        <Option value="lucy">Lucy</Option>
      </Select>
    </div>
  );
};
