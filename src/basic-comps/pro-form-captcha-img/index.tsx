/**
 * 登录页面-表单的 formItem : 记住密码 和 忘记密码
 */
import React from 'react';
import styles from './index.less';
import ProForm from '@ant-design/pro-form';
import { Input } from 'antd';
// import type { FormItemProps } from 'antd/lib/form';
import type { InputProps, FormItemProps } from 'antd';

// export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'prefix' | 'type'> {
//   prefixCls?: string;
//   size?: SizeType;
//   type?: LiteralUnion<'button' | 'checkbox' | 'color' | 'date' | 'datetime-local' | 'email' | 'file' | 'hidden' | 'image' | 'month' | 'number' | 'password' | 'radio' | 'range' | 'reset' | 'search' | 'submit' | 'tel' | 'text' | 'time' | 'url' | 'week', string>;
//   onPressEnter?: React.KeyboardEventHandler<HTMLInputElement>;
//   addonBefore?: React.ReactNode;
//   addonAfter?: React.ReactNode;
//   prefix?: React.ReactNode;
//   suffix?: React.ReactNode;
//   allowClear?: boolean;
//   bordered?: boolean;
// }

// export interface FormItemProps<Values = any> extends FormItemLabelProps, FormItemInputProps, RcFieldProps {
//   prefixCls?: string;
//   noStyle?: boolean;
//   style?: React.CSSProperties;
//   className?: string;
//   children?: ChildrenType<Values>;
//   id?: string;
//   hasFeedback?: boolean;
//   validateStatus?: ValidateStatus;
//   required?: boolean;
//   hidden?: boolean;
//   initialValue?: any;
//   messageVariables?: Record<string, string>;
//   tooltip?: LabelTooltipType;
//   /** Auto passed by List render props. User should not use this. */
//   fieldKey?: React.Key | React.Key[];
// }

export type FieldProps = {
  style?: React.CSSProperties;
};

// T -> fieldProps=InputProps
export type ProFormItemProps<T = {}> = {
  fieldProps?: FieldProps & T;
  placeholder?: string;
  secondary?: boolean;
  allowClear?: boolean;
  disabled?: boolean;
  /**
   * - Auto 使用组件默认的宽度 - xs=104px 适用于短数字、短文本或选项。 - sm=216px 适用于较短字段录入、如姓名、电话、ID 等。 - md=328px
   * 标准宽度，适用于大部分字段长度。 - lg=440px 适用于较长字段录入，如长网址、标签组、文件路径等。 - xl=552px
   * 适用于长文本录入，如长链接、描述、备注等，通常搭配自适应多行输入框或定高文本域使用。
   */
  width?: number | 'sm' | 'md' | 'xl' | 'xs' | 'lg';
  /** 设置到 ProField 上面的 Props，内部属性 */
  proFieldProps?: {
    light?: boolean;
    label?: React.ReactNode;
    mode?: 'read';
  };
} & FormItemProps;

export type ProFormCaptchaImgProps = ProFormItemProps<InputProps> & {
  // 类型合并
  // 图片 或者 路劲
  captchaImg: string;
  onCaptcha?: any;
  value?: any;
  onChange?: any;
};

const ProFormCaptchaImg: React.FC<ProFormCaptchaImgProps> = (props) => {
  // 这么写是为了防止restProps中 带入 onChange, defaultValue, rules props tabUtil
  const {
    // rules,
    // name,
    // phoneName,
    fieldProps,
    placeholder,
    // captchaTextRender = (paramsTiming, paramsCount) => {
    //   return paramsTiming ? `${paramsCount} 秒后重新获取` : '获取验证码';
    // },
    // captchaProps,
    captchaImg,
    // value,
    // onChange,
    ...restProps // 剩余参数
  } = props;

  const imgClick = () => {
    if (restProps.onCaptcha) {
      restProps.onCaptcha();
    }
  };

  return (
    <ProForm.Item>
      {/* 表单项 */}
      {/* left */}
      <ProForm.Item {...props} noStyle>
        <Input
          placeholder={placeholder}
          style={{ width: '64%' }}
          {...fieldProps}
        />
      </ProForm.Item>
      {/* right */}
      <img
        src={captchaImg}
        alt=""
        className={styles.imgCap}
        onClick={imgClick}
      />
    </ProForm.Item>
  );
};
export default ProFormCaptchaImg;
