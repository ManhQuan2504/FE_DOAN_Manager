import React, { useState } from 'react';
import { Table } from 'antd';
import _ from 'lodash';
import { t } from 'i18next';

// Helper function to get unique values and sort them
const getUniqueValues = (data, key) => {
  const values = data?.map(item => item[key] || 'No Value');
  return _.uniq(values).sort((a, b) => a.localeCompare(b));
};

const TableComponent = ({ data, columnsConfig, loading }) => {
  const [pageSize, setPageSize] = useState(30); // Default page size

  // Add index column (STT) to columnsConfig
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
        const aValue = a[col.dataIndex] || '';
        const bValue = b[col.dataIndex] || '';
        return aValue.localeCompare(bValue);
      },
    })),
  ];

  // Function to handle page size change
  const handlePageSizeChange = (current, size) => {
    setPageSize(size);
    // You can add any additional logic here if needed when page size changes
    console.log(`Page size changed to ${size}`);
  };

  return (
    <div >
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
