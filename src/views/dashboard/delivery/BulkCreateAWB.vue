<template>
  <div>
    <h1>Resi Masal</h1>
    <el-card>
      <div class="flex items-center justify-between">
        <h2 class="text-primary">Upload Data Pengiriman</h2>
        <div class="flex">
          <el-button icon="el-icon-download">Download Template</el-button>
          <el-button
            type="primary"
            icon="el-icon-check"
            :loading="loading"
            :disabled="fileContents.length === 0"
            @click="submit"
          >Kirim Data</el-button>
        </div>
      </div>
      <el-form ref="form" :model="model" label-position="top">
        <el-row :gutter="16">
          <el-col :span="10">
            <el-form-item
              prop="vehicle"
              label="Jenis Kendaraan"
              :rules="{ required: true, trigger: 'blur', message: 'Jenis kendaraan wajib diisi'}"
            >
              <el-select v-model="model.vehicle" class="w-full">
                <el-option
                  v-for="v in vehicles"
                  :key="`vehicle-${v.value}`"
                  :label="v.label"
                  :value="v.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item prop="insured" label="Asuransi">
              <el-checkbox v-model="model.insured">Asuransi</el-checkbox>
            </el-form-item>
          </el-col>
        </el-row>
        <label for="input">
          <input ref="input" type="file" accept=".xlsx" name="input" class="hidden" :multiple="false" @change="fileHandler">
        </label>
        <el-button
          type="primary"
          plain
          icon="el-icon-upload"
          :loading="loading"
          @click="$refs.input.click()"
        >Upload File</el-button>
        <transition name="el-fade-in">
          <div v-show="fileContents.length > 0">
            <small class="text-gray"><em>{{ file.name }}</em></small>
            <el-table :data="fileContents" height="350" class="mt-2">
              <el-table-column label="Kota Pengirim" width="150">
                <template slot-scope="scope">
                  {{ scope.row.shipper.city_name }}
                </template>
              </el-table-column>
              <el-table-column label="Kota Penerima" width="150">
                <template slot-scope="scope">
                  {{ scope.row.receiver.city_name }}
                </template>
              </el-table-column>
              <el-table-column label="Jenis Layanan" width="150">
                <template slot-scope="scope">
                  <el-tag type="info"><strong>{{ scope.row.shipment_code }}</strong></el-tag>
                </template>
              </el-table-column>
              <el-table-column label="Berat (Kg)" width="150">
                <template slot-scope="scope">
                  {{ scope.row.weight }}
                </template>
              </el-table-column>
              <el-table-column label="Jumlah Barang" width="150">
                <template slot-scope="scope">
                  {{ scope.row.quantity }}
                </template>
              </el-table-column>
              <el-table-column label="Deskripsi Barang" width="200">
                <template slot-scope="scope">
                  {{ scope.row.goods_descriptions }}
                </template>
              </el-table-column>
              <el-table-column label="Harga Pengiriman" width="200">
                <template slot-scope="scope">
                  <p class="text-right">
                    {{ scope.row.discount_price | formatCurrency }}
                  </p>
                </template>
              </el-table-column>
              <el-table-column label="Total Harga Pengiriman" fixed="right" width="200">
                <template slot-scope="scope">
                  <p class="text-right">{{ Number(scope.row.discount_price) * scope.row.quantity | formatCurrency }}</p>
                </template>
              </el-table-column>
            </el-table>
            <div class="flex w-full justify-end">
              <h2>Subtotal: <span class="text-primary">{{ subtotal | formatCurrency }}</span></h2>
            </div>
          </div>
        </transition>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { read, utils } from 'xlsx';
import { vehicle } from '@/constants/awb';
import awb from '@/api/awb';

export default {
  data() {
    return {
      fileContents: [],
      tempFileContents: [],
      loading: false,
      file: {
        name: null,
        insured: false,
      },
      model: {
        vehicle: null,
        insured: false,
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
  computed: {
    subtotal() {
      return this.fileContents.reduce((acc, curr) => acc + curr.discount_price * curr.quantity, 0);
    },
  },
  methods: {
    fileHandler(event) {
      this.loading = true;
      try {
        const file = event.target.files[0];
        this.file = file;
        const fr = new FileReader();
        fr.onload = (evt) => {
          const data = evt.target.result;
          const xlsx = read(data, { type: 'binary' });
          const sheet = xlsx.SheetNames[0];
          const contents = utils.sheet_to_json(xlsx.Sheets[sheet]);
          this.tempFileContents = contents.map((row, i) => {
            const [shipperCityCode, addr1] = row['Kode Kota Pengirim'].split('|');
            const [receiverCityCode, rAddr1] = row['Kode Kota Penerima'].split('|');
            return {
              id: i + 1,
              shipper: {
                name: row['Nama Pengirim'],
                phone: row['No. Hp Pengirim'],
                city_code: shipperCityCode,
                city_name: addr1,
                postal_code: row['Kode Pos Pengirim'],
                address: row['Alamat Pengirim'],
              },
              receiver: {
                name: row['Nama Penerima'],
                phone: row['No. Hp Penerima'],
                city_code: receiverCityCode,
                city_name: rAddr1,
                postal_code: row['Kode Pos Penerima'],
                address: row['Alamat PengiPenerimarim'],
              },
              goods_descriptions: row['Deskripsi Barang'],
              handling_instructions: row['Intruksi Barang'],
              goods_price: Number(row['Harga Barang']),
              shipment_code: row['Layana (REG,OKE, JTR)'],
              quantity: row['Jumlah Barang'],
              weight: Number(row['Berat (Kg)']),
              is_cod: row['COD (YES/NO)'] === 'YES',
            };
          });
          if (contents.length > 25) {
            this.$notify({
              type: 'error',
              message: 'Maksimal 25 pengiriman',
            });
            this.tempFileContents = [];
          }
          this.checkPrice();
        };
        fr.readAsBinaryString(file);
      } catch (e) {
        this.$notify({
          type: 'error',
          message: 'File template error',
        });
      }
      event.target.value = null;
      this.loading = false;
    },
    async checkPrice() {
      this.loading = true;
      try {
        this.fileContents = await Promise.all(this.tempFileContents.map(async (item, idx) => {
          const res = await awb.checkTarrif({ origin: item.shipper.city_code, destination: item.receiver.city_code, weight: item.weight });
          const price = res.data.price.find((i) => i.service_display === item.shipment_code);
          return {
            ...item,
            id: idx,
            final_shipment_code: price.service_code,
            price: price?.price || 0,
            discount_price: price?.discount_price || 0,
          };
        }));
      } catch (e) {
        console.log(e);
      }
      this.loading = false;
    },
    async submit() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          this.loading = true;
          try {
            const payload = {
              vehicle: this.model.vehicle,
              insured: this.model.insured,
              deliveries: this.fileContents.map((val) => ({
                ...val,
                shipment_code: val.final_shipment_code,
              })),
            };
            await awb.bulkGenerateAWB(payload);
            this.$notify({
              type: 'success',
              message: 'Berhasil',
            });
            this.$router.push({ name: 'dashboard-delivery' });
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
