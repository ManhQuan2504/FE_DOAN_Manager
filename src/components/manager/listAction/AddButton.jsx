import React from 'react';
import { Button, Tooltip } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { t } from 'i18next';

const AddButton = ({ onClick, tooltip, ...props }) => {

  return (
    <Tooltip title={t('button.add')}>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={onClick}
        {...props}
      />
    </Tooltip>
  );
};

export default AddButton;
