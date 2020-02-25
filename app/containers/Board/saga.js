import { call, put, select, takeLatest, all } from 'redux-saga/effects';

import { GET_BOARD_DATA, SAVE_BOARD_DATA, DRAG_COMPLETE, CANCEL_ADD_NEW, ADD_NEW_ELEMENT, ADD_NEW_CARD } from './constants';
import { makeSelectBoardID, makeSelectBoardData, makeSelectDragOverCard, makeSelectNewListValue, makeSelectNewCardValue, makeSelectListID } from './selectors';
import { getBoardDataSuccess, dragCard, updateBoard, newContent, handleChange, setListID } from './action';

import { HTTP_REQUEST } from 'utils/HTTPrequest';

export function* getBoardData() {
    let boardID = yield select(makeSelectBoardID());
    let requestUrl = `http://localhost:3001/getBoardData?boardVal=${boardID}`;
    try {
        const boardData = yield call(HTTP_REQUEST, requestUrl);
        yield put(getBoardDataSuccess(boardData));
    } catch (error) {
        console.log(error);
    }
}

export function* saveBoardData() {
    let boardData = yield select(makeSelectBoardData());
    let boardID = yield select(makeSelectBoardID());
    let postRequest = {
        boardID: boardID,
        data: boardData
    }
    let requestUrl = `http://localhost:3001/saveBoardData`;
    let options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(postRequest),
    }
    try {
        const saveDataResponse = yield call(HTTP_REQUEST, requestUrl, options);
        alert(saveDataResponse.message);
    } catch (error) {
        console.log(error);
    }
}

export function* onDragComplete(action) {
    try {
        let boardData = yield select(makeSelectBoardData());
        let dragOverCard = yield select(makeSelectDragOverCard());
        let tempBoardData = JSON.parse(JSON.stringify(boardData));
        yield put(dragCard(null, 'DRAG'));
        let tempCardData;
        let hoveredCardIndex = 0;
        tempBoardData.lists.forEach(list => {
            list.cards.forEach((card, index) => {
                if (card.cardID == action.payload.sourceId) {
                    tempCardData = card;
                    list.cards.splice(index, 1);
                }
                if ((list.listID == action.payload.listID) && (card.cardID == dragOverCard)) {
                    hoveredCardIndex = index;
                }
            });
        });
        tempBoardData.lists[Number(action.payload.listID.split('_').pop())].cards.splice(hoveredCardIndex, 0, tempCardData);
        yield put(updateBoard(tempBoardData));
    } catch (error) {
        console.log(error);
    }
}

export function* onCancelNewAdd(action) {
    try {
        yield put(newContent(action.payload.value, action.payload.type));
        yield call(onClearValue, action.payload.type);
    } catch (error) {
        console.log(error);
    }
}

export function* onNewAdd(action) {
    try {
        let boardData = yield select(makeSelectBoardData());
        let tempBoardData = JSON.parse(JSON.stringify(boardData));
        if (action.payload.elementType == "LIST") {
            let newListValue = yield select(makeSelectNewListValue());
            let list = {
                listID: `LST_${tempBoardData.lists.length}`,
                listName: newListValue,
                cards: []
            }
            tempBoardData.lists.push(list);
        }
        else if (action.payload.elementType == "CARD") {
            let selectedListID = yield select(makeSelectListID());
            let newCardValue = yield select(makeSelectNewCardValue());
            let card;
            tempBoardData.lists.forEach(list => {
                if (selectedListID == list.listID) {
                    card = {
                        cardID: `LST_${list.listID.split('_').pop()}_CRD_${list.cards.length}`,
                        cardName: newCardValue
                    }
                    list.cards.push(card);
                }
            });
        }
        yield put(updateBoard(tempBoardData));
        yield put(newContent(false, action.payload.elementType));
        yield call(onClearValue, action.payload.elementType);
    } catch (error) {
        console.log(error);
    }
}

export function* onNewCard(action) {
    try {
        yield put(setListID(action.payload.listID));
        yield put(newContent(action.payload.value, action.payload.type));
    } catch (error) {
        console.log(error);
    }
}

export function* onClearValue(type) {
    try {
        yield put(handleChange('', type));
        if (type == 'CARD') {
            yield put(setListID(null));
        }
    } catch (error) {
        console.log(error);
    }
}

export function* boardDataFetch() {
    yield takeLatest(GET_BOARD_DATA, getBoardData);
}

export function* boardDataSave() {
    yield takeLatest(SAVE_BOARD_DATA, saveBoardData);
}

export function* dragComplete() {
    yield takeLatest(DRAG_COMPLETE, onDragComplete);
}

export function* newAdditionCancel() {
    yield takeLatest(CANCEL_ADD_NEW, onCancelNewAdd)
}

export function* newElementAddition() {
    yield takeLatest(ADD_NEW_ELEMENT, onNewAdd)
}

export function* newCardAddition() {
    yield takeLatest(ADD_NEW_CARD, onNewCard)
}

export default function* boardSaga() {
    yield all([
        boardDataFetch(),
        boardDataSave(),
        dragComplete(),
        newAdditionCancel(),
        newElementAddition(),
        newCardAddition()
    ]);
}