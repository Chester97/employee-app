<template>
  <v-card color="grey lighten-4" tile flat>
    <v-toolbar dense>
      <v-toolbar-title>Employee App</v-toolbar-title>
      <v-spacer></v-spacer>
      <Dialog :addEmployee="addEmployee" :slots="slots" />
    </v-toolbar>
  </v-card>
</template>

<script>
import Dialog from './Dialog';
export default {
  name: 'Navbar',
  props: ['addEmployee', 'slots'],
  components: {
    Dialog,
  },
  data: () => {
    return {};
  },
};
</script>

<style></style>
