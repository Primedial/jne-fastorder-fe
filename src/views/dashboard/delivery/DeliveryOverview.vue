<template>
  <div class="pt-2">
    <h1>Riwayat Pengiriman</h1>
    <el-card class="mb-2">
      <el-form :model="searchModel" label-position="top">
        <el-row :gutter="16">
          <el-col :span="14">
            <el-form-item label="Search">
              <el-input v-model="searchModel.filterValue" clearable>
                <el-select v-model="searchModel.filterBy" slot="prepend" placeholder="Select" style="width: 150px;">
                  <el-option
                    v-for="option in searchOptions"
                    :key="option.value"
                    :label="option.label"
                    :value="option.value"
                  ></el-option>
                </el-select>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="Tanggal">
              <el-date-picker
                v-model="searchModel.dateRange"
                type="daterange"
                range-separator="-"
                start-placeholder="Tanggal"
                end-placeholder="Tanggal"
                style="width: 100%;"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="Status Pengiriman">
              <el-select v-model="searchModel.status" multiple placeholder="Select" collapse-tags>
                <el-option label="Processing" value="100"></el-option>
                <el-option label="Returned" value="102"></el-option>
                <el-option label="Delivered" value="101"></el-option>
                <el-option label="Canceled" value="103"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div class="flex justify-end">
        <el-button type="primary" :loading="loading" icon="el-icon-search" @click="searchData">Cari</el-button>
      </div>
    </el-card>
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
            {{ scope.row.shipper?.name }}
          </template>
        </el-table-column>
        <el-table-column label="Kota Pengirim" width="250">
          <template slot-scope="scope">
            {{ scope.row.shipper?.city_name }}
          </template>
        </el-table-column>
        <el-table-column label="Penerima" width="250">
          <template slot-scope="scope">
            {{ scope.row.receiver?.name }}
          </template>
        </el-table-column>
        <el-table-column label="Kota Penerima" width="250">
          <template slot-scope="scope">
            {{ scope.row.receiver?.city_name }}
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
          :page-size="15"
          :current-page.sync="currentPage"
          @current-change="handlePageChange"
        >
        </el-pagination>
        <small>Total: <strong>{{ total | formatNumber }}</strong></small>
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
import dayjs from 'dayjs';

export default {
  data() {
    return {
      searchOptions: [
        {
          label: 'Nama Pengirim',
          value: 'shipper_name',
        },
        {
          label: 'Kota Pengirim',
          value: 'shipper_city',
        },
        {
          label: 'Nama Penerima',
          value: 'receiver_name',
        },
        {
          label: 'Kota Penerima',
          value: 'receiver_city',
        },
        {
          label: 'No. Resi',
          value: 'cnote_no',
        },
      ],
      searchModel: {
        filterBy: null,
        filterValue: '',
        dateRange: [],
        status: [],
      },
      tableData: [],
      currentPage: 1,
      total: 0,
      search: '',
      dialogVisible: false,
      trackingDetail: null,
      loading: false,
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
      this.loading = true;
      try {
        const params = {
          page: this.currentPage,
          search_by: this.searchModel.filterBy,
          q: this.searchModel.filterValue,
          status: this.searchModel.status.join(','),
          range: this.searchModel.dateRange.map((i) => dayjs(i).format('YYYY-MM-DD')).join(','),
        };
        const res = await awb.getDeliveryHistory(params);
        this.total = res.data.total;
        this.tableData = res.data.data;
      } catch (e) {
        console.log(e);
      }
      this.loading = false;
    },
    searchData() {
      this.fetchData();
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
