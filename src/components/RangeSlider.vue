<template>
  <v-col cols="6">
    <div>
      <p class="font-weight-medium text-center">Filter by salary.</p>
    </div>
    <v-range-slider
      v-model="range"
      :max="max"
      :min="min"
      hide-details
      @end="handleEnd"
      class="align-center pt-2"
      step="50"
    >
      <template v-slot:prepend>
        <v-text-field
          :value="range[0]"
          class="mt-0 pt-0"
          hide-details
          single-line
          type="number"
          style="width: 60px;"
          readonly
        ></v-text-field>
      </template>
      <template v-slot:append>
        <v-text-field
          :value="range[1]"
          class="mt-0 pt-0"
          hide-details
          single-line
          type="number"
          style="width: 60px;"
          readonly
        ></v-text-field>
      </template>
    </v-range-slider>
  </v-col>
</template>

<script>
export default {
  name: 'RangeSlider',
  props: ['salary', 'setRangeValues', 'initialSalary'],
  data: () => {
    return {
      min: 1,
      max: 100,
      range: [1, 100],
    };
  },
  beforeMount() {
    this.range = [this.salary.minSalary, this.salary.maxSalary];
    this.min = this.salary.minSalary;
    this.max = this.salary.maxSalary;
  },
  methods: {
    handleEnd() {
      this.setRangeValues(this.range);
    },
    updateRange(value) {
      this.range = [value, this.range[1]];
    },
  },
  watch: {
    salary() {
      this.min = this.salary.minSalary;
      this.max = this.salary.maxSalary;
      this.range = [this.min, this.max];
    },
  },
};
</script>

<style></style>
