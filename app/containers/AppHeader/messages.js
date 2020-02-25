/*
 * App Header Messages
 *
 * This contains all the text for the AppHeader container.
 */
import { defineMessages } from 'react-intl';

export const scope = 'app.containers.AppHeader';

export default defineMessages({
  headerTitle: {
    id: `${scope}.headerTitle`,
    defaultMessage: 'Mock Trello',
  },
  createBoard: {
    id: `${scope}.createBoard`,
    defaultMessage: 'Create Board',
  },
  homeButtonText: {
    id: `${scope}.homeButtonText`,
    defaultMessage: 'Home',
  }
});
