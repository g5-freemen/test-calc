import '../../style/main.scss';

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { Checkbox } from '../../components/Checkbox/Checkbox';
import { Dropdown } from '../../components/Dropdown/Dropdown';
import { Input } from '../../components/Input/Input';
import { Product } from '../../components/Product/Product';
import {
  fixes,
  frames,
  initialData,
  initialFilters,
  initialResult,
  initialSizes,
  items,
  lists,
  materials,
  pipes,
  sizeLength,
  sizeWidth,
} from '../../data/initialValues';
import { ConfigFrame, Item, ListItem } from '../../types';
import calcFns from '../../utils';
import { currency } from '../../utils/consts';
import useWindowDimensions from '../../utils/hooks/useWindowDimensions';

export const MainPage = () => {
  const { isVertical } = useWindowDimensions();
  const flexDirection = isVertical ? 'column' : 'row';

  const [filters, setFilters] = useState(initialFilters);
  const [currentSize, setCurrentSize] = useState(initialSizes);
  const [selected, setSelected] = useState(initialData);
  const [result, setResult] = useState(initialResult);

  const handleClear = () => {
    setSelected(initialData);
    setCurrentSize(initialSizes);
    setFilters(filters.map((el) => ({ ...el, checked: true })));
  };

  useEffect(() => {
    const isSelected = Object.values(selected).every(Boolean);
    const isSizes = Object.values(currentSize).every((val) => Number.isFinite(val));

    if (!isSizes || !isSelected || items?.length !== 1) {
      setResult(initialResult);
      return;
    }

    const { length, width } = currentSize;

    const listsData = calcFns.calcLists(length, width, selected);
    const pipesData = calcFns.calcPipes(length, width, selected);

    if (!listsData || !pipesData) return;

    const fixesNum = calcFns.calcFixes({ s: listsData.s, selected, fixes });

    if (!fixesNum) return;

    const res = calcFns.calcResult({ listsData, pipesData, selected, fixesNum, items });

    setResult(res);
  }, [selected, currentSize]);

  return (
    <div className="wrapper" style={{ flexDirection }}>
      <Link to="/cart" className="link">
        Корзина <div aria-label="cart icon">🛒</div>
      </Link>
      <section className="frame">
        <div className="materials">
          Материал:
          {filters.map((el) => (
            <Checkbox
              key={el.name}
              label={el.name}
              checked={el.checked}
              onChange={(e) => {
                const idx = filters.findIndex((m) => m.name === el.name);
                if (idx >= 0) {
                  const arr = [...filters];
                  arr[idx].checked = e.target.checked;
                  setFilters(arr);
                  setSelected((prev) => ({ ...prev, list: null }));
                }
              }}
            />
          ))}
        </div>
        <Dropdown
          label="Лист:"
          items={lists.filter((el) => filters.map((m) => m.checked && m.key).includes(el.material))}
          itemToString={(el: ListItem) => {
            const material = materials.find((m) => m.key === el.material)?.name;
            return `${el.name} (${material}) = ${el.price}${el.unit && ` ${currency}/${el.unit}`}`;
          }}
          onChange={(list) => setSelected((prev) => ({ ...prev, list }))}
          value={selected.list}
        />
        <Dropdown
          label="Труба:"
          items={pipes}
          itemToString={(el: Item) => `${el.name} = ${el.price}${el.unit && ` ${currency}/${el.unit}`}`}
          onChange={(pipe) => setSelected((prev) => ({ ...prev, pipe }))}
          value={selected.pipe}
        />
        <Input
          label="ширина:"
          type="range"
          min={sizeWidth?.min}
          max={sizeWidth?.max}
          step={sizeWidth?.step}
          onChange={(ev) => setCurrentSize((prev) => ({ ...prev, width: +ev.target.value }))}
          value={currentSize.width}
        />
        <Input
          label="длина:"
          type="range"
          min={sizeLength?.min}
          max={sizeLength?.max}
          step={sizeLength?.step}
          onChange={(ev) => setCurrentSize((prev) => ({ ...prev, length: +ev.target.value }))}
          value={currentSize.length}
        />
        <Dropdown
          label="прочность:"
          items={frames}
          onChange={(frame) => setSelected((prev) => ({ ...prev, frame }))}
          itemToString={(el: ConfigFrame) => `${el.name} (макс.шаг ${el.step}м)`}
          value={selected.frame}
        />
        {(Object.values(selected).some(Boolean) || Object.values(currentSize).some(Boolean)) && (
          <button type="button" className="link" onClick={handleClear} onKeyDown={handleClear}>
            Очистить
          </button>
        )}
      </section>

      <section className="frame">
        <Product result={result} showInfo showSave />
      </section>
    </div>
  );
};
