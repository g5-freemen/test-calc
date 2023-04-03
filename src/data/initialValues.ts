import {
  ConfigFix,
  ConfigFrame,
  ConfigMaterial,
  ConfigSize,
  InitialData,
  InitialSizes,
  ListItem,
  Result,
} from '../types';

import config from './config.json';
import db from './db.json';

export const lists = db.filter((el) => el.type === 'list') as ListItem[];
export const pipes = db.filter((el) => el.type === 'pipe');
export const items = db.filter((el) => ![...lists, ...pipes].includes(el));
export const sizes = config.filter((el) => el.type === 'size') as ConfigSize[];
export const sizeWidth = sizes.find((el) => el.key === 'width');
export const sizeLength = sizes.find((el) => el.key === 'length');
export const frames = config.filter((el) => el.type === 'frame') as ConfigFrame[];
export const materials = config.filter((el) => el.type === 'material') as ConfigMaterial[];
export const fixes = config.filter((el) => el.type === 'fix') as ConfigFix[];

export const initialFilters = materials.map((material) => ({ ...material, checked: true }));

export const initialSizes: InitialSizes = {
  width: sizeWidth?.max || 0,
  length: sizeLength?.max || 0,
};

export const initialData: InitialData = {
  list: null,
  pipe: null,
  frame: null,
};

export const initialResult: Result = {
  id: '',
  Lc: 0,
  Wc: 0,
  q: 0,
  s: 0,
  table: [],
  total: 0,
};
