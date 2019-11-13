<template>
  <div>
    <div class="option" v-for="option in options" :key="option.option">
      <span>{{ option.option }}</span>
      <div
        class="bar"
        :style="{ width: `${(option.count / options[1].count) * 100}%` }"
      >
        {{ option.count }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["options"]
};
</script>

<style scoped>
.bar {
  height: 20px;
  background-color: red;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 5px 10px;
}
</style>
