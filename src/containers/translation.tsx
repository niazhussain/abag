import { connect } from 'react-redux';
import get from 'lodash.get';
import { IStore } from '../interfaces/store';

export const Translation = connect(mapStateToProps)(
  (props: { text: string }) => {
    return props.text;
  },
);

function mapStateToProps(
  store: IStore,
  props: {
    translateKey: string;
  },
) {
  const data: any =
    store.Translation.data[store.Translation.lang] ||
    store.Translation.data[store.Translation.defaultLang];

  const text: string = get(data, props.translateKey, props.translateKey);

  return {
    text,
  };
}
