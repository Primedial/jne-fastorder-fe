import Overview from '@/views/dashboard/Overview.vue';
import Monitoring from '@/views/dashboard/Monitoring.vue';
import ShippingFee from '@/views/dashboard/delivery/ShippingFee.vue';
import CreditBalance from '@/views/dashboard/CreditBalance.vue';
import CreateAWB from '@/views/dashboard/delivery/CreateAWB.vue';

export default [
  {
    path: 'overview',
    name: 'dashboard-overview',
    component: Overview,
  },
  {
    path: 'monitoring',
    name: 'dashboard-monitoring',
    component: Monitoring,
  },
  {
    path: 'shipping/shipping-fee',
    name: 'dashboard-shipping-fee',
    component: ShippingFee,
  },
  {
    path: 'shipping/resi-satuan',
    name: 'dashboard-airway-bill',
    component: CreateAWB,
  },
  {
    path: 'credit-balance',
    name: 'dashboard-shipping-fee',
    component: CreditBalance,
  },
];
