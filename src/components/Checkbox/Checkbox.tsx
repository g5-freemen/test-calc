/* eslint-disable react/jsx-props-no-spreading */
import React, { InputHTMLAttributes, useId } from 'react';

import styles from './Checkbox.module.scss';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export const Checkbox = ({ label, checked, onChange }: Props) => {
  const id = useId();

  return (
    <div className={styles.row}>
      <input id={id} type="checkbox" checked={checked} onChange={onChange} />
      <label htmlFor={id}>{label}</label>
    </div>
  );
};
