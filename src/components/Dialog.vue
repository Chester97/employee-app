<template>
  <v-dialog v-model="dialog" max-width="500px">
    <template v-slot:activator="{ on }">
      <v-btn icon dark v-on="on">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-card-text>
        <v-container>
          <v-row>
            <form class="col-12">
              <v-text-field
                v-model="name"
                :error-messages="nameErrors"
                :counter="15"
                label="Name"
                required
                @input="$v.name.$touch()"
                @blur="$v.name.$touch()"
              ></v-text-field>
              <v-text-field
                v-model="surname"
                :error-messages="surnameErrors"
                :counter="25"
                label="Surname"
                required
                @input="$v.surname.$touch()"
                @blur="$v.surname.$touch()"
              ></v-text-field>
              <v-text-field
                v-model="salary"
                :error-messages="salaryErrors"
                :counter="10"
                label="Salary"
                required
                @input="$v.salary.$touch()"
                @blur="$v.salary.$touch()"
              ></v-text-field>
              <v-text-field
                v-model="currency"
                :error-messages="currencyErrors"
                :counter="3"
                label="Currency"
                required
                @input="$v.currency.$touch()"
                @blur="$v.currency.$touch()"
              ></v-text-field>
              <v-select
                v-model="select"
                :items="slots"
                :error-messages="selectErrors"
                label="Section"
                required
                @change="$v.select.$touch()"
                @blur="$v.select.$touch()"
              ></v-select>
            </form>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn class="mr-4" @click="submit">Add</v-btn>
        <v-btn @click="clear">Clear</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { validationMixin } from 'vuelidate';
import {
  required,
  maxLength,
  minLength,
  alpha,
  numeric,
} from 'vuelidate/lib/validators';

export default {
  name: 'Dialog',
  mixins: [validationMixin],
  props: ['addEmployee', 'slots'],
  validations: {
    name: {
      required,
      maxLength: maxLength(15),
      minLength: minLength(3),
      alpha,
    },
    surname: { required, maxLength: maxLength(25), minLength: minLength(5) },
    salary: { required, numeric, maxLength: maxLength(10) },
    currency: {
      required,
      alpha,
      maxLength: maxLength(3),
      minLength: minLength(3),
    },
    select: { required },
  },
  data: () => {
    return {
      name: '',
      surname: '',
      salary: '',
      currency: '',
      select: null,
      dialog: false,
    };
  },
  methods: {
    submit() {
      this.$v.$touch();
      if (!this.$v.$error) {
        const worker = {
          name: this.name,
          surname: this.surname,
          salary: this.salary + ' ' + this.currency.toUpperCase(),
          section: this.select,
        };
        this.addEmployee(worker);
        this.close();
      }
    },
    clear() {
      this.$v.$reset();
      this.name = '';
      this.surname = '';
      this.salary = '';
      this.currency = '';
      this.select = null;
    },
    close() {
      this.clear();
      this.dialog = false;
    },
  },
  computed: {
    selectErrors() {
      if (!this.$v.select.$dirty) return [];
      return [!this.$v.select.required && 'Item is required'].filter(Boolean);
    },
    nameErrors() {
      if (!this.$v.name.$dirty) return [];
      return [
        !this.$v.name.maxLength && 'Name must be at most 15 characters long',
        !this.$v.name.minLength && 'Name must be at least 3 characters long',
        !this.$v.name.alpha && 'Name accepts only alphabet characters',
        !this.$v.name.required && 'Name is required.',
      ].filter(Boolean);
    },
    surnameErrors() {
      if (!this.$v.surname.$dirty) return [];
      return [
        !this.$v.surname.maxLength &&
          'Surname must be at most 25 characters long',
        !this.$v.surname.minLength &&
          'Surname must be at least 5 characters long',
        !this.$v.surname.required && 'Surname is required.',
      ].filter(Boolean);
    },
    salaryErrors() {
      if (!this.$v.salary.$dirty) return [];
      return [
        !this.$v.salary.maxLength &&
          'Salary must be at most 10 characters long',
        !this.$v.salary.numeric && 'Salary must be a numeric type',
        !this.$v.salary.required && 'Salary is required.',
      ].filter(Boolean);
    },
    currencyErrors() {
      if (!this.$v.currency.$dirty) return [];
      return [
        !this.$v.currency.maxLength &&
          'Currency must be exact 3 characters long',
        !this.$v.currency.minLength &&
          'Currency must be exact 3 characters long',
        !this.$v.currency.alpha && 'Currency accepts only alphabet characters',
        !this.$v.currency.required && 'Currency is required.',
      ].filter(Boolean);
    },
  },
  watch: {
    dialog() {
      if (!this.dialog) {
        this.clear();
      }
    },
  },
};
</script>

<style></style>
