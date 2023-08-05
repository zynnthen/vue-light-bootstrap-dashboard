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
                  <label>Max 31 days in/out range for last 90 days</label>
                </div>
                <date-picker
                  v-model="start"
                  class="m-1"
                  type="datetime"
                  valueType="timestamp"
                ></date-picker>
                <date-picker
                  v-model="end"
                  class="m-1"
                  type="datetime"
                  valueType="timestamp"
                ></date-picker>
                <b-button
                  class="btn m-1"
                  size="sm"
                  variant="outline-primary"
                  @click="setThisMonth()"
                >
                  This month
                </b-button>
                <!-- <b-form-checkbox-group
                  id="checkbox-scanner-group"
                  v-model="selected"
                  :options="scanners"
                  name="scanners"
                >
                </b-form-checkbox-group> -->
                <div>
                  <b-button
                    class="btn m-1"
                    size="sm"
                    variant="outline-primary"
                    @click="onDisplayTransactions()"
                  >
                    Display Transactions
                  </b-button>
                  <b-button
                    class="btn m-1"
                    size="sm"
                    variant="info"
                    @click="onDownloadCsv()"
                  >
                    Download CSV
                  </b-button>
                </div>
              </div>
              <b-tabs nav-class="filter-tab">
                <b-tab title="Detailed Transaction" active>
                  <l-table
                    class="table-hover"
                    :columns="table.columns"
                    :data="table.data"
                  >
                  </l-table>
                </b-tab>
                <!-- <b-tab title="Summary">
                  <l-table
                    class="table-hover"
                    :columns="tableSummary.columns"
                    :data="tableSummary.data"
                  >
                  </l-table>
                </b-tab> -->
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
import CONSTANTS from "src/utils/constants";
import { getTransactions } from "src/module/transactions/api/transaction-api";
import { getSummarizedTransactions } from "src/module/transactions/api/transaction-api";

import LTable from "src/components/Table.vue";
import Card from "src/components/Cards/Card.vue";
const tableColumns = [
  "createdAt",
  "transactionId",
  "item no",
  "description",
  "a",
  "b",
  "c",
  "d",
  "total time",
];
const tableSummaryColumns = [
  "description",
  "barcode",
  "carry forward",
  "in",
  "out",
  "balance",
];

export default {
  components: {
    DatePicker,
    LTable,
    Card,
  },
  data() {
    return {
      start: "",
      end: "",
      selected: [],
      scanners: [],
      table: {
        columns: [...tableColumns],
        data: [
          {
            createdAt: "2:55pm 20-Jun-2023",
            transactionId: 1,
            "item no": "AA12321",
            description: "Screw Driver",
            a: "10 mins",
            b: "50 mins",
            c: "20 mins",
            d: "30 mins",
            "total time": "110 mins",
          },
          {
            createdAt: "2:55pm 20-Jun-2023",
            transactionId: 2,
            "item no": "BB12321",
            description: "Hammer",
            a: "45 mins",
            b: "37 mins",
            c: "20 mins",
            d: "138 mins",
            "total time": "240 mins",
          },
        ],
      },
      tableSummary: {
        columns: [...tableSummaryColumns],
        data: [
          {
            description: "Screw Driver",
            barcode: "32132131",
            "carry forward": 10,
            in: 5,
            out: 5,
            balance: 5,
          },
        ],
      },
    };
  },
  beforeMount() {
    this.initScanners();
  },
  methods: {
    initScanners() {
      // for (var i = 1; i <= 2; i++) {
      //   var index = i;
      //   if (index < 10) {
      //     index = "0" + index;
      //   }
      //   this.selected.push("RF" + index);
      //   this.scanners.push("RF" + index);
      // }
      for (var i = 1; i <= 24; i++) {
        var index = i;
        if (index < 10) {
          index = "0" + index;
        }
        this.selected.push("Forklift" + index);
        this.scanners.push("Forklift" + index);
      }
    },
    setThisMonth() {
      // Get current date
      const currentDate = new Date();

      // Get first day of the month
      const firstDayOfMonth = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        1
      );
      // Set time to 12:00 AM (midnight)
      firstDayOfMonth.setHours(0, 0, 0, 0);
      // Get timestamp
      const firstDayTimestamp = firstDayOfMonth.getTime();

      // Get last day of the month
      const lastDayOfMonth = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() + 1,
        0
      );
      // Set time to 11:59 PM
      lastDayOfMonth.setHours(23, 59, 0, 0);
      // Get timestamp
      const lastDayTimestamp = lastDayOfMonth.getTime();

      this.start = firstDayTimestamp; // Timestamp of the first day at 12:00 AM
      this.end = lastDayTimestamp; // Timestamp of the last day at 11:59 PM
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
            this.table.data = data;
          }
        })
        .catch((err) => console.error(err));

      getSummarizedTransactions(data.start, data.end)
        .then((response) => {
          if (response.status === 200) {
            const { data } = response.data;
            this.tableSummary.data = data;
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
  },
};
</script>
<style></style>
