import { AnyAction } from 'redux';
import { actions } from '../actions/translation';
import { ITranslationStore } from '../../interfaces/translationStore';

export function Translation(
  state: ITranslationStore = {
    loader: false,
    lang: 'en',
    defaultLang: 'en',
    data: {},
  },
  action: AnyAction,
): ITranslationStore {
  switch (action.type) {
    case actions.LOAD_TRANSLATIONS_START:
      return {
        ...state,
        loader: true,
      };
    case actions.LOAD_TRANSLATIONS_SUCCESS:
      return {
        ...state,
        data: {
          ...state.data,
          [action.lang]: action.translation,
        },
        loader: false,
      };
    case actions.SET_LANG:
      let defaultLang: string = state.defaultLang;

      if (!defaultLang || action.setAsDefault) {
        defaultLang = action.lang;
      }

      return {
        ...state,
        lang: action.lang,
        defaultLang,
      };
    default:
      return state;
  }
}
