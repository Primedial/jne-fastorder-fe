<template>
  <div>
    <h1>Resi Masal</h1>
    <el-card>
      <div class="flex items-center justify-between">
        <h2 class="text-primary">Upload Data Pengiriman</h2>
        <div class="flex">
          <el-button type="primary" icon="el-icon-download">Download Template</el-button>
        </div>
      </div>
      <el-form ref="form" :model="model" label-position="top">
        <el-form-item prop="vehicle" label="Jenis Kendaraan">
          <el-select v-model="model.vehicle" class="w-full">
            <el-option
              v-for="v in vehicles"
              :key="`vehicle-${v.value}`"
              :label="v.label"
              :value="v.value"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { vehicle } from '@/constants/awb';

export default {
  data() {
    return {
      model: {
        vehicle: null,
      },
      vehicles: [
        {
          value: vehicle.MOBIL,
          label: 'Mobil',
        },
        {
          value: vehicle.MOTOR,
          label: 'Motor',
        },
        {
          value: vehicle.TRUCK,
          label: 'Truck',
        },
      ],
    };
  },
};
</script>
