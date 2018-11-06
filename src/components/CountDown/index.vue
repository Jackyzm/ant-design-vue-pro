<template>
    <div>
        <span>
            {{ result }}
        </span>
    </div>
</template>

<script>
export default {
  name: "CountDown",
  mounted() {
    const { lastTime } = this.initTime();
    this.lastTime = lastTime;
    this.tick();
  },
  destroyed() {
    clearTimeout(this.timer);
  },
  watch: {
    target: function(val, oldVal) {
      if (val !== oldVal) {
        clearTimeout(this.timer);
        const { lastTime } = this.initTime();
        this.lastTime = lastTime;
        this.tick();
      }
    }
  },
  props: {
    target: {
      type: Number,
      default: 0
    },
    onEnd: {
      type: Function,
      default: () => {}
    },
    format: {
      type: Function
    }
  },
  computed: {
    result() {
      if (this.format) {
        return this.format(this.lastTime);
      } else {
        const hours = 60 * 60 * 1000;
        const minutes = 60 * 1000;

        const h = Math.floor(this.lastTime / hours);
        const m = Math.floor((this.lastTime - h * hours) / minutes);
        const s = Math.floor((this.lastTime - h * hours - m * minutes) / 1000);

        return `${this.fixedZero(h)}:${this.fixedZero(m)}:${this.fixedZero(s)}`;
      }
    }
  },
  data() {
    return {
      lastTime: "",
      interval: 1000
    };
  },
  methods: {
    initTime() {
      let lastTime = 0;
      let targetTime = 0;
      try {
        if (Object.prototype.toString.call(this.target) === "[object Date]") {
          targetTime = this.target.getTime();
        } else {
          targetTime = new Date(this.target).getTime();
        }
      } catch (e) {
        throw new Error("invalid target prop", e);
      }

      lastTime = targetTime - new Date().getTime();
      return {
        lastTime: lastTime < 0 ? 0 : lastTime
      };
    },
    tick() {
      this.timer = setTimeout(() => {
        if (this.lastTime < this.interval) {
          clearTimeout(this.timer);
          this.lastTime = 0;
          if (this.onEnd) this.onEnd();
        } else {
          this.lastTime -= this.interval;
          this.tick();
        }
      }, this.interval);
    },
    fixedZero(val) {
      return val * 1 < 10 ? `0${val}` : val;
    }
  }
};
</script>
