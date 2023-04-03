import {
  ColumnGroup,
  ColumnWithLooseAccessor,
  ColumnWithStrictAccessor,
  UseExpandColumnsColumnOptions,
  UseExpandColumnsColumnProps,
  UseExpandColumnsState,
  UseExpandedOptions,
  UseResizeColumnsColumnOptions,
  UseResizeColumnsColumnProps,
  UseResizeColumnsOptions,
  UseResizeColumnsState,
} from 'react-table';

declare module 'react-table' {
  interface CustomColumnFields {
    fixed?: 'left' | 'right';
  }
  export interface TableOptions<D extends Record<string, unknown>>
    extends UseExpandedOptions<D>,
      UseResizeColumnsOptions<D> {}

  export interface TableState<D extends Record<string, unknown> = Record<string, unknown>>
    extends UseResizeColumnsState<D>,
      UseExpandColumnsState {}

  export interface ColumnInterface<D extends Record<string, unknown> = Record<string, unknown>>
    extends CustomColumnFields,
      UseExpandColumnsColumnOptions,
      UseResizeColumnsColumnOptions<D> {}

  export interface ColumnInstance<D extends Record<string, unknown> = Record<string, unknown>>
    extends CustomColumnFields,
      UseExpandColumnsColumnProps,
      UseResizeColumnsColumnProps<D> {}

  export type Column<D extends object = {}> = ColumnGroup<D> | ColumnWithLooseAccessor<D> | ColumnWithStrictAccessor<D>;
}
