/**
 * Board page selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectBoard = state => state.board || initialState;

const makeSelectBoardID = () => createSelector(
    selectBoard,
    boardState => boardState.boardID
);

const makeSelectBoardData = () => createSelector(
    selectBoard,
    boardState => boardState.boardData
);

const makeSelectShowEditList = () => createSelector(
    selectBoard,
    boardState => boardState.showEditList
);

const makeSelectShowEditCard = () => createSelector(
    selectBoard,
    boardState => boardState.showEditCard
);

const makeSelectNewListValue = () => createSelector(
    selectBoard,
    boardState => boardState.newListValue
);

const makeSelectNewCardValue = () => createSelector(
    selectBoard,
    boardState => boardState.newCardValue
);

const makeSelectListID = () => createSelector(
    selectBoard,
    boardState => boardState.selectedListID
);

const makeSelectDragOverCard = () => createSelector(
    selectBoard,
    boardState => boardState.dragOverCard
);

export {
    makeSelectBoardID,
    selectBoard,
    makeSelectBoardData,
    makeSelectShowEditList,
    makeSelectShowEditCard,
    makeSelectNewListValue,
    makeSelectNewCardValue,
    makeSelectListID,
    makeSelectDragOverCard
}