export interface ITranslationStore {
  data: {
    [key: string]: any;
  };
  lang: string;
  defaultLang: string;
  loader: boolean;
}
