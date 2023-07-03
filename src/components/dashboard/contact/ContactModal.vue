<template>
  <el-dialog :visible.sync="inputVal" :title="title">
    <el-alert
      title="Kontak tidak bisa diubah jika sedang ada pengiriman yang aktif"
      type="info"
      :closable="false"
      show-icon>
    </el-alert>
    <el-form ref="form" :model="model" :rules="rules">
      <el-form-item prop="name" label="Nama">
        <el-input
          v-model="model.name"
          clearable
          :disabled="!model.is_allow_edit"
        ></el-input>
      </el-form-item>
      <el-form-item
        prop="phone_no"
        label="Nomor Telepon/WA"
      >
        <fo-input-number v-model="model.phone_no" :disabled="!model.is_allow_edit" :formatted="false" clearable>
          <template slot="prepend">+62</template>
        </fo-input-number>
      </el-form-item>
      <el-form-item
        prop="city_code"
        label="Kota"
        :rules="{ required: true, trigger: 'blur', message: 'Kota asal pengirim wajib diisi' }"
      >
        <el-select
          v-model="model.city_code"
          filterable
          remote
          :disabled="!model.is_allow_edit"
          reserve-keyword
          placeholder="Cari kota"
          :remote-method="remoteMethod"
          class="w-full"
          value-key="city_code"
        >
          <el-option
            v-for="item in cities"
            :key="`city-${item.city_code}`"
            :label="item.city_name"
            :value="item.city_code"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="postal_code" label="Kode Pos">
        <el-input
          v-model.number="model.postal_code"
          :disabled="!model.is_allow_edit"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item prop="address" label="Alamat Lengkap">
        <el-input
          v-model="model.address"
          type="textarea"
          :disabled="!model.is_allow_edit"
          :rows="4"
        ></el-input>
      </el-form-item>
    </el-form>
    <el-divider></el-divider>
    <el-button
      type="primary"
      class="w-full"
      :loading="loading"
      :disabled="!model.is_allow_edit"
      @click="submit"
    >Submit</el-button>
  </el-dialog>
</template>

<script>
import awb from '@/api/awb';
import { contactUsageType } from '@/constants/awb';

export default {
  props: {
    model: {
      type: Object,
      required: true,
      default: () => ({}),
    },
    value: {
      type: Boolean,
      required: true,
      default: false,
    },
    loading: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  data() {
    const phoneValidation = (_, value, cb) => {
      if (String(value).length < 10 || String(value).length > 12) {
        cb(new Error('Nomor Telepon tidak valid.'));
      } else {
        cb();
      }
    };

    const postalCodeValidation = (_, value, cb) => {
      const valid = /^[0-9]+$/.test(value);
      if (!valid || String(value).length < 5 || String(value).length > 5) {
        cb(new Error('Kode Pos lebih atau kurang dari 5 karakter.'));
      } else {
        cb();
      }
    };

    return {
      cities: [],
      contactTypes: [
        {
          value: contactUsageType.SHIPPER,
          label: 'Pengirim',
        },
        {
          value: contactUsageType.RECEIVER,
          label: 'Penerima',
        },
      ],
      rules: {
        contact_type: [{ required: true, trigger: 'blur', message: 'Tipe Kontak wajib diisi' }],
        name: [{ required: true, trigger: 'blur', message: 'Nama wajib diisi' }],
        phone_no: [
          { required: true, trigger: 'blur', message: 'Nomor Telepon wajib diisi' },
          { validator: phoneValidation, trigger: 'blur' },
        ],
        postal_code: [
          { required: true, trigger: 'blur', message: 'Kode pos wajib diisi' },
          { validator: postalCodeValidation, trigger: 'blur' },
        ],
      },
    };
  },
  computed: {
    title() {
      let prefix = 'Tambah';
      if (this.model.id) {
        prefix = 'Edit';
      }
      return `${prefix} Kontak`;
    },
    inputVal: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit('input', val);
      },
    },
  },
  watch: {
    value(newVal) {
      if (newVal) {
        this.cities.push({
          city_name: this.model.city_name,
          city_code: this.model.city_code,
        });
      } else {
        this.cities = [];
      }
    },
  },
  methods: {
    async remoteMethod(str) {
      try {
        if (this.model.contact_type === contactUsageType.SHIPPER) {
          const res = await awb.getOrigins({ q: str });
          this.cities = res.data;
        } else {
          const res = await awb.getDestinations({ q: str });
          this.cities = res.data;
        }
      } catch (e) {
        //
      }
    },
    // handleChange(val) {
    //   // this.model.city = { ...val };
    //   this.model.city_code = val.city_code;
    //   this.model.city_name = val.city_name;
    // },
    submit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.$emit('submit');
        }
      });
    },
  },
};
</script>
