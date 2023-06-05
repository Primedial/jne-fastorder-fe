import InputNumber from '@/components/common/InputNumber.vue';
import Countdown from '@/components/common/Countdown.vue';

const components = {
  FoInputNumber: InputNumber,
  FoCountdown: Countdown,
};

export default {
  install(Vue) {
    Object.entries(components).forEach(([key, value]) => {
      Vue.component(key, value);
    });
  },
};
