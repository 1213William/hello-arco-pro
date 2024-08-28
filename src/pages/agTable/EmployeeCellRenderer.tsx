import type { CustomCellRendererProps } from '@ag-grid-community/react';
import type { FunctionComponent } from 'react';
import React from 'react';
import styles from './EmployeeCellRenderer.module.css';

const EmployeeCellRenderer: FunctionComponent<CustomCellRendererProps> = ({
  value,
  data,
}) => {
  const { jobTitle } = data || {};

  return (
    <div className={styles.employeeCell}>
      <div className={styles.employeeData}>{jobTitle}</div>
    </div>
  );
};

export default EmployeeCellRenderer;
