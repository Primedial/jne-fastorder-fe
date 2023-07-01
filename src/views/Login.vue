<template>
  <div class="flex h-screen w-screen items-center justify-center">
    <div class="login-container">
      <div class="box top-left"></div>
      <div class="box top-left-sm"></div>
      <el-card style="padding: 24px 16px">
        <el-image
          style="width: 45%; height: auto;margin-bottom: 32px;"
          src="https://demo.permudahdakwah.com/images/fastorder.png"
          fit="cover"
          class="block m-auto"
        ></el-image>
        <div class="my-2">
          <h4 class="my-1">Welcome to Fastorder! 📦</h4>
          <small class="text-gray">Silahkan login ke akun anda untuk memulai pengiriman</small>
        </div>
        <el-form autocompleete="off" ref="form" :model="model" :rules="rules" class="mb-2" @keyup.native.enter="submit">
          <el-form-item prop="email" label="Email">
            <el-input v-model="model.email" clearable></el-input>
          </el-form-item>
          <el-form-item prop="password" label="Password">
            <el-input v-model="model.password" type="password" clearable></el-input>
          </el-form-item>
        </el-form>
        <div class="flex justify-end mb-1">
          <el-button type="text" @click="$router.push('reset-password')">Lupa password?</el-button>
        </div>
        <el-button type="primary" class="w-full ml-0-i" @click="submit">Login</el-button>
      </el-card>
      <div class="box bottom-right">
        <div class="box-inner"></div>
      </div>
    </div>
  </div>
</template>

<script>
import auth from '@/api/auth';

export default {
  data() {
    return {
      err: null,
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
            localStorage.setItem('token', res.data.token);
            await this.$store.dispatch('auth/introspect');
            await this.$router.push({ name: 'dashboard-overview' });
          } catch (e) {
            // do nothing
          }
        }
      });
    },
  },
};
</script>
