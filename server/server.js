import { forEach } from 'lodash/fp';

import * as controllers from './controllers';

const runInit = controller => {
  controller.init();
};

forEach(runInit, controllers);
