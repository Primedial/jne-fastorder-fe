<template>
  <div>
    <h1>Resi Satuan</h1>
    <el-form ref="form" :model="model" label-position="top">
      <el-row :gutter="20" class="mb-2">
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <el-card>
            <h2 class="text-primary">Data Pengirim</h2>
            <el-checkbox v-model="newSender">Buat pengirim baru</el-checkbox>
            <transition name="el-fade-in">
              <el-form-item v-if="!newSender" prop="sender" label="Nama pengirim">
                <el-select v-model="value" placeholder="Pilih pengirim" class="w-full">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </transition>
            <el-collapse-transition>
              <div v-if="newSender">
                <el-form-item prop="senderName" label="Nama Pengirim">
                  <el-input
                    v-model="model.senderName"
                    placeholder="Nama pengirim"
                    clearable
                  ></el-input>
                </el-form-item>
                <el-form-item prop="phoneNo" label="Nomor Telepon/WA">
                  <el-input v-model="model.phoneNo" placeholder="08x" clearable></el-input>
                </el-form-item>
                <el-form-item prop="city" label="Kota asal kiriman">
                  <el-select v-model="value" placeholder="Pilih asal" class="w-full">
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item prop="postalCode" label="Kode Pos">
                  <el-input v-model="model.postalCode" placeholder="Kode Pos" clearable></el-input>
                </el-form-item>
                <el-form-item prop="postalCode" label="Kode Pos">
                  <el-input
                    v-model="model.address"
                    placeholder="Alamat Lengkap"
                    type="textarea"
                    :rows="6"
                    clearable
                  ></el-input>
                </el-form-item>
              </div>
            </el-collapse-transition>
          </el-card>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <el-card>
            <h2 class="text-primary">Data Penerima</h2>
            <el-checkbox v-model="newReceipient">Buat penerima baru</el-checkbox>
            <transition name="el-fade-in">
              <el-form-item v-if="!newReceipient" prop="sender" label="Nama penerima">
                <el-select v-model="value" placeholder="Pilih pengirim" class="w-full">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </transition>
            <el-collapse-transition>
              <div v-if="newReceipient">
                <el-form-item prop="senderName" label="Nama Pengirim">
                  <el-input
                    v-model="model.senderName"
                    placeholder="Nama pengirim"
                    clearable
                  ></el-input>
                </el-form-item>
                <el-form-item prop="phoneNo" label="Nomor Telepon/WA">
                  <el-input v-model="model.phoneNo" placeholder="08x" clearable></el-input>
                </el-form-item>
                <el-form-item prop="city" label="Kota asal kiriman">
                  <el-select v-model="value" placeholder="Pilih asal" class="w-full">
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item prop="postalCode" label="Kode Pos">
                  <el-input v-model="model.postalCode" placeholder="Kode Pos" clearable></el-input>
                </el-form-item>
                <el-form-item prop="postalCode" label="Kode Pos">
                  <el-input
                    v-model="model.address"
                    placeholder="Alamat Lengkap"
                    type="textarea"
                    :rows="6"
                    clearable
                  ></el-input>
                </el-form-item>
              </div>
            </el-collapse-transition>
          </el-card>
        </el-col>
      </el-row>
      <el-card>
        <h2 class="text-primary">Data Kiriman</h2>
        <el-form-item prop="vehicle" label="Kendaraan Pickup">
          <el-select v-model="value" placeholder="Pilih kendaraan" class="w-full">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-row :gutter="20" class="mb-2">
          <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
            <el-form-item prop="packageType" label="Jenis Kiriman">
              <el-select v-model="value" placeholder="Non COD" class="w-full">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
            <el-form-item prop="packageType" label="PickUp / Drop Off">
              <el-select v-model="value" placeholder="PickUp" class="w-full">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
            <el-form-item prop="packageType" label="Pilih Agent">
              <el-select v-model="value" placeholder="Pilih Agent" class="w-full">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20" class="mb-2">
          <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
            <el-form-item prop="weight" label="Berat Kiriman (Kg)">
              <el-input placeholder="Kg"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
            <el-form-item prop="jumlah" label="Jumlah barang">
              <el-input placeholder="1"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
            <el-form-item prop="packageType" label="Jenis Layanan">
              <el-select v-model="value" placeholder="Pilih Jenis Layanan" class="w-full">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20" class="mb-2">
          <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
            <el-form-item prop="jumlah" label="Jumlah barang">
              <el-input type="textarea" :rows="6"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
            <el-form-item prop="jumlah" label="Instruksi Khusus">
              <el-input type="textarea" :rows="6"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20" class="mb-2">
          <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
            <el-form-item prop="jumlah" label="Harga Barang">
              <el-input placeholder="Harga Barang" v-model="input1">
                <template slot="prepend">Rp.</template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
            <el-form-item prop="jumlah" label="Ongkos Kirim">
              <el-input placeholder="Ongkos Kirim" v-model="input1">
                <template slot="prepend">Rp.</template>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-divider></el-divider>
        <div class="flex justify-end">
          <el-button type="primary">Buat Resi</el-button>
        </div>
      </el-card>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      model: {},
      newSender: false,
      newReceipient: false,
    };
  },
};
</script>
