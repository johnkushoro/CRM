// cypress/e2e/dataStore.js
export default class DataStore {
    constructor() {
        this.storedValues = {};
    }

    setValue(key, value) {
        this.storedValues[key] = value;
    }

    getValue(key) {
        return this.storedValues[key];
    }
}

export const dataStore = new DataStore();

