<template>
  <div class="flex h-screen w-screen items-center justify-center">
    <div class="login-container">
      <el-card>
        <el-image
            style="width: 50%; height: auto"
            src="https://demo.permudahdakwah.com/images/fastorder.png"
            fit="cover"
            class="block m-auto"
        ></el-image>
        <h4 class="text-center">Setup Akun Anda</h4>
        <el-form ref="form" :model="model" :rules="rules" class="mb-2" @keyup.native.enter="submit">
          <el-form-item prop="password" label="Password">
            <el-input v-model="model.password" clearable type="password"></el-input>
          </el-form-item>
          <el-form-item prop="confirm_password" label="Konfirmasi Password">
            <el-input v-model="model.confirm_password" type="password" clearable></el-input>
          </el-form-item>
        </el-form>
        <el-button type="primary" class="w-full" @click="submit">Ubah Password</el-button>
      </el-card>
    </div>
  </div>
</template>

<script>
import auth from '@/api/auth';

export default {
  data() {
    return {
      model: {
        password: '',
        confirm_password: '',
      },
      rules: {
        confirm_password: [
          { required: true, trigger: 'blur', message: 'Konfirmasi wajib diisi' },
        ],
        password: [
          { required: true, trigger: 'blur', message: 'Password wajib diisi' },
        ],
      },
    };
  },
  created() {
    if (!this.$route.query.token) {
      // this.$router.push({ name: 'login' });
    }
  },
  methods: {
    submit() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          try {
            const data = {
              confirm_password: this.model.confirm_password,
              password: this.model.password,
            };
            await auth.verify(data, this.$route.query.token);
            this.$message({
              type: 'success',
              message: 'Password berhasil diubah',
            });
            this.$router.push('/login');
          } catch (e) {
            // do nothing
          }
        }
      });
    },
  },
};
</script>
