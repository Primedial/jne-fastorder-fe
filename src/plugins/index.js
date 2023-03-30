import axios from './axios';
import elementUI from './elementUI';
import evaIcons from './evaIcons';
import '@/assets/styles/main.scss';

const plugins = {
  install(Vue) {
    Vue.use(axios);
    Vue.use(elementUI);
    Vue.use(evaIcons);
  },
};

export default plugins;
