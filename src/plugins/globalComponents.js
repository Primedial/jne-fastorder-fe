import InputNumber from '@/components/common/InputNumber.vue';

const components = {
  FoInputNumber: InputNumber,
};

export default {
  install(Vue) {
    Object.entries(components).forEach(([key, value]) => {
      Vue.component(key, value);
    });
  },
};
