import dataJSON from '../data.json';

class EmployeeService {
  constructor() {
    this.initData = null;
    this.targetItems = null;
    this.convertInitData();
  }

  convertInitData() {
    this.initData = dataJSON.map(item => ({
      name: item.imie,
      surname: item.nazwisko,
      section: item.dzial,
      salary: item.wynagrodzenieKwota + ' ' + item.wynagrodzenieWaluta,
    }));
    return this.initData;
  }

  getHeaders(array) {
    const headers = Object.keys(array[0]).map(item => ({
      text: item.charAt(0).toUpperCase() + item.slice(1),
      value: item,
    }));
    return headers;
  }

  getEmployeesWithCurrency(employees) {
    const currentData = employees.map(item => {
      const currency = item.salary.split(' ');
      return {
        name: item.name,
        surname: item.surname,
        section: item.section,
        salary: currency[0],
        currency: currency[1],
      };
    });
    return currentData;
  }

  employeesWithoutCurreny(employees) {
    const newEmployees = employees.map(item => ({
      name: item.name,
      surname: item.surname,
      section: item.section,
      salary: item.salary + ' ' + item.currency,
    }));
    return newEmployees;
  }

  getMaxMinSalary(employees) {
    const maxSalary = Math.max(
      ...this.getEmployeesWithCurrency(employees).map(i => +i.salary),
      0
    );
    const minSalary = Math.min(
      ...this.getEmployeesWithCurrency(employees).map(i => +i.salary),
      maxSalary
    );
    return {
      minSalary,
      maxSalary
    };
  }

  getAllSections() {
    const allSections = this.initData.map(item => item.section);
    return Array.from(new Set(allSections));
  }

  calculateTotalSum(employees) {
    const convertedEmployees = this.getEmployeesWithCurrency(employees);
    const result = convertedEmployees.reduce((a, b) => a + parseFloat(b.salary), 0);
    return result.toFixed(2);
  }

  calculateSumPerDepartment(employees) {
    const convertedEmployees = this.getEmployeesWithCurrency(employees);
    this.targetItems = convertedEmployees;
    const departments = this.getAllSections();
    const result = departments.map(item => ({
      section: item,
      sum: this.calculateTotalSalary(item),
    }));
    this.targetItems = null;
    return result;
  }

  calculateTotalSalary(section) {
    const result = this.targetItems
      .filter(item => item.section === section)
      .reduce((sum, curr) => sum + parseFloat(curr.salary), 0);
    return result.toFixed(2);
  }
}
export default new EmployeeService();
