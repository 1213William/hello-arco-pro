import type { CustomCellRendererProps } from '@ag-grid-community/react';
import type { FunctionComponent } from 'react';
import React from 'react';
import styles from './TagCellRenderer.module.css';

const TagCellRenderer: FunctionComponent<CustomCellRendererProps> = ({
  value,
  valueFormatted,
}) => (
  <div className={`${styles.tag} ${styles[value + 'Tag']}`}>
    <div className={`${styles.circle} ${styles[value + 'Circle']}`}></div>
    <span>{valueFormatted}</span>
  </div>
);

export default TagCellRenderer;
