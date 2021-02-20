import React, { useRef } from 'react';
import type { FormInstance } from 'antd';
// import styles from './index.less';
import { PageContainer } from '@ant-design/pro-layout';
import { Tag, Space, Button } from 'antd';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';

// 定义类型
type UserItem = {
  id: number;
  // key: number;
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
const columns: ProColumns<UserItem>[] = [
  // {
  //   title: 'id',
  //   dataIndex: 'id',
  //   // width: 48,
  // },
  {
    title: '名称',
    dataIndex: 'name',
    // width: '30%',
  },
  {
    title: '标题',
    dataIndex: 'title',
    // width: '30%',
  },
  {
    title: '内容',
    dataIndex: 'content',
    width: '30%',
  },
  {
    title: '状态',
    dataIndex: 'status',
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
  {
    title: '操作',
    // key: 'option',
    width: 200,
    valueType: 'option',
    render: () => {
      return [
        <a key="a1" onClick={() => {}}>
          编辑
        </a>,
        <a key="a2" onClick={() => {}}>
          查看
        </a>,
        <a key="a3" onClick={() => {}}>
          删除
        </a>,
      ];
    },
  },
];

// mock 数据源
const tableListDataSource: UserItem[] = [];
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
    // key: i,
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
  /**
    // 刷新
    ref.current.reload();
    // 刷新并清空,页码也会重置
    ref.current.reloadAndRest();
    // 重置到默认值
    ref.current.reset();
    // 清空选中项
    ref.current.clearSelected();
    // 开始编辑
    ref.current.startEditable(rowKey);
    // 结束编辑
    ref.current.cancelEditable(rowKey);
   */
  const actionRef = useRef<ActionType>();

  return (
    // 1.页面组件
    <PageContainer>
      {/* 2.表格组件属性：
           https://ant.design/components/table-cn/#API
           https://procomponents.ant.design/components/table/#api
      */}
      <ProTable<UserItem>
        columns={columns}
        pagination={{
          pageSize: 10,
        }}
        request={(params, sorter, filter) => {
          // 表单搜索项会从 params 传入，传递给后端接口。
          console.log(params, sorter, filter);
          // {data,success,total}
          return Promise.resolve({
            data: tableListDataSource,
            success: true,
          });
        }}
        rowKey="id"
        actionRef={actionRef}
        formRef={ref}
        toolBarRender={() => [
          <Button
            key="set1"
            onClick={() => {
              if (ref.current) {
                // 给高级检索赋值
                ref.current.setFieldsValue({
                  name: 'test-xxx',
                });
              }
            }}
          >
            检索赋值
          </Button>,
          <Button
            key="set2"
            onClick={() => {
              if (actionRef.current) {
                // 刷新
                // actionRef.current.reload();
                actionRef.current.reloadAndRest!();
              }
            }}
          >
            触发 actionRef
          </Button>,
        ]}
      ></ProTable>
    </PageContainer>
  );
};
