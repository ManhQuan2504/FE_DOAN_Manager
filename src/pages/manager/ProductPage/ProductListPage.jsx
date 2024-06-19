import React, { useState } from 'react';
import { Divider, Radio, Table, Menu } from 'antd';
import { NavLink } from 'react-router-dom';
import AddButton from '~/components/listAction/AddButton';
import { PATH } from '~/constants/part';

const ProductFormPage = () => {
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      render: (text, record) => <NavLink to={`${PATH.MANAGER.PRODUCTS}/${record.key}`}>{text}</NavLink>, // Sử dụng NavLink để liên kết đến trang productForm/:id
    },
    {
      title: 'Age',
      dataIndex: 'age',
    },
    {
      title: 'Address',
      dataIndex: 'address',
    },
  ];
  const data = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sydney No. 1 Lake Park',
    },
    {
      key: '4',
      name: 'Disabled User',
      age: 99,
      address: 'Sydney No. 1 Lake Park',
    },
  ];

  const [selectionType, setSelectionType] = useState('checkbox');

  return (
    <div>
      <div>
        <AddButton />
      </div>
      <Table
        rowSelection={{
          type: selectionType,
          onChange: (selectedRowKeys, selectedRows) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
          },
          getCheckboxProps: (record) => ({
            disabled: record.name === 'Disabled User',
            name: record.name,
          }),
        }}
        columns={columns}
        dataSource={data}
        bordered
      />
    </div>
  );
};

export default ProductFormPage;
