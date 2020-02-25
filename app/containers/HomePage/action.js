import { GET_BOARDS, GET_BOARDS_SUCCESS, ADD_NEW_BOARD, CREATE_BOARD, HANDLE_VALUE_CHANGE } from './constants';

export function getBoards() {
    return {
        type: GET_BOARDS
    }
}

export function getBoardsSuccess(boardList) {
    return {
        type: GET_BOARDS_SUCCESS,
        payload: {
            boardList
        }
    }
}

export function getAddBoard(value) {
    return {
        type: ADD_NEW_BOARD,
        payload: {
            value
        }
    }
}

export function handleValueChange(boardValue) {
    return {
        type: HANDLE_VALUE_CHANGE,
        payload: {
            boardValue
        }
    }
}

export function createBoard() {
    return {
        type: CREATE_BOARD
    }
}