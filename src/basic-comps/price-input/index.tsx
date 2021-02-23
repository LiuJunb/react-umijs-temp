/**
 * 自定义 表单组件
 */
import React, { useState } from 'react';
import { Input, Select } from 'antd';

const { Option } = Select;

type Currency = 'rmb' | 'dollar';

// value的数据类型
export interface PriceValue {
  number?: number;
  currency?: Currency;
}

/**
  提供受控属性 value 或其它与 valuePropName 的值同名的属性。
  提供 onChange 事件或 trigger 的值同名的事件。
  v-modal (value, this.$emit('input', x)) -> vue
  v-modal (value, onChange) -> react
 */
interface PriceInputProps {
  value?: PriceValue; // { number: 1, currency: 'rmb' }
  onChange?: (value: PriceValue) => void;
}

const PriceInput: React.FC<PriceInputProps> = ({ value = {}, onChange }) => {
  // 定义两个变量
  const [number, setNumber] = useState(0);
  const [currency, setCurrency] = useState<Currency>('rmb');

  // 监听
  const triggerChange = (changedValue: {
    number?: number;
    currency?: Currency;
  }) => {
    if (onChange) {
      // 定义的变量：number，currency。 props的变量：value。 监听值的变化：changedValue
      onChange({ number, currency, ...value, ...changedValue });
    }
  };

  // 数字改变
  const onNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newNumber = parseInt(e.target.value || '0', 10);
    if (Number.isNaN(number)) {
      return;
    }
    if (!('number' in value)) {
      setNumber(newNumber);
    }
    triggerChange({ number: newNumber });
  };

  // 下拉框改变
  const onCurrencyChange = (newCurrency: Currency) => {
    if (!('currency' in value)) {
      setCurrency(newCurrency);
    }
    triggerChange({ currency: newCurrency });
  };

  return (
    <span>
      <Input
        type="text"
        value={value.number || number}
        onChange={onNumberChange}
        style={{ width: 100 }}
      />
      <Select
        value={value.currency || currency}
        style={{ width: 80, margin: '0 8px' }}
        onChange={onCurrencyChange}
      >
        <Option value="rmb">RMB</Option>
        <Option value="dollar">Dollar</Option>
      </Select>
    </span>
  );
};
// 登录页面
export default PriceInput;
