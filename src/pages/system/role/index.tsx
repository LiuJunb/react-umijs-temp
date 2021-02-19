import React from 'react';
// import styles from './index.less';
import { PageContainer } from '@ant-design/pro-layout';
import { Tag, Space } from 'antd';
import type { ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';

// 定义类型
type UserItem = {
  id: number;
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
      ></ProTable>
    </PageContainer>
  );
};
