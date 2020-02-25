import { NEW_LIST, UPDATE_BOARD_DATA, GET_BOARD_DATA, GET_BOARD_DATA_SUCCESS, HANDLE_CHANGE_LIST, NEW_CARD, HANDLE_CHANGE_CARD, SET_SELECTED_LIST_ID, CHANGE_DRAG_STATUS, SAVE_BOARD_DATA, DRAG_COMPLETE, CANCEL_ADD_NEW, ADD_NEW_ELEMENT, ADD_NEW_CARD } from './constants';

export function updateList(boardID) {
    return {
        type: GET_BOARD_DATA,
        payload: {
            boardID
        }
    }
}

export function getBoardDataSuccess(boardData) {
    return {
        type: GET_BOARD_DATA_SUCCESS,
        payload: {
            boardData
        }
    }
}

export function handleChange(valueName, changeType) {
    return {
        type: changeType == 'LIST' ? HANDLE_CHANGE_LIST : HANDLE_CHANGE_CARD,
        payload: {
            valueName
        }
    }
}

export function newContent(value, changeType) {
    return {
        type: changeType == 'LIST' ? NEW_LIST : NEW_CARD,
        payload: value
    }
}

export function setListID(listID) {
    return {
        type: SET_SELECTED_LIST_ID,
        payload: listID
    }
}

export function dragCard(data, type) {
    return {
        type: type == 'HOVER' ? CHANGE_DRAG_STATUS : null,
        payload: data
    }
}

export function updateBoard(boardData) {
    return {
        type: UPDATE_BOARD_DATA,
        payload: {
            boardData
        }
    }
}

export function saveBoard() {
    return {
        type: SAVE_BOARD_DATA
    }
}

export function onDragComplete(listID, sourceId) {
    return {
        type: DRAG_COMPLETE,
        payload: {
            listID,
            sourceId
        }
    }
}

export function cancelAddition(value, type) {
    return {
        type: CANCEL_ADD_NEW,
        payload: {
            value,
            type
        }
    }
}

export function onAddNewElement(elementType) {
    return {
        type: ADD_NEW_ELEMENT,
        payload: {
            elementType
        }
    }
}

export function onNewCard(value, type, listID) {
    return {
        type: ADD_NEW_CARD,
        payload: {
            value,
            type,
            listID
        }
    }
}