// Board

// This component comes in view when an user selects a particular board

import React, { useEffect, memo } from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import ContentWrapper from '../../components/ContentWrapper/index';
import BoardWrapper from './board-wrapper';
import Tile from '../../components/Tile/index';
import List from '../../components/List/index';
import { listWidth, listBackground, cardBackground } from './constants';
import BoardHeading from './board-heading';
import ListHeading from './list-heading';
import CardValue from './card-value';
import CardWrapper from './card-wrapper';
import AddTaskButton from './add-task-button';
import BoardHeader from './board-header';
import AddElementContainer from './add-element';
import messages from './messages';
import { newContent, updateList, handleChange, setListID, dragCard, updateBoard, saveBoard, onDragComplete, cancelAddition, onAddNewElement, onNewCard } from './action';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import reducer from './reducer';
import saga from './saga';
import { makeSelectBoardID, makeSelectBoardData, makeSelectShowEditList, makeSelectShowEditCard, makeSelectNewListValue, makeSelectNewCardValue, makeSelectListID, makeSelectDragOverCard } from './selectors';

const key = 'board';

export function BoardPage({
    boardID,
    boardData,
    showEditList,
    showEditCard,
    newListValue,
    newCardValue,
    selectedListID,
    dragOverCard,
    match,
    updateList,
    handleValue,
    newContent,
    setListID,
    dragCard,
    updateBoard,
    saveBoard, 
    onDragComplete,
    cancelAddition,
    onAddNewElement,
    onNewCard
}) {
    useInjectReducer({ key, reducer });
    useInjectSaga({ key, saga });

    useEffect(() => {
        updateList(match.params.id);
    }, []);

    // Drag and Drop Code

    const dragStart = (evt, cardvalue) => {
        evt.dataTransfer.setData('dragged_card', evt.target.id);
    }

    const dropContainer = (evt) => {
        evt.preventDefault();
    }

    const dropEnd = (evt, listID) => {
        evt.preventDefault();
        let sourceId = evt.dataTransfer.getData("dragged_card");
        onDragComplete(listID, sourceId);
    }

    const cardHover = (evt, cardID) => {
        dragCard(cardID, 'HOVER');
    }

    return (
        <ContentWrapper>
            <Helmet>
                <title>Board</title>
                <meta
                    name="description"
                    content="Mock Trello - Board"
                />
            </Helmet>
            {
                boardData &&
                <div>
                    <BoardHeader>
                        <BoardHeading>{boardData.boardName}</BoardHeading>
                        <AddTaskButton buttonText={messages.saveBoard}
                            clicked={saveBoard}>
                        </AddTaskButton>
                    </BoardHeader>
                    <BoardWrapper>
                        {
                            boardData.lists.map((list) => (
                                <List id={`${list.listID}`}
                                    width={listWidth}
                                    backgroundColor={listBackground}
                                    key={list.listID}>
                                    <ListHeading>{list.listName}</ListHeading>
                                    <CardWrapper id={`CRD_WRAP_BRD_DATA_${list.listID}`}
                                        onDragOver={(evt) => dropContainer(event)}
                                        onDrop={(evt, listID) => dropEnd(event, list.listID)}>
                                        {
                                            list.cards.map((card) => (
                                                <Tile id={`${card.cardID}`}
                                                    className="board-list-card"
                                                    backgroundColor={cardBackground}
                                                    key={card.cardID}
                                                    draggable="true"
                                                    onDragStart={(evt, cardvalue) => dragStart(event, card.cardName)}
                                                    onDragOver={(evt, cardID) => cardHover(event, card.cardID)}>
                                                    <CardValue>{card.cardName}</CardValue>
                                                </Tile>
                                            ))
                                        }
                                    </CardWrapper>
                                    {
                                        selectedListID != list.listID &&
                                        <AddTaskButton buttonText={messages.addCard}
                                            clicked={(evt, value, type, listID) => onNewCard(event, true, 'CARD', list.listID)}>
                                        </AddTaskButton>
                                    }
                                    {
                                        showEditCard &&
                                        (selectedListID == list.listID) &&
                                        <AddElementContainer bindingValue={newCardValue}
                                            changeValue={(evt, type) => handleValue(event, 'CARD')}
                                            buttonMessage={messages.createContent}
                                            cancelMessage={messages.createContentCancel}
                                            createClick={(elementType) => onAddNewElement('CARD')}
                                            cancelClick={(evt, value) => cancelAddition(event, false, 'CARD')}>
                                        </AddElementContainer>
                                    }
                                </List>
                            ))
                        }
                        {
                            !showEditList &&
                            <AddTaskButton buttonText={messages.addList}
                                clicked={(evt, value, type) => newContent(event, true, 'LIST')}>
                            </AddTaskButton>
                        }
                        {
                            showEditList &&
                            <AddElementContainer bindingValue={newListValue}
                                changeValue={(evt, type) => handleValue(event, 'LIST')}
                                buttonMessage={messages.createContent}
                                cancelMessage={messages.createContentCancel}
                                createClick={(elementType) => onAddNewElement('LIST')}
                                cancelClick={(evt, value) => cancelAddition(event, false, 'LIST')}>
                            </AddElementContainer>
                        }
                    </BoardWrapper>
                </div>
            }
        </ContentWrapper>
    )
}

const mapStateToProps = createStructuredSelector({
    boardID: makeSelectBoardID(),
    boardData: makeSelectBoardData(),
    showEditList: makeSelectShowEditList(),
    showEditCard: makeSelectShowEditCard(),
    newListValue: makeSelectNewListValue(),
    newCardValue: makeSelectNewCardValue(),
    selectedListID: makeSelectListID(),
    dragOverCard: makeSelectDragOverCard(),
});

const mapDispatchToProps = (dispatch) => ({
    updateList: (data) => dispatch(updateList(data)),
    handleValue: (evt, type) => dispatch(handleChange(evt.target.value, type)),
    newContent: (evt, value, type) => dispatch(newContent(value, type)),
    setListID: (data) => dispatch(setListID(data)),
    dragCard: (data, type) => dispatch(dragCard(data, type)),
    updateBoard: (data) => dispatch(updateBoard(data)),
    saveBoard: () => dispatch(saveBoard()),
    onDragComplete: (listID, sourceId) => dispatch(onDragComplete(listID, sourceId)),
    cancelAddition: (evt, value, type) => dispatch(cancelAddition(value, type)),
    onAddNewElement: (type) => dispatch(onAddNewElement(type)),
    onNewCard: (evt, value, type, listID) => dispatch(onNewCard(value, type, listID))
});

const withConnect = connect(
    mapStateToProps,
    mapDispatchToProps,
);

export default compose(
    withConnect,
    memo,
)(BoardPage);