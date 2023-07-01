<template>
  <div class="pt-1">
    <el-card class="bg-primary mt-3 mb-2">
      <h4 class="text-light">Total Kiriman</h4>
      <h1 class="text-right text-light">{{ total | formatNumber }}</h1>
    </el-card>
    <el-card>
      <h2 class="my-0">Monitoring</h2>
      <el-divider></el-divider>
      <el-table
        :data="tableData"
        style="width: 100%">
        <el-table-column prop="cnote_no" label="Nomor Resi" width="180" fixed="left">
          <template slot-scope="scope">
            <el-tag type="info">#{{ scope.row.cnote_no }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="service_name" label="Jenis Layanan" width="120">
          <template slot-scope="scope">
            <el-tag type="info"><strong>{{ scope.row.service_name }}</strong></el-tag>
          </template>
        </el-table-column>
        <el-table-column label="Harga" width="180">
          <template slot-scope="scope">
            <p class="text-right">
              {{ scope.row.price | formatCurrency }}
            </p>
          </template>
        </el-table-column>
        <el-table-column label="Pengirim" width="250">
          <template slot-scope="scope">
            {{ scope.row.shipper?.name || scope.row.static_shipper_name }}
          </template>
        </el-table-column>
        <el-table-column label="Kota Pengirim" width="250">
          <template slot-scope="scope">
            {{ scope.row.shipper?.city_name || scope.row.static_shipper_city_name }}
          </template>
        </el-table-column>
        <el-table-column label="Penerima" width="250">
          <template slot-scope="scope">
            {{ scope.row.receiver?.name || scope.row.static_receiver_name }}
          </template>
        </el-table-column>
        <el-table-column label="Kota Penerima" width="250">
          <template slot-scope="scope">
            {{ scope.row.receiver?.name || scope.row.static_receiver_city_name }}
          </template>
        </el-table-column>
        <el-table-column label="Tanggal Pengiriman" width="250">
          <template slot-scope="scope">
            {{ scope.row.created_at | formatDate('DD MMM YYYY HH:mm') }}
          </template>
        </el-table-column>
        <el-table-column label="Status" width="150" fixed="right">
          <template slot-scope="scope">
            <el-button type="text" icon="el-icon-search" @click="viewDeliveryStatus(scope.row)">Lihat</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="flex justify-between items-center mt-2">
        <el-pagination
          layout="prev, pager, next"
          :total="total"
          :page-size="10"
          :current-page.sync="currentPage"
          @current-change="handlePageChange"
        >
        </el-pagination>
        <small>Total: <strong>{{ total | formatNumber }}</strong></small>
      </div>
    </el-card>
  </div>
</template>

<script>
import awb from '@/api/awb';

export default {
  data() {
    return {
      tableData: [],
      total: 0,
      currentPage: 1,
    };
  },
  created() {
    this.fetchData();
    if (this.$route.query.page) {
      this.currentPage = Number(this.$route.query.page);
    }
  },
  watch: {
    $route() {
      this.fetchData();
    },
  },
  methods: {
    async fetchData() {
      try {
        const params = {
          status: '100',
          page: this.currentPage,
        };
        const res = await awb.getDeliveryHistory(params);
        this.tableData = res.data.data;
        this.total = res.data.total;
      } catch (e) {
        //
      }
    },
    async handlePageChange(page) {
      await this.$router.push({ name: 'dashboard-monitoring', query: { page } });
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
      this.currentPage = page;
    },
  },
};
</script>
