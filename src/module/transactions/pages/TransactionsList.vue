<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <card class="card-plain">
            <template slot="header">
              <h4 class="card-title">Transaction List</h4>
              <!-- <p class="card-category">Here is a subtitle for this table</p> -->
            </template>
            <div class="table-responsive">
              <div class="m-1">
                <div>
                  <label>Max 31 days in/out range</label>
                </div>
                <date-picker v-model="start" class="m-1" type="datetime" valueType="timestamp"></date-picker>
                <date-picker v-model="end" class="m-1" type="datetime" valueType="timestamp"></date-picker>
                <b-form-checkbox-group id="checkbox-scanner-group" v-model="selected" :options="scanners" name="scanners">
                </b-form-checkbox-group>
                <div>
                  <b-button class="btn m-1" size="sm" variant="outline-primary" @click="onDisplayTransactions()">
                    Display Transactions
                  </b-button>
                  <b-button class="btn m-1" size="sm" variant="info" @click="onDownloadCsv()">
                    Download CSV
                  </b-button>
                </div>
              </div>
              <b-tabs nav-class="filter-tab">
                <b-tab title="Detailed Transaction" active>
                  <l-table class="table-hover" :columns="table.columns" :data="table.data">
                  </l-table>
                </b-tab>
                <b-tab title="Summary">
                  <l-table class="table-hover" :columns="tableSummary.columns" :data="tableSummary.data">
                  </l-table>
                </b-tab>
              </b-tabs>
            </div>
          </card>
        </div>

      </div>
    </div>
  </div>
</template>
<script>
import DatePicker from "vue2-datepicker";
import "vue2-datepicker/index.css";
import { isNullOrEmptyString } from "src/utils/general";
import CONSTANTS from "src/utils/constants"
import { getTransactions } from "src/module/transactions/api/transaction-api";
import { getSummarizedTransactions } from "src/module/transactions/api/transaction-api";

import LTable from 'src/components/Table.vue'
import Card from 'src/components/Cards/Card.vue'
const tableColumns = ['transactionId', 'scanner', 'barcode', 'createdAt']
const tableSummaryColumns = ['scanner', 'barcode', 'count']

export default {
  components: {
    DatePicker,
    LTable,
    Card
  },
  data() {
    return {
      start: "",
      end: "",
      selected: [],
      scanners: [],
      table: {
        columns: [...tableColumns],
        data: []
      },
      tableSummary: {
        columns: [...tableSummaryColumns],
        data: []
      }
    }
  },
  beforeMount() {
    this.initScanners();
  },
  methods: {
    initScanners() {
      for (var i = 1; i <= 2; i++) {
        var index = i;
        if (index < 10) {
          index = '0' + index
        }
        this.selected.push('RF' + index);
        this.scanners.push('RF' + index);
      }
    },
    onDisplayTransactions() {
      const data = this.checkStartEndTime();
      if (!data) {
        this.$swal("Error", "Invalid Input", "error");
        return;
      }

      getTransactions(data.start, data.end)
        .then((response) => {
          if (response.status === 200) {
            const { data } = response.data;
            this.table.data = data
          }
        })
        .catch((err) => console.error(err));

      getSummarizedTransactions(data.start, data.end)
        .then((response) => {
          if (response.status === 200) {
            const { data } = response.data;
            this.tableSummary.data = data
          }
        })
        .catch((err) => console.error(err));
    },
    checkStartEndTime() {
      if (isNullOrEmptyString(this.start)) return false;
      if (isNullOrEmptyString(this.end)) return false;

      var start = Math.trunc(this.start / 1000);
      var end = Math.trunc(this.end / 1000);

      if (
        start > end ||
        end - start > CONSTANTS.MAX_DATE_PICKER_TIMESTAMP_RANGE
      ) {
        return false;
      }
      return { start: start, end: end, dayCount: end - start };
    },
  }

}
</script>
<style></style>
  