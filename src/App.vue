<template>
  <v-app>
    <v-content>
      <Navbar :addEmployee="addEmployee" :slots="slots" />
      <v-container>
        <v-row>
          <Select v-bind:items="slots" :setDepartmentPick="setDepartmentPick" />
          <RangeSlider v-bind:salary="initSalary" :setRangeValues="setRangeValues" />
        </v-row>
        <Table
          tableTitle="New Table"
          v-bind:headers="headers"
          v-bind:items="filteredItems"
          employeeTable="true"
        />
        <div class="row">
          <v-col cols="9">
            <h1>Total sum of all departments</h1>
            <span>{{ totalSum }}</span>
          </v-col>
          <v-col cols="3">
            <Table
              tableTitle="Summary Table"
              v-bind:headers="headersSummary"
              v-bind:items="sumPerPage"
            />
          </v-col>
        </div>
      </v-container>
    </v-content>
  </v-app>
</template>
<script>
import Navbar from "./components/Navbar";
import RangeSlider from "./components/RangeSlider";
import Select from "./components/Select";
import Table from "./components/Table";
import EmployeeService from "./services/employee.service";

export default {
  name: "App",
  components: {
    Navbar,
    RangeSlider,
    Select,
    Table,
  },
  data: () => {
    return {
      allItems: EmployeeService.convertInitData(),
      headers: null,
      slots: EmployeeService.getAllSections(),
      targetItems: null,
      headersSummary: null,
      department: null,
      initSalary: { minSalary: 1000, maxSalary: 5000 },
      rangeFilter: null,
      totalSum: 0,
      sumPerPage: null,
    };
  },
  created() {
    this.targetItems = this.allItems;
    this.headers = EmployeeService.getHeaders(this.allItems);
    this.initSalary = EmployeeService.getMaxMinSalary(this.allItems);
    this.totalSum = EmployeeService.calculateTotalSum(this.targetItems);
    this.sumPerPage = EmployeeService.calculateSumPerDepartment(
      this.targetItems
    );
    this.headersSummary = EmployeeService.getHeaders(this.sumPerPage);
    this.$on("setDepartmentPick", data => (this.department = data));
    this.$on("addEmployee", data => {
      this.targetItems = [data, ...this.targetItems];
      this.updateView();
    });
    this.$on("setRangeValues", data => {
      const [min, max] = data;
      return (this.rangeFilter = { min, max });
    });
  },
  methods: {
    setRangeValues(range) {
      this.$emit("setRangeValues", range);
    },
    setDepartmentPick(data) {
      this.$emit("setDepartmentPick", data);
    },
    addEmployee(data) {
      this.$emit("addEmployee", data);
    },
    updateView() {
      this.initSalary = EmployeeService.getMaxMinSalary(this.targetItems);
      this.totalSum = EmployeeService.calculateTotalSum(this.targetItems);
      this.sumPerPage = EmployeeService.calculateSumPerDepartment(
        this.targetItems
      );
    },
  },
  computed: {
    filteredItems() {
      let min = this.initSalary.minSalary;
      let max = this.initSalary.maxSalary;
      if (this.rangeFilter) {
        min = this.rangeFilter.min;
        max = this.rangeFilter.max;
      }
      const items = this.targetItems.filter(
        worker =>
          worker.salary.split(" ")[0] >= min &&
          worker.salary.split(" ")[0] <= max
      );
      if (this.department) {
        return items.filter(worker => worker.section === this.department);
      }
      return items;
    },
  },
};
</script>
