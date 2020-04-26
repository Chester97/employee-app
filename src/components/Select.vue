<template>
  <v-col cols="6">
    <div>
      <p class="font-weight-medium text-center">Filter by department.</p>
    </div>
    <v-select
      :items="items"
      v-model="department"
      label="Choose a section"
      @change="handleSelect"
      clearable
    >
    </v-select>
  </v-col>
</template>

<script>
export default {
  name: 'Select',
  props: ['items', 'setDepartmentPick'],
  data: () => {
    return {
      department: null,
    };
  },
  methods: {
    handleSelect() {
      this.setDepartmentPick(this.department);
    },
  },
};
</script>

<style></style>
