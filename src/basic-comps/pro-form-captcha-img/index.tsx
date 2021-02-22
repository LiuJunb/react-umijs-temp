import React from 'react';
import styles from './index.less';
import ProForm from '@ant-design/pro-form';
import { Input } from 'antd';
/**
 * 登录表单的 formItem : 记住密码 和 忘记密码
 */
export default (props: any) => {
  return (
    <ProForm.Item>
      {/* 表单项 */}
      {/* left */}
      <ProForm.Item {...props} noStyle>
        <Input
          placeholder={props.placeholder}
          {...props.fieldProps}
          style={{ width: '64%' }}
        />
      </ProForm.Item>
      {/* right */}
      <img
        src="http://172.16.121.73:8765/user/sys/user/captcha?t=1613985842126"
        alt=""
        className={styles.imgCap}
      />
    </ProForm.Item>
  );
};
