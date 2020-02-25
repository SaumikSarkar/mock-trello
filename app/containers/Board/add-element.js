// App Headers

// This component is for the header for the application

import React from 'react';

import AddContentWrapper from './add-content-wrapper';
import AddTaskButton from './add-task-button';

export default function AddElementContainer({
    bindingValue,
    changeValue,
    buttonMessage,
    cancelMessage,
    createClick,
    cancelClick
}) {
    return (
        <AddContentWrapper>
            <textarea rows="3" cols="35"
                value={bindingValue}
                onChange={changeValue}>
            </textarea>
            <div>
                <AddTaskButton buttonText={buttonMessage}
                    clicked={createClick}>
                </AddTaskButton>
                <AddTaskButton buttonText={cancelMessage}
                    clicked={cancelClick}>
                </AddTaskButton>
            </div>
        </AddContentWrapper>
    );
}