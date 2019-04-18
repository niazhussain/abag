import { ThunkAction } from 'redux-thunk';
import axios, { AxiosPromise, AxiosResponse } from 'axios';
import { AnyAction } from 'redux';

export const actions = {
  LOAD_TRANSLATIONS_SUCCESS: 'LOAD_TRANSLATIONS_SUCCESS',
  LOAD_TRANSLATIONS_START: 'LOAD_TRANSLATIONS_START',
  SET_LANG: 'SET_LANG',
};

export const LOAD_TRANSLATIONS_START = () => ({
  type: actions.LOAD_TRANSLATIONS_START,
});

export const LOAD_TRANSLATIONS_SUCCESS = (translation: any, lang: string) => ({
  type: actions.LOAD_TRANSLATIONS_SUCCESS,
  translation,
  lang,
});

/**
 *
 * @param lang current language
 * @param setAsDefault change default language if true
 */
export const SET_LANG = (lang: string, setAsDefault = false) => ({
  type: actions.SET_LANG,
  lang,
  setAsDefault,
});

export const LOAD_TRANSLATIONS = (
  lang: string,
): ThunkAction<
  AxiosPromise<any>,
  {},
  {
    isServer: boolean;
  },
  AnyAction
> => {
  return (dispatch, getState, getExtraParams) => {
    dispatch(LOAD_TRANSLATIONS_START());

    if (getExtraParams.isServer) {
      const fs = require('fs');

      return new Promise((resolve, reject) =>
        fs.readFile(`./src/static/i18n/${lang}.json`, 'utf8', (err, file) => {
          if (err) {
            return reject(err);
          }

          dispatch(LOAD_TRANSLATIONS_SUCCESS(JSON.parse(file), lang));

          resolve(file);
        }),
      );
    } else {
      return axios
        .get(`/static/i18n/${lang}.json`)
        .then((response: AxiosResponse) => {
          dispatch(LOAD_TRANSLATIONS_SUCCESS(response.data, lang));

          return response;
        });
    }
  };
};
