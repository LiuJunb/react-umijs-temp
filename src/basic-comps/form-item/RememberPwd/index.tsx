/**
 * 登录页面-自定义表单的 formItem : 记住密码 和 忘记密码
 */
import React, { useState } from 'react';
import styles from './index.less';
// import ProForm from '@ant-design/pro-form';
import { Form, Checkbox } from 'antd';

export interface RememberPwdProps {
  defaultChecked?: boolean;
  onChange?: (e: any) => void;
}

const RememberPwd: React.FC<RememberPwdProps> = ({
  defaultChecked = false,
  onChange,
}) => {
  const [currentChecked, setCurrentChecked] = useState<boolean>(defaultChecked);

  const triggerChange = ({
    checked,
    forgot,
  }: {
    checked: boolean;
    forgot: any;
  }) => {
    if (onChange) {
      onChange({ checked, forgot });
    }
  };

  const checkboxChange = (e: any) => {
    setCurrentChecked(e.target.checked);
    triggerChange({ checked: e.target.checked, forgot: false });
  };
  const forgetClick = () => {
    triggerChange({ checked: currentChecked, forgot: true });
  };

  return (
    <Form.Item>
      {' '}
      {/* 表单项 */}
      {/* left */}
      <Form.Item noStyle>
        <Checkbox defaultChecked={defaultChecked} onChange={checkboxChange}>
          记住密码
        </Checkbox>
      </Form.Item>
      {/* right */}
      <a className={styles['login-form-forgot']} onClick={forgetClick}>
        忘记密码
      </a>
    </Form.Item>
  );
};
export default RememberPwd;
