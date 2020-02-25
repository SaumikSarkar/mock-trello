/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import React, { useEffect, memo } from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { Link } from "react-router-dom";

import HomePageContainer from './homepage-container';
import HomePageSideNav from './home-page-sidenav';
import SideNavContainer from './side-nav-container';
import BoardTileContainer from './board-tile-container';
import BoardTile from './board-tile';
import AddBoardTile from './add-board-tile';
import BoardTileElement from './board-tile-element';
import AddBoardWrapper from './add-board-wrapper';
import AddTaskButton from '../Board/add-task-button';
import AddTileTextBox from './add-tile-textbox';
import { makeSelectBoardList, makeSelectNewBoard, makeSelectNewBoardValue } from './selectors';
import { getBoards, getAddBoard, handleValueChange, createBoard, cancelAddition } from './action';
import messages from './messages';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import reducer from './reducer';
import saga from './saga';

const key = 'home';

export function HomePage({
  boardList,
  addNewBoard,
  newBoardValue,
  fetchBoardData,
  getAddBoard,
  handleValue,
  createBoard,
  cancelAddition
}) {

  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  useEffect(() => {
    fetchBoardData();
  }, []);

  return (
    <article>
      <Helmet>
        <title>Home</title>
        <meta
          name="description"
          content="Mock Trello - Home Page"
        />
      </Helmet>
      <HomePageContainer>
        <SideNavContainer>
          <HomePageSideNav></HomePageSideNav>
        </SideNavContainer>
        <BoardTileContainer>
          {
            boardList.map((boardValue) => (
              <Link key={boardValue.boardID} to={`/board/${boardValue.boardID}`}>
                <BoardTile>
                  <BoardTileElement>{boardValue.boardName}</BoardTileElement>
                </BoardTile>
              </Link>
            ))
          }
          {
            !addNewBoard &&
            <AddBoardTile onClick={(evt, value) => getAddBoard(event, true)}>
              <BoardTileElement>+ Create New Board</BoardTileElement>
            </AddBoardTile>
          }
          {
            addNewBoard &&
            <AddBoardWrapper>
              <AddTileTextBox rows="3" 
                value={newBoardValue}
                onChange={(evt) => handleValue(event)}>
              </AddTileTextBox>
              <div>
                <AddTaskButton buttonText={messages.createContent}
                  clicked={createBoard}>
                </AddTaskButton>
                <AddTaskButton buttonText={messages.createContentCancel}
                  clicked={(evt) => cancelAddition(event)}>
                </AddTaskButton>
              </div>
            </AddBoardWrapper>
          }
        </BoardTileContainer>
      </HomePageContainer>
    </article>
  );
}

const mapStateToProps = createStructuredSelector({
  boardList: makeSelectBoardList(),
  addNewBoard: makeSelectNewBoard(),
  newBoardValue: makeSelectNewBoardValue()
});

const mapDispatchToProps = (dispatch) => ({
  fetchBoardData: () => dispatch(getBoards()),
  getAddBoard: (evt, value) => dispatch(getAddBoard(value)),
  handleValue: (evt) => dispatch(handleValueChange(evt.target.value)),
  createBoard: (evt) => dispatch(createBoard()),
  cancelAddition: (evt) => dispatch(cancelAddition())
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(HomePage);