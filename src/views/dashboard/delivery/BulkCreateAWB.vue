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
            :disabled="isSubmitDisabled"
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
              <el-table-column label="Nama Pengirim" width="150">
                <template slot-scope="scope">
                  {{ scope.row.shipper.name }}
                </template>
              </el-table-column>
              <el-table-column label="No. HP Pengirim" width="150">
                <template slot-scope="scope">
                  +62{{ scope.row.shipper.phone }}
                </template>
              </el-table-column>
              <el-table-column label="Kota Penerima" width="150">
                <template slot-scope="scope">
                  {{ scope.row.receiver.city_name }}
                </template>
              </el-table-column>
              <el-table-column label="Nama Penerima" width="150">
                <template slot-scope="scope">
                  {{ scope.row.receiver.name }}
                </template>
              </el-table-column>
              <el-table-column label="No. HP Penerima" width="150">
                <template slot-scope="scope">
                  +62{{ scope.row.receiver.phone }}
                </template>
              </el-table-column>
              <el-table-column label="Jenis Layanan" width="150">
                <template slot-scope="scope">
                  <el-tag type="info"><strong>{{ scope.row.shipment_code }}</strong></el-tag>
                </template>
              </el-table-column>
              <el-table-column label="COD" width="150">
                <template slot-scope="scope">
                  <el-checkbox v-model="scope.row.is_cod" disabled></el-checkbox>
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
              <el-table-column label="Harga Barang" width="150">
                <template slot-scope="scope">
                  {{ scope.row.goods_price | formatCurrency }}
                </template>
              </el-table-column>
              <el-table-column label="Instruksi Pengiriman" width="170">
                <template slot-scope="scope">
                  <el-popover
                    placement="top-start"
                    title="Instruksi Pengiriman"
                    width="200"
                    trigger="hover"
                    :content="scope.row.handling_instructions"
                  >
                    <el-button
                      v-if="scope.row.handling_instructions && scope.row.handling_instructions !== ''"
                      slot="reference"
                      type="text"
                      icon="el-icon-search"
                    >Lihat</el-button>
                  </el-popover>
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
    <el-dialog :visible.sync="isErrorDialogVisible">
      <h2 class="my-0" slot="title"><span class="text-danger"><i class="el-icon-warning"></i></span> Error Upload Data Pengiriman</h2>
      <p>Silakan cek kembali bahwa data yang diisi sudah benar</p>
      <el-table :data="errors">
        <el-table-column label="Row" prop="row" width="80"></el-table-column>
        <el-table-column label="Deskripsi" prop="message">
          <template slot-scope="scope">
            <ul>
              <li v-for="(err, i) in scope.row.message" :key="`err-${i}`">{{ err }}</li>
            </ul>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
import { read, utils } from 'xlsx';
import { vehicle } from '@/constants/awb';
import awb from '@/api/awb';
import validator from '@/helpers/validator';

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
      errors: [],
      isErrorDialogVisible: false,
    };
  },
  computed: {
    subtotal() {
      return this.fileContents.reduce((acc, curr) => acc + curr.discount_price * curr.quantity, 0);
    },
    user() {
      return this.$store.getters['auth/user'];
    },
    isSubmitDisabled() {
      return this.fileContents.length === 0 || this.user.wallet.amount < this.subtotal;
    },
    isInsufficientBalance() {
      return this.user.wallet.amount < this.subtotal;
    },
  },
  watch: {
    isInsufficientBalance(newVal) {
      if (newVal) {
        this.$message({
          showClose: true,
          duration: 0,
          message: 'Saldo anda tidak mencukupi',
          type: 'error',
        });
      }
    },
  },
  methods: {
    fileHandler(event) {
      this.loading = true;
      try {
        const file = event.target.files[0];
        this.file = file;
        const fr = new FileReader();
        this.fileContents = [];
        this.tempFileContents = [];
        fr.onload = async (evt) => {
          const data = evt.target.result;
          const xlsx = read(data, { type: 'binary' });
          const sheet = xlsx.SheetNames[0];
          const contents = utils.sheet_to_json(xlsx.Sheets[sheet]);
          this.tempFileContents = contents.map((row, i) => {
            // eslint-disable-next-line no-unsafe-optional-chaining
            const [shipperCityCode, addr1] = row['Kode Kota Pengirim']?.split('|');
            // eslint-disable-next-line no-unsafe-optional-chaining
            const [receiverCityCode, rAddr1] = row['Kode Kota Penerima']?.split('|');
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
                address: row['Alamat Penerima'],
              },
              goods_descriptions: row['Deskripsi Barang'],
              handling_instructions: row['Instruksi Barang'],
              goods_price: Number(row['Harga Barang']),
              shipment_code: row['Layanan (REG,OKE, JTR)'],
              quantity: row['Jumlah Barang'],
              weight: Number(row['Berat (Kg)']),
              is_cod: row['COD (YES/NO)'] === 'YES',
            };
          });
          await this.contentValidator(this.tempFileContents);
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
    async contentValidator(contents) {
      try {
        this.errors = [];
        const baseRules = {
          name: 'required',
          phone: 'required|numeric',
          city_code: 'required',
          city_name: 'required',
          postal_code: 'required|integer|min:5',
        };
        const rules = {
          shipper: baseRules,
          receiver: baseRules,
          weight: 'required|numeric|min:0.1',
          quantity: 'required|integer|min:1',
          shipment_code: 'required',
          goods_descriptions: 'required',
          goods_price: 'required|numeric|min:1',
        };
        const message = {
          'required.shipper.name': 'Nama Pengirim wajib diisi',
          'required.shipper.phone': 'No. HP Pengirim wajib diisi',
          'numeric.shipper.phone': 'Format No. HP Pengirim Salah',
          'required.shipper.city_code': 'Format Kota Pengirim salah',
          'required.shipper.city_name': 'Format Kota Pengirim salah',
          'required.shipper.postal_code': 'Format Kota Pengirim salah',
          'required.receiver.name': 'Nama Penerima wajib diisi',
          'required.receiver.phone': 'No. HP Penerima wajib diisi',
          'numeric.receiver.phone': 'Format No. HP Penerima Salah',
          'required.receiver.city_code': 'Format Kota Penerima salah',
          'required.receiver.city_name': 'Format Kota Penerima salah',
          'required.receiver.postal_code': 'Format Kota Penerima salah',
          'required.goods_descriptions': 'Deskripsi Barang wajib diisi',
          'required.goods_price': 'Harga Barang wajib diisi dan tidak boleh 0',
          'numeric.goods_price': 'Format Harga Barang salah',
          'min.goods_price': 'Harga Barang tidak boleh 0 (Nol)',
          'required.quantity': 'Jumlah Barang wajib diisi',
          'integer.quantity': 'Format Jumlah Barang salah',
          'min.quantity': 'Format Jumlah Barang salah minimal 1',
          'required.weight': 'Berat Barang wajib diisi',
          'numeric.weight': 'Format Berat Barang salah',
          'min.weight': 'Berat Barang tidak boleh 0 (Nol)',
        };
        await Promise.all(contents.map(async (row, i) => {
          await validator({ body: row, rules, message }, (err, status) => {
            if (err) {
              Object.keys(err.errors).forEach((key) => {
                this.errors.push({ row: i + 2, message: err.errors[key] });
              });
            }
          });
        }));
        if (this.errors.length > 0) {
          throw new Error(this.errors);
        }
      } catch (e) {
        this.isErrorDialogVisible = true;
        throw e;
      }
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
            this.$store.dispatch('auth/introspect');
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
