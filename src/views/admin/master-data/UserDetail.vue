<template>
  <div>
    <div class="my-1 flex items-center justify-between">
      <h1 class="mt-2 mb-0">{{ pageTitle }}</h1>
    </div>
    <el-button type="text" icon="el-icon-back" @click="$router.go(-1)">Kembali</el-button>
    <el-card>
      <el-tabs type="card">
        <el-tab-pane>
          <h3 slot="label" class="my-0">
            <span class="mr-1"><i class="el-icon-user"></i></span>Basic Information
          </h3>
          <el-form ref="info" :model="model" :rules="rules" label-position="top">
            <el-form-item prop="name" label="Nama">
              <el-input v-model="model.name" clearable></el-input>
            </el-form-item>
            <el-form-item prop="email" label="Email">
              <el-input v-model="model.email" clearable></el-input>
            </el-form-item>
            <el-form-item prop="user_type_id" label="Tipe User">
              <el-select v-model="model.user_type_id" class="w-full">
                <el-option v-for="userType in userTypes" :key="userType.id" :label="userType.name" :value="userType.id"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item prop="phone_no" label="No. Telepon">
              <fo-input-number v-model="model.phone_no" :formatted="false" clearable>
                <template slot="prepend">+62</template>
              </fo-input-number>
            </el-form-item>
            <el-form-item prop="address" label="Address">
              <el-input v-model="model.address" type="textarea" :rows="3" clearable></el-input>
            </el-form-item>
          </el-form>
          <el-divider></el-divider>
          <div class="flex justify-end">
            <el-button type="primary" :loading="loading" @click="submit('info')">Submit</el-button>
          </div>
        </el-tab-pane>
        <el-tab-pane label="Rekening">
          <h3 slot="label" class="my-0">
            <span class="mr-1"><i class="el-icon-bank-card"></i></span>No. Rekening
          </h3>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import user from '@/api/admin/user';
import userType from '@/api/admin/userType';

export default {
  data() {
    const phoneValidation = (_, value, cb) => {
      if (String(value).length < 9 || String(value).length > 12) {
        cb(new Error('Nomor Telepon tidak valid.'));
      } else {
        cb();
      }
    };
    return {
      model: {},
      userTypes: [],
      loading: false,
      rules: {
        name: [{ required: true, trigger: 'blur', message: 'Nama wajib diisi' }],
        email: [{ required: true, trigger: 'blur', message: 'Email wajib diisi' }],
        phone_no: [
          { required: true, trigger: 'blur', message: 'Nomor Telepon wajib diisi' },
          { validator: phoneValidation, trigger: 'blur' },
        ],
        user_type_id: [{ required: true, trigger: 'blur', message: 'Tipe User wajib diisi' }],
      },
    };
  },
  computed: {
    pageTitle() {
      const prefix = this.$route.name === 'admin-user-new' ? 'Tambah' : 'Detail';
      return `${prefix} User`;
    },
  },
  created() {
    this.fetchUserTypes();
  },
  methods: {
    async fetchUserTypes() {
      const res = await userType.getAll();
      this.userTypes = res.data.data;
    },
    submit(type) {
      this.$refs[type].validate(async (valid) => {
        if (valid) {
          switch (type) {
            case 'info':
              await this.saveInfo();
              break;
            case 'bank':
              await this.saveAccountInfo();
              break;
            default:
              break;
          }
        }
      });
    },
    async saveInfo() {
      this.loading = true;
      try {
        const payload = {
          ...this.model,
          user_type_id: this.model.user_type_id,
          gender: 1,
        };
        await user.register(payload);
        this.$notify.success({
          title: 'Sukses',
          message: 'Informasi berhasil disimpan',
        });
      } catch (e) {
        //
      }
      this.loading = false;
    },
    async saveAccountInfo() {
      this.loading = true;
      try {
        const payload = {
          ...this.model,
          user_type_id: this.model.user_type_id,
          gender: 1,
        };
        await user.register(payload);
      } catch (e) {
        //
      }
      this.loading = false;
    },
  },
};
</script>
