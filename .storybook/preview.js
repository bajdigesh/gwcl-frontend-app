import React from 'react';
import { ThemeProvider } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppTheme from '../src/AppTheme';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  options: {
    storySort: (a, b) => (a[1].kind === b[1].kind ? 0 : a[1].id.localeCompare(b[1].id, undefined, { numeric: true })),
  },
};

export const decorators = [
  Story => (
    <ThemeProvider theme={AppTheme}>
      <CssBaseline />
      <Story />
    </ThemeProvider>
  ),
];
