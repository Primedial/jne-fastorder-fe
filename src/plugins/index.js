import axios from './axios';
import elementUI from './elementUI';
import evaIcons from './evaIcons';
import globalFilter from './globalFilter';
import '@/assets/styles/main.scss';
import globalComponents from './globalComponents';

const plugins = {
  install(Vue) {
    Vue.use(axios);
    Vue.use(elementUI);
    Vue.use(evaIcons);
    Vue.use(globalFilter);
    Vue.use(globalComponents);
  },
};

export default plugins;
