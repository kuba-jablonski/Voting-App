<template>
  <div>
    <div class="option" v-for="option in options" :key="option.option">
      <span>{{ option.option }}</span>
      <div class="bar white--text" ref="bars">
        {{ option.count }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["options", "loaded"],
  computed: {
    highestCount() {
      return Math.max(...this.options.map(o => o.count));
    }
  },
  methods: {
    animate(ref, targetWidth) {
      if (targetWidth < 1) return;
      let width = 0;
      let id = setInterval(() => {
        if (width >= targetWidth) {
          clearInterval(id);
        } else {
          width++;
          ref.style.width = width + "%";
        }
      }, 10);
    }
  },
  watch: {
    loaded(val) {
      if (val) {
        this.options.forEach((o, i) => {
          this.animate(this.$refs.bars[i], (o.count / this.highestCount) * 100);
        });
      }
    }
  }
};
</script>

<style scoped>
.bar {
  height: 20px;
  width: 20px;
  background-color: red;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-right: 6px;
  margin-bottom: 20px;
  font-size: 14px;
}
</style>
