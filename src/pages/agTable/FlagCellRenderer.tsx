import type { CustomCellRendererProps } from '@ag-grid-community/react';
import type { FunctionComponent } from 'react';
import React from 'react';
import styles from './FlagCellRenderer.module.css';

const FlagCellRenderer: FunctionComponent<CustomCellRendererProps> = ({
  value,
  data: { flag },
}) => (
  <div className={styles.flagCell}>
    <div className={styles.employeeData}>
      <span>{value}</span>
    </div>
    <img
      className={styles.image}
      src={`https://lf-cdn-tos.bytescm.com/obj/static/xitu_extension/static/brand.82c24770.svg`}
      alt={value.toLowerCase()}
    />
  </div>
);

export default FlagCellRenderer;
