<template>
  <div class="pt-2">
    <h1>Cek Ongkir</h1>
    <el-card>
      <el-form ref="form" :model="model" :rules="rules" @keyup.native.enter="submit">
        <el-row :gutter="20">
          <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
            <h3>Asal</h3>
            <p class="text-gray">Pilih kota <strong>Asal</strong> pengiriman.</p>
            <el-form-item
              prop="origin"
              :rules="{ required: true, trigger: 'blur', message: 'Kota Asal wajib diisi' }"
            >
              <el-select
                v-model="model.origin"
                filterable
                remote
                reserve-keyword
                placeholder="Pilih asal"
                :remote-method="remoteMethodOrigin"
                class="w-full"
              >
                <el-option
                  v-for="item in filteredOrigins"
                  :key="item.city_code"
                  :value="item.city_code"
                  :label="item.city_name"
                >
                  <span style="float: left">{{ item.city_name }}</span>
                  <span style="float: right; color: #8492a6; font-size: 12px">{{ item.city_code }}</span>
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
            <h3>Tujuan</h3>
            <p class="text-gray">Pilih kota <strong>Tujuan</strong> pengiriman.</p>
            <el-form-item
              prop="destination"
              :rules="{ required: true, trigger: 'blur', message: 'Kota Tujuan wajib diisi' }"
            >
              <el-select
                v-model="model.destination"
                filterable
                remote
                reserve-keyword
                placeholder="Pilih tujuan"
                :remote-method="remoteMethodDestination"
                class="w-full"
              >
                <el-option
                  v-for="item in filterdDestinations"
                  :key="item.city_code"
                  :label="item.city_name"
                  :value="item.city_code"
                >
                  <span style="float: left">{{ item.city_name }}</span>
                  <span style="float: right; color: #8492a6; font-size: 12px">{{ item.city_code }}</span>
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
            <h3>Berat</h3>
            <p class="text-gray">dalam satuan Kg.</p>
            <el-form-item
              prop="weight"
            >
              <fo-input-number v-model="model.weight" placeholder="Kg"></fo-input-number>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <el-button
        type="primary"
        class="w-full mt-3 py-2"
        :loading="loading"
        @click="submit"
      >Cek Ongkir</el-button>
    </el-card>
    <div v-if="isSearched" class="mt-2">
      <div v-if="isSearched && prices.length === 0" class="mt-3">
        <el-empty description="Data tidak ditemukan."></el-empty>
      </div>
      <el-row :gutter="20">
        <el-col
          v-for="(price, i) in prices" :key="`price-${i}`"
          :xs="24"
          :sm="24"
          :md="24"
          :lg="8"
          :xl="8"
          class="mb-2"
        >
          <el-card>
            <el-row :gutter="16">
              <el-col :span="7">
                <el-image style="width: 80px;height; 80px" src="https://upload.wikimedia.org/wikipedia/commons/9/92/New_Logo_JNE.png"></el-image>
              </el-col>
              <el-col :span="17">
                <el-tag type="info" outlined class="service-tag"><strong>{{ price.service_display }}</strong></el-tag>
                <h2 class="my-1">{{ price.discount_price | formatCurrency }}</h2>
                <small class="text-gray mb-1 block">
                  <strike>{{ price.price | formatCurrency }}</strike>
                </small>
                <small class="text-gray">Tipe barang: <strong>{{ price.goods_type }}</strong></small>
              </el-col>
            </el-row>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import awbApi from '@/api/awb';

export default {
  data() {
    return {
      loading: false,
      model: {
        destination: '',
        origin: '',
        weight: null,
      },
      rules: {
        weight: [
          { required: true, trigger: 'blur', message: 'Berat wajib diisi' },
          {
            validator: (_, value, cb) => {
              if (value <= 0) {
                cb(new Error('Berat minimal 1Kg'));
              } else {
                cb();
              }
            },
          },
        ],
      },
      destinations: [],
      origins: [],
      searchOrigin: '',
      searchDestination: '',
      prices: [],
      isSearched: false,
      indexedOrigins: {},
      indexedDestination: {},
    };
  },
  created() {
    this.fetchAllData();
  },
  computed: {
    filterdDestinations() {
      if (this.searchDestination !== '') {
        return this.destinations.filter((city) => city.city_name.toLowerCase().includes(this.searchDestination.toLowerCase()));
      }
      return this.destinations;
    },
    filteredOrigins() {
      if (this.searchOrigin !== '') {
        return this.origins.filter((city) => city.city_name.toLowerCase().includes(this.searchOrigin.toLowerCase()));
      }
      return this.origins;
    },
  },
  methods: {
    async fetchAllData() {
      this.loading = true;
      try {
        const dest = await awbApi.getDestinations();
        const origins = await awbApi.getOrigins();
        this.destinations = dest.data;
        this.origins = origins.data;
      } catch (e) {
        // do nothing
      }
      this.loading = false;
    },
    async remoteMethodOrigin(str) {
      this.searchOrigin = str;
      const origins = await awbApi.getOrigins({ q: str });
      this.origins = origins.data;
    },
    async remoteMethodDestination(str) {
      this.searchDestination = str;
      const dest = await awbApi.getDestinations({ q: str });
      this.destinations = dest.data;
    },
    submit() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          this.loading = true;
          try {
            const res = await awbApi.checkTarrif(this.model);
            this.isSearched = true;
            this.prices = res.data.price || [];
            if (res.data.error) {
              this.$notify({
                type: 'error',
                title: 'Error',
                message: res.data.error,
              });
            }
          } catch (e) {
            // do nothing
          }
          this.loading = false;
        }
      });
    },
    onInput(event) {
      console.log(event);
    },
  },
};
</script>

<style>
.service-tag.el-tag {
  line-height: 16px;
  height: 18px;
}
</style>
