const globalFilter = {
  install(Vue) {
    const formatCurrency = (str) => `Rp.${Number(str || 0).toLocaleString('id-ID')}`;

    Vue.filter('formatCurrency', formatCurrency);
  },
};

export default globalFilter;
