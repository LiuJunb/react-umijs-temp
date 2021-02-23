import type { FormItemProps } from 'antd';

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
