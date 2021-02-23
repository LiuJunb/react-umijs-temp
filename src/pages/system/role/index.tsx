import React, { useRef } from 'react';
import type { FormInstance } from 'antd';
// import styles from './index.less';
import { PageContainer } from '@ant-design/pro-layout';
import { Tag, Space, Button } from 'antd';
import type { ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';

import PriceInput from '@/basic-comps/form-item/price-input/index';

// 定义类型
type RoleItem = {
  id: number;
  age: number;
  createRangeTime: number[];
  createTime: number;
  name: string;
  title: string;
  content: string;
  status: string;
  labels: {
    name: string;
    color: string;
  }[];
};

// 列的配置
const columns: ProColumns<RoleItem>[] = [
  {
    title: '序号',
    dataIndex: 'id',
  },
  {
    title: '序号 Border',
    dataIndex: 'index',
    valueType: 'indexBorder', // 指定列的类型
  },
  {
    title: '名称',
    dataIndex: 'name',
    // width: '30%',
  },
  // 自定义检索
  {
    title: '自定义检索',
    dataIndex: 'custom1',
    hideInTable: true, // 隐藏的列
    // vue -> 插槽 ; react -> 回调渲染函数
    renderFormItem: (_, { type }) => {
      if (type === 'form') {
        return null;
      }
      return <PriceInput></PriceInput>;
    },
    // width: 48,
  },
  // 表格隐藏的列，但是高级检索不隐藏
  {
    title: '年龄',
    dataIndex: 'age',
    hideInTable: true, // 隐藏的列
    // width: 48,
  },
  // 时间控件
  {
    title: '时间范围',
    dataIndex: 'createRangeTime',
    valueType: 'dateTimeRange', // dateRange
    // 转换
    search: {
      transform: (value: any) => ({ startTime1: value[0], endTime1: value[1] }),
    },
    // width: 48,
  },
  // 时间控件
  {
    title: '新建时间',
    dataIndex: 'createTime',
    valueType: 'dateRange',
    // 转换
    search: {
      transform: (value: any) => ({ startTime2: value[0], endTime2: value[1] }),
    },
    // 自定义渲染 表格的列
    render: (text, record) => [
      <a href="" target="_blank" rel="noopener noreferrer" key="view">
        {new Date(record.createTime).toLocaleDateString()}
      </a>,
    ],
    // width: 48,
  },
  {
    title: '标题',
    dataIndex: 'title',
    // width: '30%',
  },
  // 有提示，可拷贝，默认显示一行
  {
    title: '内容',
    dataIndex: 'content',
    copyable: true,
    ellipsis: true,
    tip: '标题过长会自动收缩',
    width: '30%',
  },
  {
    title: '状态',
    dataIndex: 'status',

    valueType: 'select',
    initialValue: 'all',
    filters: true,
    onFilter: true,
    valueEnum: {
      // all(value)  全部（label）   Default(点的颜色)
      all: { text: '全部', status: 'Default' },
      close: { text: '关闭', status: 'Default' },
      running: { text: '运行中', status: 'Processing' },
      online: { text: '已上线', status: 'Success' },
      error: { text: '异常', status: 'Error' },
    },
    // width: '30%',
  },
  {
    title: '标签',
    dataIndex: 'labels',
    // 自定义表格项
    render: (_, record) => (
      <Space>
        {record.labels.map(({ name, color }) => (
          <Tag color={color} key={name}>
            {name}
          </Tag>
        ))}
      </Space>
    ),
  },
];

// mock 数据源
const tableListDataSource: RoleItem[] = [];
const valueEnum: Record<number, string> = {
  0: 'close',
  1: 'running',
  2: 'online',
  3: 'error',
};
const labels = [
  {
    name: 'A',
    color: 'red',
  },
  {
    name: 'B',
    color: 'green',
  },
];

for (let i = 0; i < 12; i += 1) {
  tableListDataSource.push({
    id: i,
    age: i + 10,
    createRangeTime: [
      Date.now() - Math.floor(Math.random() * 2000),
      Date.now() - Math.floor(Math.random() * 2000),
    ],
    createTime: Date.now() - Math.floor(Math.random() * 2000),
    name: `AppName${i}`,
    title: `标题${i}`,
    content:
      i % 2 === 1
        ? '很长很长很长很长很长很长很长的文字要展示但是要留下尾巴很长很长很长很长很长很长很长的文字要展示但是要留下尾巴'
        : '简短备注文案',
    status: valueEnum[Math.floor(Math.random() * 10) % 4],
    labels,
  });
}
// props: any
export default () => {
  const ref = useRef<FormInstance>();

  return (
    <PageContainer>
      {' '}
      {/* 1.页面组件 */}
      {/* 2.表格组件属性：
          https://ant.design/components/table-cn/#API
          https://procomponents.ant.design/components/table/#api
      */}
      <ProTable<RoleItem>
        columns={columns}
        pagination={{
          pageSize: 10,
        }}
        // 高级检索：上下布局，默认没有折叠
        search={{
          labelWidth: 'auto',
          layout: 'vertical',
          defaultCollapsed: false,
          // span:6 // 固定 栅格系统
        }}
        rowKey="id"
        request={(params, sorter, filter) => {
          // 表单搜索项会从 params 传入，传递给后端接口。
          console.log(params, sorter, filter);
          // {data,success,total}
          return Promise.resolve({
            data: tableListDataSource,
            success: true,
          });
        }}
        formRef={ref}
        toolBarRender={() => [
          <Button
            key="set"
            onClick={() => {
              if (ref.current) {
                // 给高级检索赋值
                ref.current.setFieldsValue({
                  name: 'test-xxx',
                  custom1: { number: 10, currency: 'dollar' },
                });
              }
            }}
          >
            检索赋值
          </Button>,
        ]}
      ></ProTable>
    </PageContainer>
  );
};
