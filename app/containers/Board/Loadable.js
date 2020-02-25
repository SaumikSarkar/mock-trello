/**
 * Asynchronously loads the component for Board Page
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
