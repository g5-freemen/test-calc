import { Result } from '../../types';

export type ActionType = {
  type?: string;
  payload?: any;
};

export type Language = 'en' | 'ru';

export type Cart = Result[];

export type State = {
  language: Language;
  cart: Cart;
};
