import { InitialData } from '../types';

import { fixDigits } from './fixDigits';

export const calcLists = (length: number, width: number, selected: InitialData) => {
  const s = fixDigits(width * length);
  const listNum = Math.ceil(s / (1 * (selected.list?.width || 0)));
  if (!Number.isFinite(listNum)) {
    return null;
  }
  return { s, listNum };
};
