import { InitialData } from '../types';

export const calcPipes = (length: number, width: number, selected: InitialData) => {
  if (!selected.frame?.step || !selected.pipe?.width || !length || !width) {
    return null;
  }

  const pipeWidth = selected.pipe.width / 1000;

  // const Ln = Math.ceil(length / (selected.frame.step - pipeWidth));
  const Ln = Math.ceil((length - pipeWidth) / (selected.frame.step + pipeWidth));

  // const Lc = length / Ln;
  const Lc = (length - pipeWidth) / Ln - pipeWidth;

  // const Wn = Math.ceil(width / (selected.frame.step - pipeWidth));
  const Wn = Math.ceil((width - pipeWidth) / (selected.frame.step + pipeWidth));

  // const Wc = width / Wn;
  const Wc = (width - pipeWidth) / Wn - pipeWidth;

  const q = length * (Ln + 1) + width * (Wn + 1);

  const res = { Wc, Lc, q };

  return Object.values(res).every(Boolean) ? res : null;
};
