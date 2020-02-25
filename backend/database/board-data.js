const { getDatabase } = require('./mongo');
var ObjectID = require('mongodb').ObjectID;

const collectionName = 'board-data';

async function insertBoard(data) {
    const database = await getDatabase();
    const { insertedId } = await database.collection(collectionName).insertOne(data);
    return { message: 'Board Added Successfully' };
}

async function getBoards() {
    const database = await getDatabase();
    return await database.collection(collectionName).find({}).toArray();
}

async function getBoardList() {
    let boardList = [];
    let boards = await getBoards();
    boards.forEach(boardValue => {
        let board = {
            boardID: boardValue._id,
            boardName: boardValue.data.boardName
        }
        boardList.push(board);
    });
    return boardList;
}

async function getBoard(id) {
    let boards = await getBoards();
    let boardData = {
        boardName: null,
        lists: []
    };
    boards.forEach(boardValue => {
        if (id == boardValue._id) {
            boardData = JSON.parse(JSON.stringify(boardValue.data));
        }
    });
    return boardData;
}

async function updateBoard(boardData) {
    const database = await getDatabase();
    try {
        await database.collection(collectionName).updateOne(
            { '_id': ObjectID(boardData.boardID) },
            {
                $set: {
                    'data': boardData.data
                }
            }
        );
        return { message: 'Board Data Saved Successfully' };
    } catch (error) {
        return { message: error };
    }
}

module.exports = {
    insertBoard,
    getBoards,
    getBoardList,
    getBoard,
    updateBoard
};