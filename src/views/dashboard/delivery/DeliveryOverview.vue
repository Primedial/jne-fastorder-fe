<template>
  <div>
    <h1>Riwayat Pengiriman</h1>
    <el-card>
      <el-table :data="tableData">
        <el-table-column type="index" width="50" fixed="left"></el-table-column>
        <el-table-column prop="cnote_no" label="Nomor Resi" width="180" fixed="left">
          <template slot-scope="scope">
            <el-tag type="info">#{{ scope.row.cnote_no }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="service_name" label="Jenis Layanan" width="120"></el-table-column>
        <el-table-column label="Harga" width="250">
          <template slot-scope="scope">
            {{ scope.row.price | formatCurrency }}
          </template>
        </el-table-column>
        <el-table-column prop="shipper.name" label="Pengirim" width="250"></el-table-column>
        <el-table-column prop="shipper.city_name" label="Kota Pengirim" width="250"></el-table-column>
        <el-table-column prop="receiver.name" label="Penerima" width="250"></el-table-column>
        <el-table-column prop="receiver.city_name" label="Kota Penerima" width="250"></el-table-column>
        <el-table-column label="Status" width="150">
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
        <small>Total: <strong>{{ total }}</strong></small>
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
      currentPage: 1,
      total: 0,
      search: '',
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
          page: this.currentPage,
          q: this.search,
        };
        const res = await awb.getDeliveryHistory(params);
        this.total = res.data.total;
        this.tableData = res.data.data;
      } catch (e) {
        console.log(e);
      }
    },
    viewDeliveryStatus(row) {
      console.log({ row });
    },
    handlePageChange(page) {
      this.$router.push({ name: 'dashboard-delivery', query: { page } });
      this.currentPage = page;
    },
  },
};
</script>
