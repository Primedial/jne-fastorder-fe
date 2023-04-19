<template>
  <el-input v-bind="$attrs" ref="field" :value="formattedValue" @input="onInput">
    <template slot="prepend">
      <slot name="prepend"></slot>
    </template>
    <template slot="append">
      <slot name="append"></slot>
    </template>
  </el-input>
</template>

<script>
export default {
  props: {
    value: {
      type: [String, Number],
    },
    formatted: {
      default: true,
    },
  },
  computed: {
    formattedValue() {
      const value = String(this.value).replace(/[^\d]/g, '');
      if (this.formatted) {
        const number = Number(value);
        return number.toLocaleString('id-ID');
      }
      return value;
    },
  },
  mounted() {
    this.$refs.field.$el.children[0].addEventListener('keypress', this.onKeypress);
    if (!this.value) {
      if (this.formatted) {
        this.onInput(0);
      }
    }
  },
  methods: {
    onKeypress(event) {
      if (event.which < 48 || event.which > 57) {
        event.preventDefault();
      }
    },
    onInput(value) {
      const val = String(value).replace(/[^\d]/g, '');
      const finalVal = this.formatted ? parseFloat(val) : val;
      this.$emit('input', finalVal);
    },
  },
};
</script>
