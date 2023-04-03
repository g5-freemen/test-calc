export type Item = {
  type: string;
  name: string;
  unit: string;
  price: number;
};

export type ListItem = Item & {
  material: string;
  width: number;
};

export type PipeItem = Item & {
  width: number;
};

export type ConfigItem = {
  type: string;
  key: string;
  name: string;
};

export type ConfigMaterial = ConfigItem;
export type ConfigSize = ConfigItem & {
  min: number;
  max: number;
  step: number;
};
export type ConfigFrame = ConfigItem & {
  step: number;
};
export type ConfigFix = ConfigItem & {
  value: number;
};

export type InitialSizes = {
  width: number;
  length: number;
};

export type InitialData = {
  list: ListItem | null;
  pipe: PipeItem | null;
  frame: ConfigFrame | null;
};

export type ResultTable = {
  name: string;
  unit: string;
  quantity: number;
  sum: number;
};

export type Result = {
  id: string;
  Lc: number;
  Wc: number;
  q: number;
  s: number;
  table: ResultTable[];
  total: number;
};
