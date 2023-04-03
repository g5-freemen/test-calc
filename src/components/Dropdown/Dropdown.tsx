/* eslint-disable no-unused-vars */
import React from 'react';

import styles from './Dropdown.module.scss';

interface Props {
  label?: string;
  items: any[];
  itemToString: (val: any) => string;
  onChange: (val: any) => void;
  placeholder?: string;
  value: any;
}

export const Dropdown = ({ items, itemToString, onChange, placeholder, label, value }: Props) => {
  const newItems = [placeholder || '---', ...items];

  const thisValue = value ? (typeof value === 'string' ? value : itemToString(value)) : newItems[0];

  return (
    <>
      {label && <p className={styles.label}>{label}</p>}
      <select
        className={styles.select}
        onChange={(ev) => {
          const idx = ev.target.selectedIndex;
          onChange(idx === 0 ? null : newItems[idx]);
        }}
        value={thisValue}
      >
        {newItems.map((el, i) => {
          const val = typeof el === 'string' ? el : itemToString(el);
          return (
            <option key={val} style={{ color: i ? '#000' : '#ccc' }}>
              {val}
            </option>
          );
        })}
      </select>
    </>
  );
};
