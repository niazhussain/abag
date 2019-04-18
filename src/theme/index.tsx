import React from 'react';
import red from '@material-ui/core/colors/red';
import yellow from '@material-ui/core/colors/yellow';
import CssBaseline from '@material-ui/core/CssBaseline';
import { SheetsRegistry } from 'jss';
import { createGenerateClassName } from '@material-ui/core/styles';
import JssProvider from 'react-jss/lib/JssProvider';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

declare const global: any;

declare const process: NodeJS.Process & { browser: boolean };

const shadow = '0px 1px 4px 0px rgba(0, 0, 0, .1)';

export function prepareToPixels(styles) {
  return Object.keys(styles).reduce((acc, key) => {
    if (typeof styles[key] === 'number') {
      acc[key] = styles[key] + 'px';
    } else if (typeof styles[key] === 'object') {
      acc[key] = prepareToPixels(styles[key]);
    }

    return acc;
  }, {});
}

export const theme = createMuiTheme({
  palette: {
    primary: {
      main: yellow[600],
    },
    secondary: {
      main: red[400],
    },
    error: {
      main: red[400],
    },
    type: 'light',
    background: {
      default: '#f6f8f9',
      paper: '#fff',
    },
  },
  shadows: [
    'none',
    shadow,
    shadow,
    shadow,
    shadow,
    shadow,
    shadow,
    shadow,
    shadow,
    shadow,
    shadow,
    shadow,
    shadow,
    shadow,
    shadow,
    shadow,
    shadow,
    shadow,
    shadow,
    shadow,
    shadow,
    shadow,
    shadow,
    shadow,
    shadow,
  ],
  typography: {
    useNextVariants: true,
  },
});

export const shadows = {};

export function createPageContext() {
  return {
    theme,
    // This is needed in order to deduplicate the injection of CSS in the page.
    sheetsManager: new Map(),
    // This is needed in order to inject the critical CSS.
    sheetsRegistry: new SheetsRegistry(),
    // The standard class name generator.
    generateClassName: createGenerateClassName(),
  };
}

export function getPageContext() {
  // Make sure to create a new context for every server-side request so that data
  // isn't shared between connections (which would be bad).
  if (!process.browser) {
    return createPageContext();
  }

  // Reuse context on the client-side.
  if (!global.__INIT_MATERIAL_UI__) {
    global.__INIT_MATERIAL_UI__ = createPageContext();
  }

  return global.__INIT_MATERIAL_UI__;
}

export function withTheme(App, props) {
  const { pageContext } = props;

  return (
    <JssProvider
      registry={pageContext.sheetsRegistry}
      generateClassName={pageContext.generateClassName}
    >
      <MuiThemeProvider
        theme={pageContext.theme}
        sheetsManager={pageContext.sheetsManager}
      >
        <CssBaseline />
        <App {...props} />
      </MuiThemeProvider>
    </JssProvider>
  );
}
