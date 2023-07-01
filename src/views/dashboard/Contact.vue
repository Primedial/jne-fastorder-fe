<template>
  <div class="pt-2">
    <h1>Kontak</h1>
    <el-card>
      <el-table
        :data="tableData"
        style="width: 100%">
        <el-table-column label="Nama" prop="name" width="250"></el-table-column>
        <el-table-column label="Kota" prop="city_name" width="180"></el-table-column>
        <el-table-column label="Tipe" prop="contact_type" width="180">
          <template slot-scope="scope">
            <el-tag :type="scope.row.contact_type === 1 ? 'info' : 'success'" class="w-full text-center">
              <strong>{{ scope.row.contact_type === 1 ? 'Penerima' : 'Pengirim' }}</strong>
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="No. Telp" prop="phone_no" width="180"></el-table-column>
        <el-table-column label="Alamat" prop="address" width="300"></el-table-column>
        <el-table-column label="Kode POS" prop="postal_code" width="250"></el-table-column>
        <el-table-column width="150" fixed="right">
          <template slot-scope="scope">
            <el-button type="text" @click="viewDetail(scope.row)">Detail</el-button>
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
    <ContactModal
      v-model="visible"
      :model="model"
      :loading="loading"
      @submit="submit"
    />
  </div>
</template>

<script>
import contact from '@/api/contact';
import ContactModal from '@/components/dashboard/contact/ContactModal.vue';

const defaultFormState = () => ({
  contact_type: null,
  name: '',
  phone_no: '',
  city_code: null,
  city_name: '',
  address: '',
  postal_code: '',
  is_allow_edit: false,
});

export default {
  components: {
    ContactModal,
  },
  data() {
    return {
      tableData: [],
      total: 0,
      currentPage: 1,
      model: defaultFormState(),
      visible: false,
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
      try {
        const params = {
          page: this.currentPage,
        };
        const res = await contact.getContact(params);
        this.tableData = res.data.data;
        this.total = res.data.total;
      } catch (e) {
        //
      }
    },
    async handlePageChange(page) {
      await this.$router.push({ name: 'dashboard-monitoring', query: { page } });
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
      this.currentPage = page;
    },
    async viewDetail({ id }) {
      try {
        const res = await contact.getContactDetail(id);
        this.model = res.data;
        this.model.phone_no = this.model.phone_no.replace('+62', '');
        this.visible = true;
      } catch (e) {
        //
      }
    },
    async submit() {
      this.loading = true;
      try {
        await contact.createEdit(this.model);
        this.model = defaultFormState();
        this.visible = false;
        let prefix = 'Edit';
        if (!this.model.id) {
          prefix = 'Tambah';
        }
        this.$notify({
          title: 'Sukses',
          message: `${prefix} kontak berhasil`,
        });
      } catch (e) {
        //
      }
      this.loading = false;
    },
  },
};
</script>
