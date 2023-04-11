<template>
  <div>
    <h1>Overview</h1>
    <el-row :gutter="20">
      <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8" class="mb-2">
        <el-card class="bg-primary">
          <p class="text-light mt-0">Total Saldo</p>
          <h2 class="text-light black text-right">{{ user.wallet.amount | formatCurrency }}</h2>
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8" class="mb-2">
        <el-card>
          <p class="text-gray mt-0">Saldo COD</p>
          <h2 class="black text-right">Rp.100,000,000</h2>
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8" class="mb-2">
        <el-card>
          <p class="text-gray mt-0">Cashback Fee</p>
          <h2 class="black text-right">Rp.100,000,000</h2>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8" class="mb-2">
        <el-card>
          <p class="text-gray mt-0">Estimasi Saldo COD</p>
          <h2 class="black text-right">Rp.100,000,000</h2>
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8" class="mb-2">
        <el-card>
          <p class="text-gray mt-0">Estimasi Cashback</p>
          <h2 class="black text-right">Rp.100,000,000</h2>
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8" class="mb-2">
        <el-card>
          <p class="text-gray mt-0">Total Pengiriman</p>
          <h2 class="black text-right">{{ overviews.totalDelivery }}</h2>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" class="mb-2">
        <el-card>
          <h3 class="my-0 text-gray">Jumlah Pengiriman</h3>
          <apex-charts
            type="area"
            height="350"
            :options="chartOptions"
            :series="series"
          ></apex-charts>
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" class="mb-2">
        <el-card>
          <h3 class="my-0 text-gray">Tipe Pengiriman</h3>
          <apex-charts
            type="area"
            height="350"
            :options="chartOptions"
            :series="series"
          ></apex-charts>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import awb from '@/api/awb';
import ApexCharts from 'vue-apexcharts';

export default {
  components: {
    ApexCharts,
  },
  data() {
    return {
      series: [
        {
          name: 'series1',
          data: [31, 40, 28, 51, 42, 109, 100],
        },
        {
          name: 'series2',
          data: [11, 32, 45, 32, 34, 52, 41],
        },
      ],
      chartOptions: {
        chart: {
          height: 350,
          type: 'area',
          toolbar: {
            show: false,
          },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          curve: 'smooth',
        },
        xaxis: {
          type: 'datetime',
          categories: [
            '2018-09-19T00:00:00.000Z',
            '2018-09-19T01:30:00.000Z',
            '2018-09-19T02:30:00.000Z',
            '2018-09-19T03:30:00.000Z',
            '2018-09-19T04:30:00.000Z',
            '2018-09-19T05:30:00.000Z',
            '2018-09-19T06:30:00.000Z',
          ],
        },
        tooltip: {
          x: {
            format: 'dd/MM/yy HH:mm',
          },
        },
      },
      overviews: {
        totalDelivery: 0,
      },
    };
  },
  computed: {
    user() {
      return this.$store.getters['auth/user'];
    },
  },
  mounted() {
    this.fetchDeliveries();
  },
  methods: {
    async fetchDeliveries() {
      try {
        const res = await awb.getDeliveryHistory();
        this.overviews.totalDelivery = res.data.total;
      } catch (e) {
        // console.log(e);
      }
    },
  },
};
</script>
