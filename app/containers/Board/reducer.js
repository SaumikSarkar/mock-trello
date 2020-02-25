/*
 *
 * Board reducer
 *
 */
import produce from 'immer';

import { NEW_LIST, GET_BOARD_DATA, GET_BOARD_DATA_SUCCESS, HANDLE_CHANGE_LIST, NEW_CARD, HANDLE_CHANGE_CARD, SET_SELECTED_LIST_ID, CHANGE_DRAG_STATUS, UPDATE_BOARD_DATA } from './constants';

export const initialState = {
    boardID: null,
    boardData: {
        boardName: null,
        lists: []
    },
    showEditList: false,
    showEditCard: false,
    newListValue: '',
    newCardValue: '',
    selectedListID: null,
    dragOverCard: null,
};

const boardReducer = (state = initialState, action) =>
    produce(state, draft => {
        switch (action.type) {
            case HANDLE_CHANGE_LIST:
                return { ...state, newListValue: action.payload.valueName };
            case NEW_LIST:
                return { ...state, showEditList: action.payload };
            case NEW_CARD:
                return { ...state, showEditCard: action.payload };
            case HANDLE_CHANGE_CARD:
                return { ...state, newCardValue: action.payload.valueName };
            case SET_SELECTED_LIST_ID:
                return { ...state, selectedListID: action.payload };
            case CHANGE_DRAG_STATUS:
                return { ...state, dragOverCard: action.payload };
            case GET_BOARD_DATA_SUCCESS:
                draft.boardData = action.payload.boardData;
                break;
            case GET_BOARD_DATA:
                return { ...state, boardID: action.payload.boardID };
            case UPDATE_BOARD_DATA:
                draft.boardData = action.payload.boardData;
                break;
            default:
                return state;
        }

    });

export default boardReducer;
