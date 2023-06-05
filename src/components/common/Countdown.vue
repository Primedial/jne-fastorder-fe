<template>
  <div class="text-center">
    <p v-if="isVisible" class="text-danger">
      <strong>{{ countdown.hours }}:{{ countdown.minutes }}:{{ countdown.seconds }}</strong>
    </p>
    <p v-else class="text-center">
      <strong>-</strong>
    </p>
  </div>
</template>

<script>
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

dayjs.extend(duration);

export default {
  props: {
    data: {
      required: true,
    },
    status: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      tempTimer: '',
      interval: null,
      timer: null,
      remainingTime: null,
      countdown: {
        hours: null,
        minutes: null,
        seconds: null,
      },
      diff: 0,
    };
  },
  computed: {
    isVisible() {
      return this.status === 1 && this.diff >= 0;
    },
  },
  mounted() {
    this.startCountdown();
  },
  methods: {
    startCountdown() {
      const targetDate = dayjs(this.data);
      const timer = setInterval(() => {
        const now = dayjs();
        this.diff = targetDate.diff(now);
        const duration = dayjs.duration(this.diff);
        const vm = this;

        this.countdown = {
          days: vm.formatTime(duration.days()),
          hours: vm.formatTime(duration.hours()),
          minutes: vm.formatTime(duration.minutes()),
          seconds: vm.formatTime(duration.seconds()),
        };

        if (this.diff <= 0) {
          clearInterval(timer);
          if (this.status === 1) {
            this.$emit('timeout');
          }
        }
      }, 1000);
    },
    formatTime(val) {
      return String(val).padStart(2, '0');
    },
  },
  beforeDestroy() {
    clearInterval(this.interval);
  },
};
</script>
