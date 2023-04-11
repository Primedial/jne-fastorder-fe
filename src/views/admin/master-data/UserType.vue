<template>
  <div class="">
    <div class="flex items-center justify-between">
      <h1>Tipe User</h1>
      <el-button type="primary" icon="el-icon-plus" @click="newUserType">Tambah</el-button>
    </div>
    <el-card>
      <el-table :data="tableData">
        <el-table-column
          prop="name"
          label="Nama"
        >
        </el-table-column>
        <el-table-column
          prop="slug"
          label="Slug"
        >
        </el-table-column>
        <el-table-column
          prop="discount_percentage"
          label="Diskon (%)"
        >
        </el-table-column>
        <el-table-column width="180">
          <template slot-scope="scope">
            <el-button type="text" @click="edit(scope.row)">Edit</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-dialog title="Tambah/Edit Tipe User" :visible.sync="dialogVisible" width="350px" @closed="onClose">
      <el-form ref="form" :model="model">
        <el-form-item
          prop="name"
          label="Nama"
          :rules="{ required: true, trigger: 'blur', message: 'Nama wajib diisi' }"
        >
          <el-input v-model="model.name" clearable></el-input>
        </el-form-item>
        <el-form-item
          prop="slug"
          label="Slug"
          :rules="{ required: true, trigger: 'blur', message: 'Slug wajib diisi' }"
        >
          <el-input v-model="model.slug" clearable></el-input>
        </el-form-item>
        <el-form-item
          prop="discount_percentage"
          label="Diskon (%)"
          :rules="{ required: true, trigger: 'blur', message: 'Diskon wajib diisi' }"
        >
          <el-input type="number" v-model.number="model.discount_percentage" clearable></el-input>
        </el-form-item>
        <el-button type="primary" @click="submit" :loading="loading" class="w-full">Submit</el-button>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import userType from '@/api/admin/userType';

export default {
  data() {
    return {
      loading: false,
      tableData: [],
      total: 0,
      dialogVisible: false,
      model: {
        name: '',
        slug: '',
        discount_percentage: 0,
      },
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      try {
        const res = await userType.getAll();
        this.tableData = res.data.data;
        this.total = res.data.total;
      } catch (e) {
        // do nothing yet
      }
    },
    newUserType() {
      this.model = {
        name: '',
        slug: '',
        discount_percentage: 0,
      };
      this.dialogVisible = true;
    },
    edit(row) {
      this.model = { ...row };
      this.dialogVisible = true;
    },
    onClose() {
      this.model = {
        name: '',
        slug: '',
        discount_percentage: 0,
      };
    },
    submit() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          await userType.create(this.model);
          this.fetchData();
          this.dialogVisible = false;
          this.$notify({
            type: 'success',
            title: 'Sukses',
            message: 'Berhasil',
          });
        }
      })
    },
  },
};
</script>
