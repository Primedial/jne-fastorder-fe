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
        <h4 class="text-center">Reset Password Akun</h4>
        <el-form ref="form" :model="model" :rules="rules" class="mb-2" @keyup.native.enter="submit">
          <el-form-item prop="email" label="Email">
            <el-input v-model="model.email" clearable></el-input>
          </el-form-item>
        </el-form>
        <el-button type="primary" class="w-full" :loading="loading" @click="submit">Submit Email</el-button>
      </el-card>
    </div>
  </div>
</template>

<script>
import auth from '@/api/auth';

export default {
  data() {
    return {
      loading: false,
      model: {
        email: '',
      },
      rules: {
        email: [
          { required: true, trigger: 'blur', message: 'Email wajib diisi' },
        ],
      },
    };
  },
  methods: {
    submit() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          this.loading = true;
          try {
            const data = {
              email: this.model.email,
            };
            await auth.resetPassword(data);
            await this.$router.push({ name: 'login' });
            this.$notify({
              type: 'success',
              title: 'Sukses',
              message: `Silahkan ikuti petunjuk yang sudah dikirim ke email ${this.model.email}`,
            });
          } catch (e) {
            // do nothing
          }
          this.loading = false;
        }
      });
    },
  },
};
</script>
