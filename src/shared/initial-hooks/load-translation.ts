import { LOAD_TRANSLATIONS } from '../../store/actions/translation';
import { initializeStore } from '../../store';

export const loadTranslation = async ({ store, res, ctx }) => {
  // small workaround for using this hook in _app and in page component
  const storeInstance: ReturnType<typeof initializeStore> = store || ctx.store;
  const isHighLevelHook = !store;

  if (isHighLevelHook) {
    const resInstance = res || ctx.res;

    await LOAD_TRANSLATIONS(storeInstance.getState().Translation.defaultLang)(
      storeInstance.dispatch,
      storeInstance.getState,
      {
        isServer: !!resInstance,
      },
    );
  } else {
    let unsubscribe: ReturnType<typeof storeInstance['subscribe']>;

    await new Promise((resolve) => {
      unsubscribe = storeInstance.subscribe(() => {
        if (!!Object.keys(storeInstance.getState().Translation.data).length) {
          resolve();
        }
      });
    });

    unsubscribe();
  }

  return {};
};
