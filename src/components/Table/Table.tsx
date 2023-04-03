/* eslint-disable react/jsx-props-no-spreading */
import classNames from 'classnames';
import React from 'react';
import { Cell, Column, HeaderGroup, Row, TableCommonProps, TableState, useTable } from 'react-table';

import styles from './Table.module.css';

export type TableProps<T extends object> = {
  data: Array<T>;
  columns: Array<Column<T>>;
  className?: string;
  initialState?: Partial<TableState<T>>;
  // eslint-disable-next-line no-unused-vars
  getRowProps?: (row: Row<T>) => TableCommonProps;
};

const defaultPropGetter = () => ({});

export const Table = <T extends object>({
  data,
  columns,
  className,
  initialState = {},
  getRowProps = defaultPropGetter,
}: TableProps<T>) => {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data,
    initialState,
  });

  return (
    <div className={classNames(styles.wrapper, className && className)}>
      <table {...getTableProps()} className={styles.table}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr
              {...headerGroup.getHeaderGroupProps()}
              className={styles.fixedHeader}
              key={`${headerGroup.Header}_${headerGroup.Cell}`}
            >
              {headerGroup.headers.map((column: HeaderGroup<T>, i: number, arr: Array<HeaderGroup<T>>) => (
                <th
                  {...column.getHeaderProps()}
                  key={`${column.Cell}_${column.Header}`}
                  className={classNames(
                    styles.header,
                    column.fixed === 'left' && styles.fixed,
                    column.fixed === 'right' && styles.fixedRight,
                  )}
                >
                  <div
                    className={classNames(
                      styles.headerContent,
                      i === 0 && styles.noLeftBorder,
                      i === arr.length - 1 && styles.noRightBorder,
                    )}
                  >
                    {column.render('Header')}
                  </div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()} className={styles.tbody}>
          {rows.length > 0 ? (
            rows.map((row: Row<T>) => {
              prepareRow(row);
              const rowProps = row.getRowProps(getRowProps(row));
              rowProps.className = classNames(styles.row, rowProps.className);
              return (
                <tr {...rowProps} key={row.id}>
                  {row.cells.map((cell: Cell<T>, i: number, arr: Array<Cell<T>>) => (
                    <td
                      {...cell.getCellProps()}
                      key={`${row.id}_${cell.row.id}_${cell.column.id}`}
                      className={classNames(
                        styles.content,
                        cell.column.fixed === 'left' && styles.fixed,
                        cell.column.fixed === 'right' && styles.fixedRight,
                      )}
                    >
                      <div
                        className={classNames(
                          styles.cell,
                          i === 0 && styles.noLeftBorder,
                          i === arr.length - 1 && styles.noRightBorder,
                        )}
                      >
                        {cell.render('Cell')}
                      </div>
                    </td>
                  ))}
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan={columns.length} className={styles.noData}>
                No data
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
