import Overview from '@/views/dashboard/Overview.vue';
import Monitoring from '@/views/dashboard/Monitoring.vue';
import ShippingFee from '@/views/dashboard/delivery/ShippingFee.vue';
import CreditBalance from '@/views/dashboard/Wallet.vue';
import CreateAWB from '@/views/dashboard/delivery/CreateAWB.vue';
import DeliveryOverview from '@/views/dashboard/delivery/DeliveryOverview.vue';
import BulkCreateAWB from '@/views/dashboard/delivery/BulkCreateAWB.vue';
import Contact from '@/views/dashboard/Contact.vue';

export default [
  {
    path: 'overview',
    name: 'dashboard-overview',
    component: Overview,
    meta: {
      title: 'Overview',
    },
  },
  {
    path: 'monitoring',
    name: 'dashboard-monitoring',
    component: Monitoring,
    meta: {
      title: 'Monitoring',
    },
  },
  {
    path: 'shipping/ongkos-kirim',
    name: 'dashboard-shipping-fee',
    component: ShippingFee,
    meta: {
      title: 'Cek Ongkir',
    },
  },
  {
    path: 'shipping/resi-satuan',
    name: 'dashboard-airway-bill',
    component: CreateAWB,
    meta: {
      title: 'Resi Satuan',
    },
  },
  {
    path: 'shipping/resi-massal',
    name: 'dashboard-bulk-airway-bill',
    component: BulkCreateAWB,
    meta: {
      title: 'Resi Massal',
    },
  },
  {
    path: 'wallet',
    name: 'dashboard-wallet',
    component: CreditBalance,
    meta: {
      title: 'Saldo',
    },
  },
  {
    path: 'shipping/riwayat-pengiriman',
    name: 'dashboard-delivery',
    component: DeliveryOverview,
    meta: {
      title: 'Riwayat Pengiriman',
    },
  },
  {
    path: 'contact',
    name: 'dashboard-contact',
    component: Contact,
    meta: {
      title: 'Daftar Kontak',
    },
  },
];
