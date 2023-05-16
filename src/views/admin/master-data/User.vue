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
        <el-table-column prop="is_active" label="Status" width="200">
          <template slot-scope="scope">
            <el-tag :type="scope.row.is_active ? 'success' : 'danger'" class="w-full">
              <p class="text-center my-0"><strong class="text-center">{{ scope.row.is_active ? 'ACTIVE' : 'INACTIVE' }}</strong></p>
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="is_verified" label="Verified" width="200">
          <template slot-scope="scope">
            <el-tag :type="scope.row.is_verified ? 'success' : 'warning'" class="w-full">
              <p class="text-center my-0"><strong class="text-center">{{ scope.row.is_verified ? 'YES' : 'NO' }}</strong></p>
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="admin_user.name" label="Created By" width="200"></el-table-column>
        <el-table-column fixed="right">
          <template slot-scope="scope">
            <el-button type="text" @click="edit(scope.row)">Edit</el-button>
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
        <small>Total: <strong>{{ total }}</strong></small>
      </div>
    </el-card>
  </div>
</template>

<script>
import user from '@/api/admin/user';

export default {
  data() {
    return {
      loading: false,
      tableData: [],
      total: 0,
      currentPage: 1,
      search: '',
      dialogVisible: false,
      model: {
        name: '',
      },
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
      this.$router.push({ name: 'admin-user-detail', params: { id: row.id } });
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
      this.$router.push({ name: 'admin-user-new' });
    },
    handlePageChange(page) {
      this.$router.push({ name: 'admin-user', query: { ...this.$route.query, page } });
      this.currentPage = Number(page);
    },
  },
};
</script>
