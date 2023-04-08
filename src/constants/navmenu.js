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
        path: 'ongkos-kirim',
        title: 'Cek Ongkir',
      },
      {
        path: 'resi-satuan',
        title: 'Resi Satuan',
      },
      {
        path: 'resi-massal',
        title: 'Resi Massal',
      },
      {
        path: 'riwayat-pengiriman',
        title: 'Riwayat Pengiriman',
      },
    ],
  },
  {
    path: 'wallet',
    title: 'Saldo',
    icon: 'credit-card-outline',
  },
];
