/*
 * HomePage Messages
 *
 * This contains all the text for the HomePage container.
 */
import { defineMessages } from 'react-intl';

export const scope = 'app.containers.HomePage';

export default defineMessages({
  createContent: {
    id: `${scope}.createContent`,
    defaultMessage: 'Create'
  },
  createContentCancel: {
    id: `${scope}.createContentCancel`,
    defaultMessage: 'Cancel'
  },
});
