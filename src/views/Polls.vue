<template>
  <v-container>
    <v-list>
      <v-subheader>REPORTS</v-subheader>
      <v-list-item-group v-model="item">
        <v-list-item v-for="(item, i) in items" :key="i">
          <v-list-item-icon>
            <v-chip>Default</v-chip>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-text="item.text"> </v-list-item-title>
          </v-list-item-content>
          <v-list-item-action>
            <v-list-item-action-text
              >by bob | 2019/09/09</v-list-item-action-text
            >
          </v-list-item-action>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    item: 1,
    items: [
      { text: "Real-Time", icon: "mdi-clock" },
      { text: "Audience", icon: "mdi-account" },
      { text: "Conversions", icon: "mdi-flag" }
    ]
  })
};
</script>

<style></style>
