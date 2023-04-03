/* eslint-disable react/jsx-props-no-spreading */
import React, { InputHTMLAttributes } from 'react';

import styles from './Input.module.scss';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const Input = (props: Props) => {
  const { type = 'text', label, min, max, step, onChange, value } = props;

  const rangeProps: any = {};
  if (type === 'range') {
    rangeProps.min = min;
    rangeProps.max = max;
    rangeProps.step = step;
  }

  return (
    <>
      {label && <p className={styles.label}>{label}</p>}
      <div className={styles.row}>
        {min}
        <input className={styles.input} type={type} {...rangeProps} onChange={onChange} />
        {max}
        {value && type === 'range' && <div className={styles.rangeValue}>{value}</div>}
      </div>
    </>
  );
};
