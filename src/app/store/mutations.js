import {APP_ERROR} from '../constants/common';
export default {
  [APP_ERROR](state, {status, statusText} = {}) {
    console.warn(status, statusText);
  }
} 