import React, { useState } from 'react';
import { Table } from 'antd';
import _ from 'lodash';
import { t } from 'i18next';

// Helper function to get unique values and sort them
const getUniqueValues = (data, key) => {
  const values = data?.map(item => (item[key] || 'No Value').toString()); // Chuyển đổi thành chuỗi
  
  // Loại bỏ các giá trị trùng lặp và sắp xếp
  return _.uniq(values).sort((a, b) => {
    // Chuyển đổi a và b thành chuỗi nếu chưa
    const aValue = typeof a === 'string' ? a : '';
    const bValue = typeof b === 'string' ? b : '';
    return aValue.localeCompare(bValue);
  });
};


const TableComponent = ({ data, columnsConfig, loading }) => {
  const [pageSize, setPageSize] = useState(30); // Default page size

  const columns = [
    {
      title: t('index'),
      dataIndex: 'index',
      key: 'index',
      width: 70,
      render: (text, record, index) => index + 1, // Render STT based on the index in the filtered/sorted data
    },
    ...columnsConfig.map(col => ({
      ...col,
      filters: getUniqueValues(data, col.dataIndex).map(value => ({ text: value, value })),
      filterMode: 'tree',
      filterSearch: true,
      onFilter: (value, record) => {
        const recordValue = record[col.dataIndex] || 'No Value';
        return recordValue.startsWith(value);
      },
      sorter: (a, b) => {
        const aValue = typeof a[col.dataIndex] === 'string' ? a[col.dataIndex] : ''; // Ensure aValue is a string
        const bValue = typeof b[col.dataIndex] === 'string' ? b[col.dataIndex] : ''; // Ensure bValue is a string
        return aValue.localeCompare(bValue);
      },
    })),
  ];

  const handlePageSizeChange = (current, size) => {
    setPageSize(size);
    console.log(`Page size changed to ${size}`);
  };

  return (
    <div>
      <Table
        columns={columns}
        dataSource={data}
        loading={loading}
        rowKey="_id"
        pagination={{
          pageSize: pageSize, // Current page size
          showSizeChanger: true,
          pageSizeOptions: ['30', '50', '100', '200'], // Options for page size
          onShowSizeChange: handlePageSizeChange,
          showTotal: (total, range) => `${range[0]}-${range[1]} of ${total}`, // Show total records
        }}
        scroll={{ y: 430 }} // Fixed height for the table body with a scrollbar
        style={{ minHeight: '400px' }} // Ensure the table container has a minimum height
      />
    </div>
  );
};

export default TableComponent;
