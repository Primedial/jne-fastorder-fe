<template>
  <div>
    <div class="my-1 flex items-center justify-between">
      <h1>Bank</h1>
      <el-button type="primary" icon="el-icon-plus" @click="newBank">Tambah</el-button>
    </div>
    <el-card>
      <el-table :data="tableData">
        <el-table-column prop="logo" width="80">
          <template slot-scope="scope">
            <el-avatar :src="scope.row.logo"></el-avatar>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="Nama"></el-table-column>
        <el-table-column prop="bank_code_prefix" label="Kode Bank" width="150"></el-table-column>
        <el-table-column fixed="right" width="180">
          <template slot-scope="scope">
            <el-button type="text" @click="edit(scope.row)">Edit</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-dialog :visible.sync="dialogVisible" :title="dialogTitle" width="400px">
      <el-form ref="form" :model="model" label-position="top" :rules="rules">
        <el-form-item label="Nama Bank" prop="name">
          <el-input v-model="model.name" clearable></el-input>
        </el-form-item>
        <el-form-item label="Kode Bank" prop="bank_code_prefix">
          <el-input v-model.number="model.bank_code_prefix" clearable></el-input>
        </el-form-item>
      </el-form>
      <el-button type="primary" class="w-full" :loading="loading" @click="submit">Submit</el-button>
    </el-dialog>
  </div>
</template>

<script>
import bankApi from '@/api/admin/bank';

export default {
  data() {
    return {
      loading: false,
      tableData: [],
      dialogVisible: false,
      total: 0,
      model: {
        name: '',
        bank_code_prefix: null,
        logo: null,
      },
      rules: {
        name: [
          { required: true, trigger: 'blur', message: 'Nama Bank wajib diisi' },
        ],
        bank_code_prefix: [
          { required: true, trigger: 'blur', message: 'Kode Bank wajib diisi' },
        ],
      },
    };
  },
  computed: {
    dialogTitle() {
      return `${this.model.id ? 'Edit' : 'Tambah'} Bank`;
    },
  },
  created() {
    this.fetchBanks();
  },
  methods: {
    async fetchBanks() {
      this.loading = true;
      try {
        const res = await bankApi.getAll();
        this.total = res.data.total;
        this.tableData = res.data.data;
      } catch (e) {
        //
      }
      this.loading = false;
    },
    newBank() {
      this.model = {
        name: '',
        bank_code_prefix: null,
        logo: null,
      };
      this.dialogVisible = true;
    },
    edit(row) {
      this.model = { ...row };
      this.dialogVisible = true;
    },
    submit() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          await bankApi.create(this.model);
          this.dialogVisible = false;
          this.model = {
            name: '',
            bank_code_prefix: null,
            logo: null,
          };
          this.fetchBanks();
          this.$notify.success({
            title: 'Sukses',
            message: 'Bank berhasil ditambahkan',
          });
        }
      });
    },
  },
};
</script>
