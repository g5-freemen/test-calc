import { ConfigFix, InitialData } from '../types';

interface Props {
  s: number;
  selected: InitialData;
  fixes: ConfigFix[];
}

export const calcFixes = ({ s, selected, fixes }: Props) => {
  const fix = fixes.find((el) => el.key === selected.list?.material);
  if (!fix?.value || !Number.isFinite(fix.value)) {
    return 0;
  }

  const fixesNum = Math.ceil(s * fix.value);
  return fixesNum;
};
