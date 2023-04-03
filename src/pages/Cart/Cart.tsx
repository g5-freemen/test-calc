/* eslint-disable react/no-array-index-key */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { Product } from '../../components/Product/Product';
import { selectCart, setCart } from '../../redux/reducers/globalReducer';
import { fixDigits } from '../../utils/fixDigits';
import useWindowDimensions from '../../utils/hooks/useWindowDimensions';

export const Cart = () => {
  const dispatch = useDispatch();
  const { isVertical } = useWindowDimensions();
  const flexDirection = isVertical ? 'column' : 'row';
  const cart = useSelector(selectCart);
  const finalPrice = cart?.reduce((acc, cur) => acc + cur.total, 0);

  const handleClear = () => {
    dispatch(setCart([]));
  };

  return (
    <div className="wrapper container">
      <Link to="/" className="link">
        Назад
      </Link>
      {!cart || cart?.length === 0 ? (
        <h2 style={{ margin: '2rem auto' }}>Корзина пуста</h2>
      ) : (
        <>
          <button
            type="button"
            className="link"
            style={{ left: '1vmin' }}
            onClick={handleClear}
            onKeyDown={handleClear}
          >
            Очистить корзину
          </button>
          <ul className="itemsList" style={{ flexDirection }}>
            {cart.map((el) => (
              <li key={el.id} className="frame product" style={{ height: 'fit-content' }}>
                <Product result={el} showDelete />
              </li>
            ))}
          </ul>
          {finalPrice && <h2>Общая стоимость: {fixDigits(finalPrice)}</h2>}
        </>
      )}
    </div>
  );
};
