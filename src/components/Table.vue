<template>
  <v-card flat>
    <v-card-title>
      {{ tableTitle }}
      <v-spacer></v-spacer>
      <v-col cols="3">
        <v-text-field
          v-if="employeeTable"
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
      </v-col>
    </v-card-title>
    <v-data-table
      v-if="employeeTable"
      :headers="headers"
      :search="search"
      :items="items"
      :items-per-page="5"
    ></v-data-table>
    <v-data-table
      v-else
      :headers="headers"
      :items="items"
      hide-default-footer
    ></v-data-table>
  </v-card>
</template>

<script>
export default {
  name: 'Table',
  props: ['tableTitle', 'employeeTable', 'headers', 'items'],
  data: () => {
    return {
      search: '',
    };
  },
};
</script>

<style></style>
