import { call, put, select, takeLatest } from 'redux-saga/effects';

import { GET_BOARDS, CREATE_BOARD, CANCEL_ADDITION } from './constants';
import { getBoardsSuccess, getAddBoard, getBoards, handleValueChange } from './action';
import { makeSelectNewBoardValue } from './selectors';

import { HTTP_REQUEST } from 'utils/HTTPrequest';

export function* getBoardList() {
    let requestUrl = 'http://localhost:3001/getAllBoards';
    try {
        const boardList = yield call(HTTP_REQUEST, requestUrl);
        yield put(getBoardsSuccess(boardList));
    } catch (error) {
        console.log(error);
    }
}

export function* saveNewBoard() {
    let boardName = yield select(makeSelectNewBoardValue());
    let boardData = {
        boardName: boardName,
        lists: []
    }
    let postRequest = {
        data: boardData
    }
    let requestUrl = `http://localhost:3001/createBoard`;
    let options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(postRequest),
    }
    try {
        const saveDataResponse = yield call(HTTP_REQUEST, requestUrl, options);
        yield put(getAddBoard(false));
        yield put(handleValueChange(''));
        yield put(getBoards());
    } catch (error) {
        console.log(error);
    }
}

export function* cancelBoardAddition() {
    try {
        yield put(handleValueChange(''));
        yield put(getAddBoard(false));
    } catch (error) {

    }
}

export default function* boardData() {
    yield takeLatest(GET_BOARDS, getBoardList);
    yield takeLatest(CREATE_BOARD, saveNewBoard);
    yield takeLatest(CANCEL_ADDITION, cancelBoardAddition);
}
