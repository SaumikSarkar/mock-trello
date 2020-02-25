/*
 * Board View Messages
 *
 * This contains all the text for the Board View container.
 */
import { defineMessages } from 'react-intl';

export const scope = 'app.containers.Board';

export default defineMessages({
  addList: {
    id: `${scope}.addList`,
    defaultMessage: 'Add new List'
  },
  addCard: {
    id: `${scope}.addCard`,
    defaultMessage: 'Add new Card'
  },
  createContent: {
    id: `${scope}.createContent`,
    defaultMessage: 'Create'
  },
  createContentCancel: {
    id: `${scope}.createContentCancel`,
    defaultMessage: 'Cancel'
  },
  saveBoard: {
    id: `${scope}.saveBoard`,
    defaultMessage: 'Save'
  }
});
