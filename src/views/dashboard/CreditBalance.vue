<template>
  <div>
    <h1>Saldo</h1>
    <el-row :gutter="20">
      <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8" class="mb-2">
        <el-card class="bg-primary">
          <p class="text-light">Total Saldo</p>
          <h1 class="text-light text-right">{{ user?.wallet?.amount | formatCurrency }}</h1>
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8" class="mb-2">
        <el-card>
          <p class="text-gray">Proses Penarikan</p>
          <h1 class="text-right">Rp.1,000,000</h1>
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8" class="mb-2">
        <div class="w-full">
          <el-button type="primary" icon="el-icon-plus" class="w-full mb-2-i" @click="topup">
            Tambah Saldo
          </el-button>
        </div>
        <div class="w-full">
          <el-button type="primary" icon="el-icon-download" class="w-full ml-0">
            Tarik Saldo
          </el-button>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :xs="12" :sm="12" :md="12" :lg="6" :xl="6" class="mb-2">
        <el-card>
          <p class="text-gray">Saldo COD</p>
          <h3>Rp.1,000,000</h3>
        </el-card>
      </el-col>
      <el-col :xs="12" :sm="12" :md="12" :lg="6" :xl="6" class="mb-2">
        <el-card>
          <p class="text-gray">Cashback</p>
          <h3>Rp.1,000,000</h3>
        </el-card>
      </el-col>
      <el-col :xs="12" :sm="12" :md="12" :lg="6" :xl="6" class="mb-2">
        <el-card class="bg-gray">
          <p class="text-light">Estimasi COD</p>
          <h3 class="text-light">Rp.1,000,000</h3>
        </el-card>
      </el-col>
      <el-col :xs="12" :sm="12" :md="12" :lg="6" :xl="6" class="mb-2">
        <el-card class="bg-gray">
          <p class="text-light">Estimasi Cashback</p>
          <h3 class="text-light">Rp.1,000,000</h3>
        </el-card>
      </el-col>
    </el-row>
    <el-card>
      <h3>Riwayat Saldo</h3>
      <el-divider></el-divider>
      <el-table
        :data="tableData"
        :default-sort="defaultSort"
        style="width:100%"
        :sort-desc.sync="sortDesc"
        :sort-orders="sortOrders"
        :sort-by.sync="sortBy"
        @sort-change="onChangeSort"
      >
        <el-table-column
          label="Tipe"
          width="180">
          <template slot-scope="scope">
            <el-tag :type="tagType(scope.row)" class="w-full text-center">
              <strong>{{ transactionTypePrefix[scope.row.transaction_type] }}</strong>
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="reference_no"
          label="No Referensi"
          width="220">
        </el-table-column>
        <el-table-column
          prop="original_amount"
          label="Saldo Awal"
          width="200"
          sortable="custom"
        >
          <template slot-scope="scope">
            <p class="text-right my-0">
              <strong>{{ scope.row.original_amount | formatCurrency }}</strong>
            </p>
          </template>
        </el-table-column>
        <el-table-column
          prop="amount"
          label="Saldo Kiriman"
          width="200"
          sortable="custom"
        >
          <template slot-scope="scope">
            <p class="text-right my-0" :class="`text-${tagType(scope.row)}`">
              <strong>{{ scope.row.amount | formatCurrency }}</strong>
            </p>
          </template>
        </el-table-column>
        <el-table-column
          prop="created_at"
          label="Tanggal"
          width="220"
          sortable="custom"
        >
          <template slot-scope="scope">
            {{ scope.row.created_at | formatDate }}
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
    <el-dialog :visible.sync="dialogTopupVisible" title="Topup Saldo" width="30%">
      <el-form ref="topup" :model="model">
        <el-form-item prop="amount" label="Nominal">
          <fo-input-number v-model="model.amount"></fo-input-number>
        </el-form-item>
      </el-form>
      <el-button type="primary" class="py-2 w-full" :loading="loading" @click="submit">Submit</el-button>
    </el-dialog>
  </div>
</template>

<script>
import wallet from '@/api/wallet';
import { transactionType, transactionTypePrefix } from '@/constants/wallet';

export default {
  data() {
    return {
      transactionTypePrefix,
      loading: false,
      tableData: [],
      total: 0,
      currentPage: 1,
      dialogTopupVisible: false,
      model: {
        amount: null,
      },
      search: '',
      sort: {
        sort_by: ['created_at'],
        sort_val: [2],
      },
      sortBy: 'created_at',
      sortDesc: false,
      sortOrders: ['ascending', 'descending', null],
      defaultSort: {
        prop: 'created_at',
        order: 'descending',
      },
    };
  },
  computed: {
    user() {
      return this.$store.getters['auth/user'];
    },
  },
  created() {
    this.fetchHistoricalData();
  },
  methods: {
    topup() {
      this.dialogTopupVisible = true;
    },
    tagType(row) {
      return [transactionType.TOPUP, transactionType.CASHBACK].includes(row.transaction_type)
        ? 'success' : 'danger';
    },
    async fetchHistoricalData() {
      try {
        const params = {
          page: this.currentPage,
          q: this.search,
          type: this.filterType,
          sort_by: this.sort.sort_by.join(','),
          sort_val: this.sort.sort_val.join(','),
        };
        const res = await wallet.getWalletHistory(params);
        this.total = res.data.total;
        this.tableData = res.data.data;
      } catch (e) {
        //
      }
    },
    handlePageChange(page) {
      this.currentPage = page;
      this.fetchHistoricalData();
    },
    submit() {
      this.$refs.topup.validate(async (valid) => {
        if (valid) {
          this.loading = true;
          try {
            await wallet.topUpWallet(this.model);
            await this.$store.dispatch('auth/introspect');
            this.fetchHistoricalData();
            this.dialogTopupVisible = false;
            this.model.amount = null;
            this.$notify({
              type: 'success',
              title: 'Sukses',
              message: 'Topup saldo berhasil',
            });
          } catch (e) {
            if (e?.response?.data?.error?.amount) {
              this.$notify({
                type: 'error',
                message: e?.response?.data?.error?.amount.join(','),
              });
            }
          }
          this.loading = false;
        }
      });
    },
    onChangeSort(event) {
      const sorts = {
        ascending: 1,
        descending: 2,
      };
      this.sort.sort_by = [];
      this.sort.sort_val = [];
      if (!event.order) {
        const idx = this.sort.sort_by.indexOf(event.prop);
        this.sort.sort_by.splice(idx, 1);
        this.sort.sort_val.splice(idx, 1);
        if (this.sort.sort_by.length === 0) {
          this.sort.sort_by = ['created_at'];
          this.sort.sort_val = [2];
        }
      } else {
        this.sort.sort_by.push(event.prop);
        this.sort.sort_val.push(sorts[event.order]);
      }
      return this.fetchHistoricalData();
    },
  },
};
</script>
