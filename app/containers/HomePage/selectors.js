/**
 * Home page selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectHome = state => state.home || initialState;

const makeSelectBoardList = () => createSelector(
    selectHome,
    homeState => homeState.boards
);

const makeSelectNewBoard = () => createSelector(
    selectHome,
    homeState => homeState.addNewBoard
);

const makeSelectNewBoardValue = () => createSelector(
    selectHome,
    homeState => homeState.newBoardValue
);

export {
    makeSelectBoardList,
    makeSelectNewBoard,
    makeSelectNewBoardValue
}