import React from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import uuid from 'react-uuid';

import { columns } from '../../data/tableColumns';
import { addToCart, deleteFromCart } from '../../redux/reducers/globalReducer';
import { Result } from '../../types';
import { AUTOCLOSE, currency, publicImgFolder } from '../../utils/consts';
import { fixDigits } from '../../utils/fixDigits';
import { Table } from '../Table/Table';
import styles from './Product.module.scss';

interface Props {
  result: Result;
  showInfo?: boolean;
  showSave?: boolean;
  showDelete?: boolean;
}

export const Product = (props: Props) => {
  const { result, showInfo = false, showSave = false, showDelete = false } = props;
  const dispatch = useDispatch();

  const handleSave = () => {
    const newResult = { ...result, id: uuid() };
    dispatch(addToCart(newResult));
    toast('Добавлено в корзину', { autoClose: AUTOCLOSE, type: 'success', theme: 'colored', position: 'top-left' });
  };

  const handleDelete = () => {
    dispatch(deleteFromCart(result.id));
    toast('Удалено из корзины', { type: 'warning', autoClose: AUTOCLOSE, theme: 'colored', position: 'top-left' });
  };

  return (
    <>
      {showDelete && (
        <button type="button" onClick={handleDelete} onKeyDown={handleDelete} className={styles.deleteButton}>
          ✖
        </button>
      )}
      {showInfo && (
        <div>
          <div className="flex">
            <div className="img" style={{ backgroundImage: `url('${publicImgFolder}frame.jpg')` }} />
            <div className="img" style={{ backgroundImage: `url('${publicImgFolder}photo.jpg')` }} />
          </div>
          <p>- L и W - длина и ширина каркаса</p>
          <p>- Lc и Wc - длина и ширина ячейки</p>
        </div>
      )}
      {(!!result?.s || !!result?.total) && (
        <>
          <p>Площадь изделия: {result.s} м²</p>
          <p>Расчетный размер ячейки: {`${fixDigits(result.Lc)} x ${fixDigits(result.Wc)}`}</p>
          <Table columns={columns} data={result.table} />
          <p className="row">
            Итоговая стоимость: {result.total} {currency}
            {showSave && (
              <button type="button" onClick={handleSave} onKeyDown={handleSave}>
                + В корзину
              </button>
            )}
          </p>
        </>
      )}
    </>
  );
};
