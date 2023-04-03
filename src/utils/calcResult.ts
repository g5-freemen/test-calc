import uuid from 'react-uuid';

import { InitialData, Item, Result } from '../types';
import { fixDigits } from './fixDigits';

interface Props {
  listsData: {
    s: number;
    listNum: number;
  };
  pipesData: {
    Wc: number;
    Lc: number;
    q: number;
  };
  selected: InitialData;
  fixesNum: number;
  items: Item[];
}

export const calcResult = ({ listsData, pipesData, selected, fixesNum, items }: Props) => {
  const { s, listNum } = listsData;
  const { Lc, Wc, q } = pipesData;

  const res: Result = {
    id: uuid(),
    Lc,
    Wc,
    q,
    s,
    table: [
      {
        name: selected.list!.name,
        unit: selected.list!.unit,
        quantity: fixDigits(listNum),
        sum: fixDigits(listNum * (selected.list?.price || 0)),
      },
      {
        name: selected.pipe!.name,
        unit: selected.pipe!.unit,
        quantity: fixDigits(q),
        sum: fixDigits(selected.pipe!.price * q),
      },
      {
        name: items[0].name,
        unit: items[0].unit,
        quantity: fixDigits(fixesNum),
        sum: fixDigits(fixesNum * items[0].price),
      },
    ],
    total: 0,
  };

  res.total = +res.table.reduce((acc, cur) => acc + cur.sum, 0).toFixed(2);

  return res;
};
