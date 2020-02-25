/*
 * AppConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

import React from 'react';
import { Redirect } from 'react-router';

import HomePage from 'containers/HomePage/Loadable';
import BoardPage from 'containers/Board/Loadable';

export const routes = [
    {
        path: '/',
        render: () => <Redirect to="/home" />,
        key: 'blank'
    },
    {
        path: '/home',
        component: HomePage,
        key: 'home'
    },
    {
        path: '/board/:id',
        component: BoardPage,
        key: 'board'
    },
]