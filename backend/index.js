// importing the dependencies
const express = require('express');
const cors = require('cors');

const { startDatabase } = require('./database/mongo');
const { getBoardList, getBoard, updateBoard, insertBoard } = require('./database/board-data');

// defining the Express app
const app = express();

app.use(express.json());
app.use(cors());

////// defining endpoints //////////

app.get('/', async (req, res) => {
    res.send({
        status: 'Mock Trello API is Working'
    });
});

app.get('/getAllBoards', async (req, res) => {
    res.send(await getBoardList());
});

app.get('/getBoardData', async (req, res) => {
    res.send(await getBoard(req.query.boardVal));
});

app.post('/saveBoardData', async (req, res) => {
    res.send(await updateBoard(req.body));
});

app.post('/createBoard', async (req, res) => {
    res.send(await insertBoard(req.body));
});

/////////////////////////////////

// start the MongoDB instance
startDatabase().then(async () => {
    // start the server
    app.listen(3001, async () => {
        console.log('Mock Trello is listening on port 3001');
    });
});