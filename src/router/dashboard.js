import Overview from '@/views/dashboard/Overview.vue';
import Monitoring from '@/views/dashboard/Monitoring.vue';
import ShippingFee from '@/views/dashboard/delivery/ShippingFee.vue';
import CreditBalance from '@/views/dashboard/CreditBalance.vue';
import CreateAWB from '@/views/dashboard/delivery/CreateAWB.vue';
import DeliveryOverview from '@/views/dashboard/delivery/DeliveryOverview.vue';

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
    path: 'shipping/ongkos-kirim',
    name: 'dashboard-shipping-fee',
    component: ShippingFee,
  },
  {
    path: 'shipping/resi-satuan',
    name: 'dashboard-airway-bill',
    component: CreateAWB,
  },
  {
    path: 'wallet',
    name: 'dashboard-wallet',
    component: CreditBalance,
  },
  {
    path: 'shipping/riwayat-pengiriman',
    name: 'dashboard-delivery',
    component: DeliveryOverview,
  },
];
