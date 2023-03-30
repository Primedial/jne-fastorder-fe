export default [
  {
    path: 'overview',
    title: 'Dashboard',
    icon: 'activity-outline',
  },
  {
    path: 'monitoring',
    title: 'Monitoring',
    icon: 'monitor-outline',
  },
  {
    path: 'shipping',
    title: 'Pengiriman',
    icon: 'swap-outline',
    children: [
      {
        path: 'shipping-fee',
        title: 'Cek Ongkir',
      },
      {
        path: 'resi-satuan',
        title: 'Resi Satuan',
      },
    ],
  },
  {
    path: 'credit-balance',
    title: 'Saldo',
    icon: 'credit-card-outline',
  },
];
