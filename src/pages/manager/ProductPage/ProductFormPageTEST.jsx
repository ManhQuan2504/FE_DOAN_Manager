import { Button, Table } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import AddButton from '~/components/listAction/AddButton';

function ProductFormPage() {
  const { t } = useTranslation();

  return (
    <>
      <div className="table-header">
        <AddButton />
      </div>
      TEST PRODUCT
    </>
  );
}

export default ProductFormPage;
