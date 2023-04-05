<template>
  <div>
    <h1>Resi Satuan</h1>
    <el-card>
      <el-steps :active="currentStep" align-center>
        <el-step title="Informasi Pengiriman" icon="el-icon-document"></el-step>
        <el-step title="Jenis Layanan" icon="el-icon-box"></el-step>
        <el-step title="Sukses" icon="el-icon-circle-check"></el-step>
      </el-steps>
    </el-card>
    <transition-group name="el-fade-in" mode="out-in">
      <el-form v-show="currentStep === 0" key="el-form" ref="form" :model="model" label-position="top" class="mt-3">
        <el-row :gutter="20" class="mb-2">
          <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
            <el-card>
              <h2 class="text-primary">Data Pengirim</h2>
              <el-checkbox v-model="newSender">Buat pengirim baru</el-checkbox>
              <transition name="el-fade-in">
                <el-form-item
                  v-if="!newSender"
                  prop="shipper_contact_id"
                  label="Nama pengirim"
                  :rules="{ required: true, trigger: 'blur', message: 'Nama pengirim wajib diisi' }"
                >
                  <el-select v-model="model.shipper_contact_id" value-key="id" placeholder="Pilih pengirim" class="w-full" @change="onHandleChange">
                    <el-option
                      v-for="item in shipperContact"
                      :key="`shipper-${item.id}`"
                      :label="item.name"
                      :value="item"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
              </transition>
              <el-collapse-transition>
                <div v-if="newSender">
                  <el-form-item
                    prop="shipper.name"
                    label="Nama Pengirim"
                    :rules="{ required: true, trigger: 'blur', message: 'Nama pengirim wajib diisi' }"
                  >
                    <el-input
                      v-model="model.shipper.name"
                      placeholder="Nama pengirim"
                      clearable
                    ></el-input>
                  </el-form-item>
                  <el-form-item
                    prop="shipper.phone_no"
                    label="Nomor Telepon/WA"
                    :rules="{ required: true, trigger: 'blur', message: 'Nomor Telepon wajib diisi' }"
                  >
                    <el-input v-model="model.shipper.phone_no" placeholder="08x" clearable></el-input>
                  </el-form-item>
                  <el-form-item
                    prop="shipper.city_code"
                    label="Kota asal kiriman"
                    :rules="{ required: true, trigger: 'blur', message: 'Kota asal pengirim wajib diisi' }"
                  >
                    <el-select v-model="model.shipper.city_code" placeholder="Pilih asal" class="w-full" value-key="city_code">
                      <el-option
                        v-for="origin in origins"
                        :key="origin.city_code"
                        :label="origin.city_name"
                        :value="origin"
                      >
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item
                    prop="shipper.postal_code"
                    label="Kode Pos"
                    :rules="{ required: true, trigger: 'blur', message: 'Kode pos wajib diisi' }"
                  >
                    <el-input v-model="model.shipper.postal_code" placeholder="Kode Pos" clearable></el-input>
                  </el-form-item>
                  <el-form-item
                    prop="shipper.address"
                    label="Alamat"
                    :rules="{ required: true, trigger: 'blur', message: 'Alamat wajib diisi' }"
                  >
                    <el-input
                      v-model="model.shipper.address"
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
                <el-form-item
                  v-if="!newReceipient"
                  prop="receiver_contact_id"
                  label="Nama penerima"
                  :rules="{ required: true, trigger: 'blur', message: 'Nama penerima wajib diisi' }"
                >
                  <el-select v-model="model.receiver_contact_id" placeholder="Pilih pengirim" class="w-full" value-key="id" @change="onHandleChange">
                    <el-option
                      v-for="item in receiverContact"
                      :key="item.id"
                      :label="item.name"
                      :value="item"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
              </transition>
              <el-collapse-transition>
                <div v-if="newReceipient">
                  <el-form-item
                    prop="receiver.name"
                    label="Nama Pengirim"
                    :rules="{ required: true, trigger: 'blur', message: 'Nama penerima wajib diisi' }"
                  >
                    <el-input
                      v-model="model.senderName"
                      placeholder="Nama pengirim"
                      clearable
                    ></el-input>
                  </el-form-item>
                  <el-form-item
                    prop="receiver.phone_no"
                    label="Nomor Telepon/WA"
                    :rules="{ required: true, trigger: 'blur', message: 'Nama penerima wajib diisi' }"
                  >
                    <el-input v-model="model.receiver.phone_no" placeholder="08x" clearable></el-input>
                  </el-form-item>
                  <el-form-item
                    prop="receiver.city_code"
                    label="Kota asal kiriman"
                    :rules="{ required: true, trigger: 'blur', message: 'Kota penerima wajib diisi' }"
                  >
                    <el-select v-model="model.receiver.city_code" placeholder="Pilih asal" class="w-full" value-key="city_code">
                      <el-option
                        v-for="destination in destinations"
                        :key="destination.city_code"
                        :label="destination.city_name"
                        :value="destination"
                      >
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item
                    prop="receiver.postal_code"
                    label="Kode Pos"
                    :rules="{ required: true, trigger: 'blur', message: 'Kode pos wajib diisi' }"
                  >
                    <el-input v-model="model.receiver.postal_code" placeholder="Kode Pos" clearable></el-input>
                  </el-form-item>
                  <el-form-item
                    prop="receiver.address"
                    label="Alamat"
                    :rules="{ required: true, trigger: 'blur', message: 'Alamat wajib diisi' }"
                  >
                    <el-input
                      v-model="model.receiver.address"
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
          <el-form-item
            prop="vehicle"
            label="Kendaraan Pickup"
            :rules="{ required: true, trigger: 'blur', message: 'Kendaraan wajib diisi' }"
          >
            <el-select v-model="model.vehicle" placeholder="Pilih kendaraan" class="w-full">
              <el-option
                v-for="vehicle in vehicles"
                :key="vehicle.value"
                :label="vehicle.label"
                :value="vehicle.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-row :gutter="20" class="mb-2">
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item
                prop="cod"
                label="Jenis Kiriman"
                :rules="{ required: true, trigger: 'blur', message: 'Jenis Pengiriman wajib diisi' }"
              >
                <el-select v-model="model.cod" placeholder="Non COD" class="w-full">
                  <el-option
                    label="Non-COD"
                    :value="serviceType.NON_COD"
                  >
                  </el-option>
                  <el-option
                    label="COD"
                    :value="serviceType.COD"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item
                prop="pickup_type"
                label="PickUp / Drop Off"
                :rules="{ required: true, trigger: 'blur', message: 'Field wajib diisi' }"
              >
                <el-select v-model="model.pickup_type" placeholder="PickUp" class="w-full">
                  <el-option
                    v-for="pick in pickupTypes"
                    :key="pick.value"
                    :label="pick.label"
                    :value="pick.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item prop="agent" label="Pilih Agent">
                <el-select v-model="model.agent" placeholder="Pilih Agent" class="w-full">
                  <el-option
                    v-for="item in agents"
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
              <el-form-item
                prop="weight"
                label="Berat Kiriman (Kg)"
                :rules="{ required: true, trigger: 'blur', message: 'Berat barang wajib diisi' }"
              >
                <el-input v-model="model.weight" placeholder="Kg"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item
                prop="quantity"
                label="Jumlah barang"
                :rules="{ required: true, trigger: 'blur', message: 'Jumlah barang wajib diisi' }"
              >
                <el-input v-model="model.quantity" placeholder="1"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20" class="mb-2">
            <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
              <el-form-item
                prop="goods_descriptions"
                label="Deskripsi Barang"
                :rules="{ required: true, trigger: 'blur', message: 'Deskripsi barang wajib diisi' }"
              >
                <el-input type="textarea" :rows="6" v-model="model.goods_descriptions"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
              <el-form-item prop="handling_instructions" label="Instruksi Khusus">
                <el-input type="textarea" :rows="6" v-model="model.handling_instructions"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20" class="mb-2">
            <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
              <el-form-item
                prop="goods_price"
                label="Harga Barang"
                :rules="{ required: true, trigger: 'blur', message: 'Harga barang wajib diisi' }"
              >
                <el-input placeholder="Harga Barang" v-model="model.goods_price">
                  <template slot="prepend">Rp.</template>
                </el-input>
                <el-checkbox v-model="model.insured" class="mt-4">Asuransi</el-checkbox>
              </el-form-item>
            </el-col>
          </el-row>
          <el-divider></el-divider>
          <div class="flex justify-end">
            <el-button type="primary" class="px-2" @click="submit">Selanjutnya</el-button>
          </div>
        </el-card>
      </el-form>
      <div v-if="currentStep === 1" key="service" class="mt-2">
        <el-button type="text" icon="el-icon-arrow-left" class="mb-2" @click="currentStep -= 1">Informasi Pengiriman</el-button>
        <div v-if="services.length === 0" class="mt-3">
          <el-empty description="Jenis Layanan tidak ditemukan."></el-empty>
        </div>
        <el-row :gutter="20">
          <el-col
            v-for="(price, i) in services" :key="`price-${i}`"
            :xs="12"
            :sm="12"
            :md="12"
            :lg="8"
            :xl="8"
            class="mb-2"
          >
            <button type="button" @click="onClickPrice(price)" class="reset">
              <el-card class="cursor" :class="price.selected && 'bg-gray'">
                <el-row :gutter="16">
                  <el-col :span="7">
                    <el-image style="width: 80px;height; 80px" src="https://upload.wikimedia.org/wikipedia/commons/9/92/New_Logo_JNE.png"></el-image>
                  </el-col>
                  <el-col :span="17">
                    <el-tag type="info" outlined class="service-tag"><strong>{{ price.service_display }}</strong></el-tag>
                    <h2 class="my-1">{{ price.price | formatCurrency }}</h2>
                    <small class="text-gray">Tipe barang: <strong>{{ price.goods_type }}</strong></small>
                  </el-col>
                </el-row>
              </el-card>
            </button>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="16">
            <el-card>
              <h2 class="text-primary mt-0">Summary</h2>
              <el-row :gutter="16" class="mb-2">
                <el-col :span="5">
                  <div class="mr-3">
                    <small class="text-gray"><strong>Pengirim</strong></small>
                    <h4 class="mb-1">{{ selectedShipper.name }}</h4>
                    <small class="block text-gray">{{ selectedShipper.address }}</small>
                    <small class="block text-gray">{{ selectedShipper.city_name }},
                      {{ selectedShipper.postal_code }}</small>
                    <small class="block text-gray">{{ selectedShipper.phone_no }}</small>
                  </div>
                </el-col>
                <el-col :span="5">
                  <div class="mr-3">
                    <small class="text-gray"><strong>Penerima</strong></small>
                    <h4 class="mb-1">{{ selectedReceiver.name }}</h4>
                    <small class="block text-gray">{{ selectedReceiver.address }}</small>
                    <small class="block text-gray">{{ selectedReceiver.city_name }},
                      {{ selectedReceiver.postal_code }}</small>
                    <small class="block text-gray">{{ selectedReceiver.phone_no }}</small>
                  </div>
                </el-col>
              </el-row>
              <h4 class="mb-1 mt-2">Detail</h4>
                <el-table :data="filteredPrice">
                  <el-table-column label="No." width="50"></el-table-column>
                  <el-table-column label="Deskripsi">
                    <template slot-scope="scope">
                      <p class="my-0"><strong>{{ scope.row.service_display }}</strong></p>
                      <small class="text-gray">Tipe barang: {{ scope.row.goods_type }} ({{ model.weight | formatNumber }}kg)</small>
                    </template>
                  </el-table-column>
                  <el-table-column label="Jumlah" width="80">
                    <p class="text-right">
                      <strong>{{ model.quantity | formatNumber }}</strong>
                    </p>
                  </el-table-column>
                  <el-table-column label="Harga (/qty)">
                    <template slot-scope="scope">
                      <p class="text-right">
                        <strong>{{ scope.row.price | formatCurrency }}</strong>
                      </p>
                    </template>
                  </el-table-column>
                  <el-table-column label="Subtotal Harga">
                    <template slot-scope="scope">
                      <p class="text-right">
                        <strong>{{ (Number(scope.row.price) * Number(model.quantity)) | formatCurrency }}</strong>
                      </p>
                    </template>
                  </el-table-column>
                </el-table>
            </el-card>
          </el-col>
          <el-col :span="8">
            <el-card>
              <p class="mb-1 mt-0 text-gray">Saldo Wallet:</p>
              <h1 class="text-right">{{ user.wallet.amount | formatCurrency }}</h1>
              <transition name="el-zoom-in-top" mode="out-in">
                <el-alert
                  v-if="isInsufficientBalance"
                  title="Saldo Anda tidak mencukupi"
                  type="error"
                  :closable="false"
                  class="mb-2"
                  show-icon>
                </el-alert>
              </transition>
              <el-button
                type="primary"
                class="w-full py-2"
                :disabled="isCreateAWBDisabled"
                :loading="isLoading"
                @click="submit"
              >
                <strong>Cetak Resi</strong>
              </el-button>
            </el-card>
          </el-col>
        </el-row>
      </div>
      <div v-if="currentStep === 3" key="congrats" class="mt-2">
        <el-result icon="success">
          <template slot="title">
            <h2 class="mt-0">Nomor Resi Berhasil Dibuat!</h2>
          </template>
          <template slot="extra">
            <p class="mb-2">Berikut nomor resi anda:</p>
            <el-tag type="info">
              <h4 class="my-0">{{ generatedAwb }}</h4>
            </el-tag>
          </template>
        </el-result>
      </div>
    </transition-group>
  </div>
</template>

<script>
import contact from '@/api/contact';
import awb from '@/api/awb';
import {
  contactUsageType,
  vehicle,
  pickUpType,
  serviceType,
} from '@/constants/awb';

export default {
  data() {
    return {
      isLoading: false,
      serviceType,
      currentStep: 0,
      isSearched: false,
      model: {
        shipper: {
          name: '',
          phone_no: '',
          city_code: null,
          city_name: '',
          postal_code: '',
          address: '',
        },
        receiver: {
          name: '',
          phone_no: '',
          city_code: null,
          city_name: '',
          postal_code: '',
          address: '',
        },
        shipper_contact_id: null,
        receiver_contact_id: null,
        shipment_code: null,
        vehicle: null,
        cod: null,
        pickup_type: null,
        agent: null,
        weight: null,
        quantity: 1,
        goods_descriptions: '',
        handling_instructions: '',
        insured: false,
        goods_price: null,
        shipment_amount: 0,
      },
      shipperContact: [],
      receiverContact: [],
      services: [],
      origins: [],
      destinations: [],
      newSender: false,
      newReceipient: false,
      agents: [],
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
      pickupTypes: [
        {
          value: pickUpType.DROP_OFF,
          label: 'Drop-Off',
        },
        {
          value: pickUpType.PICK_UP,
          label: 'PickUp',
        },
      ],
      selectedShipper: {
        name: '',
        phone_no: '',
        postal_code: '',
        city_code: '',
        city_name: '',
        address: '',
      },
      selectedReceiver: {
        name: '',
        phone_no: '',
        postal_code: '',
        city_code: '',
        city_name: '',
        address: '',
      },
      generatedAwb: null,
    };
  },
  computed: {
    computedTarrifTrigger() {
      return (this.model.shipper_contact_id || this.model.shipper.city_code)
        && (this.model.receiver_contact_id || this.model.receiver.city_code)
        && this.model.weight;
    },
    filteredPrice() {
      return this.services.filter((service) => service.selected);
    },
    selectedPriceAmount() {
      const filtered = this.services.filter((service) => service.selected);
      if (filtered.length > 0) {
        return filtered[0].price;
      }
      return 0;
    },
    isCreateAWBDisabled() {
      return this.filteredPrice.length === 0 || this.isInsufficientBalance;
    },
    user() {
      return this.$store.getters['auth/user'];
    },
    isInsufficientBalance() {
      return Number(this.selectedPriceAmount) * Number(this.model.quantity)
        > Number(this.user.wallet.amount);
    },
  },
  watch: {
    computedTarrifTrigger(newVal) {
      if (newVal) {
        this.getTarrifs();
      }
    },
  },
  created() {
    this.init();
  },
  methods: {
    async init() {
      try {
        const shippers = await contact.getContact({ type: contactUsageType.SHIPPER });
        const receivers = await contact.getContact({ type: contactUsageType.RECEIVER });
        const origins = await awb.getDestinations();
        const destinations = await awb.getOrigins();
        this.shipperContact = shippers.data;
        this.receiverContact = receivers.data;
        this.origins = origins.data;
        this.destinations = destinations.data;
      } catch (e) {
        // do nothing
      }
    },
    async getTarrifs() {
      try {
        const data = {
          origin: this.selectedShipper?.city_code || this.model.shipper.city_code,
          destination: this.selectedReceiver?.city_code || this.model.receiver.city_code,
          weight: this.model.weight,
        };
        const services = await awb.checkTarrif(data);
        this.services = services.data.price.map((price) => ({
          ...price,
          selected: false,
        }));
        this.isSearched = true;
      } catch (e) {
        // do nothing
      }
    },
    onHandleChange(event) {
      if (event.contact_type === contactUsageType.RECEIVER) {
        this.selectedReceiver = { ...event };
      } else {
        this.selectedShipper = { ...event };
      }
    },
    async submit() {
      switch (this.currentStep) {
        case 0:
          this.$refs.form.validate((valid) => {
            if (valid) {
              this.currentStep += 1;
            }
          });
          break;
        case 1:
          await this.generateAirwayBill();
          break;
        default:
          break;
      }
    },
    onClickPrice(price) {
      this.services = this.services.map((item) => ({
        ...item,
        selected: price.service_code === item.service_code,
      }));
    },
    async generateAirwayBill() {
      this.isLoading = true;
      try {
        const service = this.services.filter((item) => item.selected)[0];
        const { shipper, receiver } = this.model;
        const payload = {
          shipper_contact_id: this.model.shipper_contact_id?.id,
          receiver_contact_id: this.model.receiver_contact_id?.id,
          vehicle: this.model.vehicle,
          shipment_code: service.service_code,
          goods_descriptions: this.model.goods_descriptions,
          goods_price: this.model.goods_price,
          handling_instructions: this.model.handling_instructions,
          quantity: this.model.quantity,
          weight: this.model.weight,
          pickup_type: this.model.pickup_type,
          is_cod: this.model.cod === serviceType.COD,
          cod_amount: 0,
          insured: this.model.insured,
          shipper: !this.model.shipper_contact_id || {
            name: shipper.name,
            phone_no: shipper.phone_no,
            city_code: shipper.city_code?.city_code,
            city_name: shipper.city_code?.city_name,
            postal_code: shipper.postal_code,
            address: shipper.address,
          },
          receiver: !this.model.receiver_contact_id || {
            name: receiver.name,
            phone_no: receiver.phone_no,
            city_code: receiver.city_code?.city_code,
            city_name: receiver.city_code?.city_name,
            postal_code: receiver.postal_code,
            address: receiver.address,
          },
        };
        const res = await awb.generateAWB(payload);
        this.generatedAwb = res.data.cnote_no;
        await this.$store.dispatch('auth/introspect');
        this.currentStep += 2;
        this.$notify({
          title: 'Sukses',
          message: 'Nomor Resi berhasil dibuat',
          type: 'success',
        });
      } catch (e) {
        // do nothing
      }
      this.isLoading = false;
    },
  },
};
</script>
