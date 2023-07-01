<template>
  <div class="pt-2">
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
          <el-button type="primary" icon="el-icon-download" class="w-full ml-0" @click="withdraw">
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
      <div class="flex items-center justify-between">
        <h3>Riwayat Transaksi</h3>
        <div class="flex items-center">
          <span class="block mr-2">Status: </span>
          <el-select v-model="status" @change="fetchHistoricalData">
            <el-option label="All" value=""></el-option>
            <el-option label="Outstanding" value="1"></el-option>
            <el-option label="Paid" value="3"></el-option>
            <el-option label="Pending" value="2"></el-option>
            <el-option label="Failed" value="4"></el-option>
            <el-option label="Expired" value="5"></el-option>
            <el-option label="Completed" value="6"></el-option>
          </el-select>
        </div>
      </div>
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
          label="Status"
          width="180">
          <template slot-scope="scope">
            <el-tag :type="transactionStatusColor[scope.row.status]" class="w-full text-center uppercase">
              <strong>{{ transactionStatus[scope.row.status] }}</strong>
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column
          label="Expire"
          width="180">
          <template slot-scope="scope">
            <fo-countdown :data="scope.row.invoice_expiry_date" :status="scope.row.status"></fo-countdown>
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
        <el-table-column width="120" fixed="right">
          <template slot-scope="scope">
            <el-button
              type="text"
              class="w-full"
              :disabled="scope.row.status !== 1"
              @click="onHandlePay(scope.row)"
            >Bayar</el-button>
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
    <el-dialog
      :visible.sync="dialogPaymentResult"
      width="320px"
      :show-close="false"
      @closed="onCloseDialogPayment"
    >
      <el-result
        v-if="$route.hash === '#success'"
        icon="success"
        title="Pembayaran Berhasil"
      >
        <template slot="extra">
          <el-button type="primary" size="medium" @click="dialogPaymentResult = false">Tutup</el-button>
        </template>
      </el-result>
      <el-result
        v-else
        icon="error"
        title="Terjadi kesalahan pada sistem"
        subTitle="Silahkan coba beberapa saat lagi"
      >
        <template slot="extra">
          <el-button type="primary" size="medium" @click="dialogPaymentResult = false">Tutup</el-button>
        </template>
      </el-result>
    </el-dialog>

    <el-dialog :visible.sync="dialogTopupVisible" title="Topup Saldo" width="30%" :close-on-click-modal="!loading" :show-close="!loading" :close-on-press-escape="!loading">
      <el-form ref="topup" :model="model" :rules="topupRules">
        <el-form-item prop="amount" label="Nominal">
          <fo-input-number v-model="model.amount"></fo-input-number>
        </el-form-item>
      </el-form>
      <el-button type="primary" class="py-2 w-full" :loading="loading" @click="submit">Submit</el-button>
    </el-dialog>

    <el-dialog
      :visible.sync="dialogWithdrawVisible"
      title="Tarik Saldo"
      width="30%"
      :close-on-click-modal="!loading"
      :show-close="!loading"
      :close-on-press-escape="!loading"
      @closed="onCloseDialog"
    >
      <el-form ref="withdraw" :model="modelWithdraw" :rules="withdrawRules" label-position="top">
        <el-form-item prop="amount" label="Nominal">
          <fo-input-number v-model="modelWithdraw.amount"></fo-input-number>
        </el-form-item>
        <el-form-item prop="bank_account_id" label="Rekening">
          <div
            v-for="account in user.bank_accounts"
            :key="account.account_number"
            class="mb-2">
            <el-radio
              v-model="modelWithdraw.bank_account_id"
              :label="account.id"
              border
              class="w-full m-0-i flex items-center py-1-i h-auto-i"
              style="display: flex !important;"
            >
              <template>
                <span class="block mb-1 bold">{{ account.bank.name }}</span>
                <small class="text-gray block my-1">{{ account.account_number }}</small>
                <small class="text-gray">{{ account.account_name }}</small>
              </template>
            </el-radio>
          </div>
        </el-form-item>
      </el-form>
      <el-button type="primary" class="py-2 w-full" :loading="loading" @click="submitWithdraw">Tarik Saldo</el-button>
    </el-dialog>
  </div>
</template>

<script>
import wallet from '@/api/wallet';
import {
  transactionType,
  transactionTypePrefix,
  transactionStatusColor,
  transactionStatus,
} from '@/constants/wallet';

export default {
  data() {
    const minAmount = (_, value, cb) => {
      const val = Number(value);
      if (val < 10000) {
        cb(new Error('Minimal nominal topup Rp10.000'));
      } else {
        cb();
      }
    };
    const maxAmount = (_, value, cb) => {
      const val = Number(value);
      if (val > Number(this.user.wallet.amount)) {
        cb(new Error('Saldo tidak mencukupi'));
      } else {
        cb();
      }
    };

    return {
      transactionTypePrefix,
      transactionStatus,
      transactionStatusColor,
      loading: false,
      status: '',
      tableData: [],
      total: 0,
      currentPage: 1,
      dialogTopupVisible: false,
      dialogWithdrawVisible: false,
      model: {
        amount: null,
      },
      modelWithdraw: {
        amount: null,
        bank_account_id: null,
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
      dialogPaymentResult: false,
      topupRules: {
        amount: [
          { required: true, message: 'Nominal wajib diisi', trigger: 'blur' },
          { validator: minAmount, trigger: 'blur' },
        ],
      },
      withdrawRules: {
        amount: [
          { required: true, message: 'Nominal wajib diisi', trigger: 'blur' },
          { validator: minAmount, trigger: 'blur' },
          { validator: maxAmount, trigger: 'blur' },
        ],
        bank_account_id: [
          { required: true, message: 'Rekening wajib diisi', trigger: 'blur' },
        ],
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
  mounted() {
    this.dialogPaymentResult = this.$route.hash === '#success' || this.$route.hash === '#failed';
  },
  methods: {
    topup() {
      this.dialogTopupVisible = true;
    },
    withdraw() {
      this.dialogWithdrawVisible = true;
    },
    tagType(row) {
      return [transactionType.TOPUP, transactionType.CASHBACK, transactionType.CANCEL_ORDER].includes(row.transaction_type)
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
          status: this.status,
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
            const res = await wallet.topUpWallet(this.model);
            window.location.href = res.data.invoice_url;
            this.dialogTopupVisible = false;
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
    onCloseDialog() {
      this.modelWithdraw = {
        amount: 0,
        bank_account_id: null,
      };
    },
    submitWithdraw() {
      this.$refs.withdraw.validate(async (valid) => {
        if (valid) {
          this.loading = true;
          try {
            await wallet.withdraw(this.modelWithdraw);
            this.fetchHistoricalData();
            await this.$store.dispatch('auth/introspect');
            this.dialogWithdrawVisible = false;
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
    onCloseDialogPayment() {
      this.model = {
        amount: 0,
      };
    },
    onHandlePay(row) {
      window.location.href = row.invoice_url;
    },
    onTimeout() {
      setTimeout(() => {
        this.fetchHistoricalData();
      }, 2000);
    },
  },
};
</script>
