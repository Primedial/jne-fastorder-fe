<template>
  <div>
    <h1>Saldo</h1>
    <el-row :gutter="20">
      <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8" class="mb-2">
        <el-card class="bg-primary">
          <p class="text-light">Total Saldo</p>
          <h1 class="text-light">Rp.1,000,000</h1>
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
          <el-button type="primary" icon="el-icon-plus" class="w-full mb-2">
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
      <el-table :data="tableData" style="width:100%">
        <el-table-column
          prop="date"
          label="Tipe"
          sortable
          width="180">
        </el-table-column>
        <el-table-column
          prop="name"
          label="Deskripsi"
          sortable
          width="180">
        </el-table-column>
        <el-table-column
          prop="address"
          label="Jumlah"
          sortable
        >
        </el-table-column>
        <el-table-column
          prop="address"
          label="Status"
          sortable
        >
        </el-table-column>
        <el-table-column
          prop="address"
          label="Saldo Awal"
          sortable
        >
        </el-table-column>
        <el-table-column
          prop="address"
          label="Saldo Kiriman"
          sortable
        >
        </el-table-column>
        <el-table-column
          prop="address"
          label="Tanggal"
          sortable
        >
        </el-table-column>
      </el-table>
      <div class="flex justify-between items-center mt-2">
        <el-pagination
          layout="prev, pager, next"
          :total="50"
        >
        </el-pagination>
        <small>Total: <strong>50</strong></small>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>
