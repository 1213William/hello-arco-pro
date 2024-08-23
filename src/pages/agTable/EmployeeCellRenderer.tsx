import type { CustomCellRendererProps } from '@ag-grid-community/react';
import type { FunctionComponent } from 'react';
import React from 'react';
import styles from './EmployeeCellRenderer.module.css';

const EmployeeCellRenderer: FunctionComponent<CustomCellRendererProps> = ({
  value,
  data: { image, jobTitle },
}) => (
  <div className={styles.employeeCell}>
    <div className={styles.employeeData}>
      <span>{value}</span>
      <span className={styles.description}>{jobTitle}</span>
    </div>
    <img
      className={styles.image}
      src={`https://lf-cdn-tos.bytescm.com/obj/static/xitu_extension/static/brand.82c24770.svg`}
      alt={value.toLowerCase()}
    />
  </div>
);

export default EmployeeCellRenderer;
