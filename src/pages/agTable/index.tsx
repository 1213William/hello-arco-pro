import React from 'react';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import type {
  ColDef,
  GetDataPath,
  ValueFormatterFunc,
  ValueFormatterParams,
} from '@ag-grid-community/core';
import { ModuleRegistry } from '@ag-grid-community/core';
import { AgGridReact } from '@ag-grid-community/react';
import '@ag-grid-community/styles/ag-grid.css';
import '@ag-grid-community/styles/ag-theme-quartz.css';
import { ExcelExportModule } from '@ag-grid-enterprise/excel-export';
import { MasterDetailModule } from '@ag-grid-enterprise/master-detail';
import { RichSelectModule } from '@ag-grid-enterprise/rich-select';
import { RowGroupingModule } from '@ag-grid-enterprise/row-grouping';
import { SetFilterModule } from '@ag-grid-enterprise/set-filter';
import { StatusBarModule } from '@ag-grid-enterprise/status-bar';
import { useCallback, useMemo, useRef, useState } from 'react';
import type { FunctionComponent } from 'react';

import styles from './HRExample.module.css';
import ContactCellRenderer from './ContactCellRenderer';
import EmployeeCellRenderer from './EmployeeCellRenderer';
import FlagCellRenderer from './FlagCellRenderer';
import StatusCellRenderer from './StatusCellRenderer';
import TagCellRenderer from './TagCellRenderer';
import { getData } from './data';
import classNames from 'classnames';
import { RowDragEndEvent, RowDragMoveEvent } from 'ag-grid-community';
import { ClipboardModule } from '@ag-grid-enterprise/clipboard';
import { RangeSelectionModule } from '@ag-grid-enterprise/range-selection';

ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  ExcelExportModule,
  MasterDetailModule,
  RowGroupingModule,
  RichSelectModule,
  SetFilterModule,
  StatusBarModule,
  ClipboardModule,
  RangeSelectionModule,
]);

interface Props {
  gridTheme?: string;
  isDarkMode?: boolean;
}

const employmentType = ['Permanent', 'Contract'];
const paymentMethod = ['Cash', 'Check', 'Bank Transfer'];
const paymentStatus = ['Paid', 'Pending'];
const departments = {
  executiveManagement: 'Executive Management',
  legal: 'Legal',
  design: 'Design',
  engineering: 'Engineering',
  product: 'Product',
  customerSupport: 'Customer Support',
};
const departmentFormatter: ValueFormatterFunc = ({ value }) =>
  departments[value as keyof typeof departments] ?? '';

const AgTable: FunctionComponent<Props> = ({
  gridTheme = 'ag-theme-quartz',
  isDarkMode,
}) => {
  const gridRef = useRef<AgGridReact>(null);

  const [colDefs] = useState<ColDef[]>([
    // {
    //   headerName: 'Drag',
    //   width: 100,
    //   rowDrag: (params) => !params.node.group,
    //   suppressMenu: true,
    //   suppressMovable: true,
    // },
    {
      headerName: 'ID',
      field: 'employeeId',
      width: 120,
    },
    {
      field: 'department',
      width: 250,
      minWidth: 250,
      flex: 1,
      valueFormatter: departmentFormatter,
      cellRenderer: TagCellRenderer,
    },
    {
      field: 'employmentType',
      // editable: true,
      width: 180,
      minWidth: 180,
      flex: 1,
      cellEditor: 'agRichSelectCellEditor',
      cellEditorParams: {
        values: employmentType,
      },
    },
    {
      field: 'location',
      width: 200,
      minWidth: 200,
      flex: 1,
      cellRenderer: FlagCellRenderer,
      // editable: true,
    },
    {
      field: 'joinDate',
      editable: true,
      width: 120,
    },
    {
      headerName: 'Salary',
      field: 'basicMonthlySalary',
      valueFormatter: ({ value }: ValueFormatterParams) =>
        value == null ? '' : `$${Math.round(value).toLocaleString()}`,
    },
    {
      field: 'paymentMethod',
      // editable: true,
      width: 180,
      cellEditor: 'agRichSelectCellEditor',
      cellEditorParams: {
        values: paymentMethod,
      },
    },
    {
      headerName: 'Status',
      field: 'paymentStatus',
      // editable: true,
      width: 100,
      cellRenderer: StatusCellRenderer,
      cellEditor: 'agRichSelectCellEditor',
      cellEditorParams: {
        values: paymentStatus,
      },
    },
    {
      field: 'contact',
      pinned: 'right',
      cellRenderer: ContactCellRenderer,
      width: 120,
    },
  ]);
  const [rowData] = useState(getData());
  const getDataPath = useCallback<GetDataPath>((data) => data.field, []);
  const themeClass = isDarkMode ? `${gridTheme}-dark` : gridTheme;
  const autoGroupColumnDef = useMemo<ColDef>(() => {
    return {
      rowDrag: true,
      headerName: '字段名',
      field: 'field',
      width: 330,
      pinned: 'left',
      // sort: 'asc',
      editable: true,

      cellRenderer: 'agGroupCellRenderer',
      cellRendererParams: {
        suppressCount: true,
        innerRenderer: EmployeeCellRenderer,
      },
    };
  }, []);

  const onRowDragEnd = useCallback((event: RowDragEndEvent) => {
    console.log('Row drag ended', event);
    // 在这里处理拖拽结束后的逻辑
  }, []);

  const columns = useMemo(() => {
    return [
      {
        headerName: '字段类型',
        field: 'fieldType',
        width: 120,
        cellEditor: 'agRichSelectCellEditor',
        editable: true,
        cellEditorParams: {
          values: ['string', 'number', 'boolean', 'array', 'object'],
        },
      },
      {
        headerName: '字段名称',
        field: 'title',
        width: 120,
        editable: true,
        cellEditor: 'agTextCellEditor',
      },
      {
        headerName: '字段描述',
        field: 'desc',
        width: 120,
        editable: true,
        cellEditor: 'agTextCellEditor',
      },
      {
        headerName: '必填',
        field: 'required',
        width: 120,
        editable: true,
        cellEditor: 'agSelectCellEditor',
        cellEditorParams: {
          values: ['是', '否'],
        },
      },
      {
        field: '操作',
        cellRenderer: ContactCellRenderer,
        minWidth: 200,
        maxWidth: 200,
      },
    ];
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={classNames(themeClass, styles.grid)}>
          <AgGridReact
            ref={gridRef}
            columnDefs={columns}
            // columnDefs={colDefs}
            rowData={rowData}
            groupDefaultExpanded={-1}
            getDataPath={getDataPath}
            treeData
            autoGroupColumnDef={autoGroupColumnDef}
            rowDragManaged={true}
            animateRows={true}
            defaultColDef={{
              flex: 1,
            }}
            // rowSelection={'multiple'}
            // rowGroupPanelShow={'always'}
            enableRangeSelection={true}
          />
        </div>
      </div>
    </div>
  );
};

export default AgTable;
