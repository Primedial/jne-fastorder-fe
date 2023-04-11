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
        <h4 class="text-center">Login ke Akun MySales Anda</h4>
        <el-form ref="form" :model="model" :rules="rules" class="mb-2" @keyup.native.enter="submit">
          <el-form-item prop="email" label="Email">
            <el-input v-model="model.email" clearable></el-input>
          </el-form-item>
          <el-form-item prop="password" label="Password">
            <el-input v-model="model.password" type="password" clearable></el-input>
          </el-form-item>
        </el-form>
        <el-button type="primary" class="w-full" @click="submit">Login</el-button>
      </el-card>
    </div>
  </div>
</template>

<script>
import auth from '@/api/admin/auth';

export default {
  data() {
    return {
      model: {
        email: '',
        password: '',
      },
      rules: {
        email: [
          { required: true, trigger: 'blur', message: 'Email wajib diisi' },
        ],
        password: [
          { required: true, trigger: 'blur', message: 'Password wajib diisi' },
        ],
      },
    };
  },
  methods: {
    submit() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          try {
            const data = {
              email: this.model.email,
              password: this.model.password,
            };
            const res = await auth.login(data);
            localStorage.setItem('admintoken', res.data.token);
            await this.$router.push({ name: 'admin-overview' });
          } catch (e) {
            // do nothing
          }
        }
      });
    },
  },
};
</script>
