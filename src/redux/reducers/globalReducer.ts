import { Result } from '../../types';
import { RootState } from '../store';
import { ADD_TO_CART, DELETE_FROM_CART, RESET_STATE, SET_CART, SET_LANGUAGE } from './actions/globalActions';
import { ActionType, Language, State } from './types';

const initialState: State = {
  language: window.navigator.language.includes('ru') ? 'ru' : 'en',
  cart: [],
};

export default function globalReducer(state = initialState, action: ActionType = {}) {
  const { type, payload } = action;
  switch (type) {
    case SET_LANGUAGE: {
      return { ...state, language: payload };
    }
    case ADD_TO_CART: {
      return { ...state, cart: [...state.cart, payload] };
    }
    case DELETE_FROM_CART: {
      return { ...state, cart: [...state.cart].filter(({ id }) => id !== payload) };
    }
    case SET_CART: {
      return { ...state, cart: payload };
    }
    case RESET_STATE: {
      return initialState;
    }
    default: {
      return state;
    }
  }
}

export const setLanguage = (value: Language) => ({
  type: SET_LANGUAGE,
  payload: value,
});

export const setCart = (value: Result[]) => ({
  type: SET_CART,
  payload: value,
});

export const addToCart = (value: Result) => ({
  type: ADD_TO_CART,
  payload: value,
});

export const deleteFromCart = (value: string) => ({
  type: DELETE_FROM_CART,
  payload: value,
});

export const reset = () => ({ type: RESET_STATE });

export const selectLanguage = (store: RootState): Language => store.globalReducer.language;
export const selectCart = (store: RootState): Result[] => store.globalReducer.cart;
