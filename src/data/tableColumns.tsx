import React from 'react';
import { Column } from 'react-table';

import { ResultTable } from '../types';

export const columns: Array<Column<ResultTable>> = [
  {
    Header: 'Наименование',
    accessor: 'name',
  },
  {
    Header: (
      <>
        Единица
        <br />
        измерения
      </>
    ),
    accessor: 'unit',
  },
  {
    Header: 'Количество',
    accessor: 'quantity',
  },
  {
    Header: 'Сумма',
    accessor: 'sum',
  },
];
