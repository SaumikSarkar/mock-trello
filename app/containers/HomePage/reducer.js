/*
 *
 * Home Page reducer
 *
 */
import produce from 'immer';

import { GET_BOARDS_SUCCESS, ADD_NEW_BOARD, HANDLE_VALUE_CHANGE } from './constants';

export const initialState = {
    boards: [],
    addNewBoard: false,
    newBoardValue: ''
}

const homePageReducer = (state = initialState, action) =>
    produce(state, draft => {
        switch (action.type) {
            case GET_BOARDS_SUCCESS:
                draft.boards = action.payload.boardList;
                break;
            case ADD_NEW_BOARD:
                return { ...state, addNewBoard: action.payload.value };
            case HANDLE_VALUE_CHANGE:
                return { ...state, newBoardValue: action.payload.boardValue };
            default:
                return state;
        }

    });

export default homePageReducer;
