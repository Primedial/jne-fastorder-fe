<template>
  <div>
    <h1>Cek Ongkir</h1>
    <el-card>
      <el-row :gutter="20">
        <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
          <h3>Asal</h3>
          <p class="text-gray">Pilih kota <strong>Asal</strong> pengiriman.</p>
          <el-select v-model="value" placeholder="Pilih Asal" class="w-full">
            <el-option
              v-for="item in options"
              :key="`asal-${item.value}`"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
          <h3>Tujuan</h3>
          <p class="text-gray">Pilih kota <strong>Tujuan</strong> pengiriman.</p>
          <el-select v-model="value" placeholder="Pilih Tujuan" class="w-full">
            <el-option
              v-for="item in options"
              :key="`tujuan-${item.value}`"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
          <h3>Berat</h3>
          <p class="text-gray">dalam satuan Kg.</p>
          <el-input placeholder="Kg" v-model="input"></el-input>
        </el-col>
      </el-row>
      <el-button type="primary" class="w-full mt-3 py-2">Cek Ongkir</el-button>
    </el-card>
  </div>
</template>

<script>
import awbApi from '@/api/awb';

export default {
  data() {
    return {
      model: {
        destination: '',
        origin: '',
        weight: null,
      },
      destinations: [],
      origins: [],
    };
  },
  created() {
    this.fetchAllData();
  },
  methods: {
    async fetchAllData() {
      try {
        const dest = await awbApi.getDestinations();
        const origins = await awbApi.getOrigins();
        console.log({ dest, origins });
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>
