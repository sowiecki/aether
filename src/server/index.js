import { forEach } from 'lodash/fp';

import controllers from './controllers';

const runInit = controller => {
  controller.init();
};

forEach(runInit)(controllers);
