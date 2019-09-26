<template>
  <svg
    v-on="$listeners"
    xmlns="http://www.w3.org/2000/svg"
    :width="width"
    :height="height"
    viewBox="0 0 24 28"
    @mouseover="onMouseover"
    @mouseleave="onMouseleave"
  >
    <g :fill="color">
      <slot />
    </g>
  </svg>
</template>

<script>
export default {
  props: {
    iconName: {
      type: String,
      default: "box"
    },
    width: {
      type: [Number, String],
      default: 18
    },
    height: {
      type: [Number, String],
      default: 18
    },
    iconColor: {
      type: String,
      default: "#757575"
    },
    activeColor: {
      type: String
    }
  },
  data() {
    return {
      color: this.iconColor
    };
  },
  methods: {
    onMouseover() {
      this.color = this.activeColor || this.$vuetify.theme.themes.light.primary;
    },
    onMouseleave() {
      this.color = this.iconColor;
    }
  }
};
</script>

<style scoped>
svg {
  cursor: pointer;
}
g {
  transition: all 0.2s;
}
</style>
