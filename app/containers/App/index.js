/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import NotFoundPage from 'containers/NotFoundPage/Loadable';

import GlobalStyle from '../../global-styles';
import AppWrapper from './app-wrapper';
import AppHeader from '../AppHeader/index';
import { routes } from './constants';

export default function App() {
  return (
    <AppWrapper>
      <Helmet
        titleTemplate="%s | Mock Trello"
        defaultTitle="Mock Trello">
        <meta name="description" content="Mock Trello Appliation" />
      </Helmet>
      <AppHeader></AppHeader>
      <Switch>
        {
          routes.map((route) => (
            <Route exact {...route} path={route.path} component={route.component} key={route.key} />
          ))
        }
        <Route component={NotFoundPage} />
      </Switch>
      <GlobalStyle />
    </AppWrapper>
  );
}
