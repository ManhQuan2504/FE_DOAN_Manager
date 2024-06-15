import React from 'react';
import { Button, Table } from 'antd';
import './dashboard.css';
import { useTranslation } from 'react-i18next';
import AddButton from '~/components/listAction/AddButton';

function Dashboard() {
  const { t } = useTranslation();

  return (
    <>
      <div className="table-header">
        <AddButton />
        <Button type="default">Button 2</Button>
      </div>
      Dashboard PAGE
    </>
  );
}

export default Dashboard;
