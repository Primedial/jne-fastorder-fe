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
            ref="shipments"
            type="area"
            height="350"
            :options="chartOptions"
            :series="monthlySeries"
          ></apex-charts>
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" class="mb-2">
        <el-card>
          <h3 class="my-0 text-gray">Tipe Pengiriman</h3>
          <apex-charts
            ref="shipmentTypeChart"
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
      series: [],
      monthlySeries: [],
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
          type: 'category',
          categories: ['Jun', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        },
        tooltip: {
          x: {
            format: 'number',
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
    this.fetchDeliveryOverview();
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
    async fetchDeliveryOverview() {
      try {
        const res = await awb.getDeliveryOverview();
        console.log(res.data);
        const months = [...Array(12)].map(() => 0);
        const isCod = res.data.categorized_shipment.filter((item) => item.is_cod);
        const isNonCod = res.data.categorized_shipment.filter((item) => !item.is_cod);
        const codData = months.map((val, i) => {
          const found = isCod.find((v) => v.month_num === i + 1);
          return found?.total || val;
        });
        const nonCodData = months.map((val, i) => {
          const found = isNonCod.find((v) => v.month_num === i + 1);
          return found?.total || val;
        });
        this.$refs.shipmentTypeChart.updateSeries([
          {
            name: 'COD',
            data: codData,
          },
          {
            name: 'Non-COD',
            data: nonCodData,
          },
        ]);
        this.$refs.shipments.updateSeries([
          {
            name: 'Jumlah Pengiriman',
            data: months.map((val, i) => {
              const found = res.data.monthly_shipments.find((v) => v.month_num === i + 1);
              return found?.total || val;
            }),
          },
        ]);
        console.log({ codData, nonCodData });
      } catch (e) {
        //
      }
    },
  },
};
</script>
