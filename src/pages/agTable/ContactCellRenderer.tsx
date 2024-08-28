import type { CustomCellRendererProps } from '@ag-grid-community/react';
import type { FunctionComponent } from 'react';
import React from 'react';

import styles from './ContactCellRenderer.module.css';
import { Button } from '@arco-design/web-react';

const ContactCellRenderer: FunctionComponent<CustomCellRendererProps> = ({
  data,
}) => {
  return (
    <div className={styles.contactCell}>
      <div className={styles.iconContainer}>
        <Button type="text" style={{ padding: '0 4px' }}>
          同级
        </Button>
        <Button type="text" style={{ padding: '0 4px' }}>
          子级
        </Button>
        <Button type="text" style={{ padding: '0 4px' }}>
          删除
        </Button>
      </div>
    </div>
  );
};

export default ContactCellRenderer;
