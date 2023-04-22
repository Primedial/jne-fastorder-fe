<template>
  <div>
    <h1>Riwayat Pengiriman</h1>
    <el-card>
      <el-table :data="tableData">
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
    <el-dialog :visible.sync="dialogVisible" :title="`No. Resi: ${trackingDetail?.cnote?.cnote_no}`">
      <small class="block text-gray">Status</small>
      <p><strong>{{ trackingDetail?.cnote?.pod_status }}</strong></p>
      <el-row :gutter="16">
        <el-col :span="12">
          <small class="block text-gray">Tanggal Pengiriman</small>
          <p><strong>{{ trackingDetail?.cnote?.cnote_pod_date }}</strong></p>
        </el-col>
        <el-col :span="12">
          <small class="block text-gray">Service Code</small>
          <p><strong>{{ trackingDetail?.cnote?.servicetype }}</strong></p>
        </el-col>
      </el-row>
      <el-divider></el-divider>
      <el-timeline :reverse="false">
        <el-timeline-item
          v-for="(activity, index) in trackingDetail?.history"
          :key="index"
          :timestamp="activity.date">
          {{ activity.desc }}
        </el-timeline-item>
      </el-timeline>
    </el-dialog>
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
      dialogVisible: false,
      trackingDetail: null,
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
    async viewDeliveryStatus(row) {
      try {
        const res = await awb.getTrackingStatus(row.cnote_no);
        this.trackingDetail = {
          ...res.data,
          cnote: {
            ...res.data.cnote,
            cnote_no: row.cnote_no,
          },
        };
        this.dialogVisible = true;
        console.log(this.trackingDetail);
      } catch (e) {
        //
      }
    },
    async handlePageChange(page) {
      await this.$router.push({ name: 'dashboard-delivery', query: { page } });
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
      this.currentPage = page;
    },
  },
};
</script>
