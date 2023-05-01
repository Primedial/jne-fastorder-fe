import dayjs from 'dayjs';

const globalFilter = {
  install(Vue) {
    const formatCurrency = (str) => `Rp${Number(str || 0).toLocaleString('id-ID')}`;
    const formatNumber = (str) => Number(str || 0).toLocaleString('id-ID');
    const formatDate = (value, format = 'DD MMMM YYYY HH:mm:ss') => dayjs(value).format(format);

    Vue.filter('formatCurrency', formatCurrency);
    Vue.filter('formatNumber', formatNumber);
    Vue.filter('formatDate', formatDate);
  },
};

export default globalFilter;
