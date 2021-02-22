import React from 'react';
import styles from './index.less';
// import ProForm from '@ant-design/pro-form';
import { Form, Checkbox } from 'antd';

export interface RememberMeProps {
  defaultChecked?: boolean;
  onChange?: (e: any) => void;
}

/**
 * 登录表单的 formItem : 记住密码 和 忘记密码
 */
const RememberMe: React.FC<RememberMeProps> = ({
  defaultChecked = false,
  onChange,
}) => {
  return (
    <Form.Item>
      {' '}
      {/* 表单项 */}
      {/* left */}
      <Form.Item name="remember" valuePropName="checked" noStyle>
        <Checkbox defaultChecked={defaultChecked} onChange={onChange}>
          记住密码
        </Checkbox>
      </Form.Item>
      {/* right */}
      <a className={styles['login-form-forgot']} href="">
        忘记密码
      </a>
    </Form.Item>
  );
};
export default RememberMe;
