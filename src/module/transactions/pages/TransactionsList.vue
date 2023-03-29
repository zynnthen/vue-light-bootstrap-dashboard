<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <card class="card-plain">
            <template slot="header">
              <h4 class="card-title">Table on Plain Background</h4>
              <p class="card-category">Here is a subtitle for this table</p>
            </template>
            <div class="table-responsive">
              <l-table class="table-hover" :columns="table.columns" :data="table.data">
              </l-table>
            </div>
          </card>
        </div>

      </div>
    </div>
  </div>
</template>
<script>
import { getTransactions } from "src/module/transactions/api/transaction-api";

import LTable from 'src/components/Table.vue'
import Card from 'src/components/Cards/Card.vue'
const tableColumns = ['transactionId', 'scanner', 'barcode', 'createdAt']

export default {
  components: {
    LTable,
    Card
  },
  data() {
    return {
      table: {
        columns: [...tableColumns],
        data: []
      }
    }
  },
  beforeMount() {
    getTransactions()
      .then((response) => {
        if (response.status === 200) {
          const { data } = response.data;
          this.table.data = data
        }
      })
      .catch((err) => console.error(err))
      .finally(() => (this.isLoading = false));
  },

}
</script>
<style></style>
  