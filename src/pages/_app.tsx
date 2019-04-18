import React from 'react';
import App, { Container } from 'next/app';
import { Provider } from 'react-redux';
import withRedux from 'next-redux-wrapper';
import { initializeStore } from '../store';
import { withTheme, getPageContext } from '../theme';
import { loadTranslation } from '../shared/initial-hooks/load-translation';
import { combineHooks } from '../shared/initial-hooks/combine-hooks';

class MyApp extends App {
  static getInitialProps = combineHooks([
    loadTranslation,
    async ({ Component, ctx }) => {
      if (Component.getInitialProps) {
        return {
          pageProps: await Component.getInitialProps(ctx),
        };
      } else {
        return {};
      }
    },
  ]);

  props: {
    Component: React.Component;
    store: ReturnType<typeof initializeStore>;
    pageProps: any;
  };
  pageContext: any;

  constructor(props) {
    super(props);
    this.pageContext = getPageContext();
  }

  componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }

  render() {
    const { Component, store, pageProps } = this.props;

    return (
      <Container>
        <Provider store={store}>
          {withTheme(Component, {
            ...pageProps,
            pageContext: this.pageContext,
          })}
        </Provider>
      </Container>
    );
  }
}

export default withRedux(initializeStore)(MyApp);
