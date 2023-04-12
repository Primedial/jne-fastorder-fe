<template>
  <div>
    <div class="my-1 flex items-center justify-between">
      <h1>User</h1>
      <el-button type="primary" icon="el-icon-plus" @click="newUser">Tambah</el-button>
    </div>
    <el-card>
      <el-table :data="tableData">
        <el-table-column prop="name" label="Nama" width="250"></el-table-column>
        <el-table-column prop="email" label="Email" width="220">
          <template slot-scope="scope">
            <el-button type="text">{{ scope.row.email }}</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="phone_no" label="No. Telepon" width="180"></el-table-column>
        <el-table-column prop="address" label="Alamat" width="250"></el-table-column>
        <el-table-column prop="user_type.name" label="Tipe User" width="200"></el-table-column>
        <el-table-column prop="admin_user.name" label="Created By" width="200"></el-table-column>
        <el-table-column fixed="right">
          <template slot-scope="scope">
            <el-button type="text" @click="edit(scope.row)">Edit</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-dialog :visible.sync="dialogVisible" title="Tambah/Edit User" width="400px">
      <el-form ref="form" :model="model" label-position="top">
        <el-form-item prop="name" label="Nama">
          <el-input v-model="model.name" clearable></el-input>
        </el-form-item>
        <el-form-item prop="email" label="Email">
          <el-input v-model="model.email" clearable></el-input>
        </el-form-item>
        <el-form-item prop="phone_no" label="No. Telepon">
          <el-input v-model="model.phone_no" clearable></el-input>
        </el-form-item>
        <el-form-item prop="address" label="Address">
          <el-input v-model="model.address" type="textarea" :rows="3" clearable></el-input>
        </el-form-item>
        <el-form-item prop="user_type_id" label="Tipe User">
          <el-select v-model="model.user_type_id" class="w-full">
            <el-option v-for="userType in userTypes" :key="userType.id" :label="userType.name" :value="userType.id"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <el-button type="primary" class="w-full" :loading="loading" @click="submit">Submit</el-button>
    </el-dialog>
  </div>
</template>

<script>
import user from '@/api/admin/user';
import userType from '@/api/admin/userType';

export default {
  data() {
    return {
      loading: false,
      tableData: [],
      total: 0,
      currentPage: 1,
      search: '',
      dialogVisible: false,
      userTypes: [],
      model: {
        name: '',
      },
    };
  },
  created() {
    this.fetchData();
    this.fetchUserTypes();
  },
  methods: {
    async fetchUserTypes() {
      const res = await userType.getAll();
      this.userTypes = res.data.data;
    },
    async fetchData() {
      try {
        const params = {
          page: this.currentPage,
          q: this.q,
        };
        const res = await user.getAll(params);
        this.tableData = res.data.data;
        this.total = res.data.total;
      } catch (e) {
        //
      }
    },
    edit(row) {
      this.model = { ...row };
      this.model.user_type_id = row.user_type.id;
      this.dialogVisible = true;
    },
    submit() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          this.loading = true;
          const payload = {
            ...this.model,
            user_type_id: this.model.user_type_id,
            gender: 1,
          };
          await user.register(payload);
          this.dialogVisible = false;
          this.fetchData();
          this.loading = false;
        }
      });
    },
    newUser() {
      this.dialogVisible = true;
      this.model = {
        name: '',
        user_type_id: null,
      };
    },
  },
};
</script>
