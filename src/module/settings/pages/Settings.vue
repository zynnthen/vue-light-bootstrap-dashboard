<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <card class="card-plain">
            <template slot="header">
              <h4 class="card-title">Threshold Settings</h4>
              <!-- <p class="card-category">Here is a subtitle for this table</p> -->
            </template>
            <div class="table-responsive">
              <div class="m-1">
                <b-form-input
                  v-model="text"
                  placeholder="Search"
                ></b-form-input>
                <div>
                  <b-button
                    class="btn m-1"
                    size="sm"
                    variant="outline-primary"
                    @click="onSearchStock()"
                  >
                    Search
                  </b-button>
                  <b-button
                    class="btn m-1"
                    size="sm"
                    variant="info"
                    @click="onUpdateStock()"
                  >
                    Import Stock CSV
                  </b-button>
                </div>
              </div>
              <table class="table">
                <thead>
                  <slot name="columns">
                    <tr>
                      <th v-for="column in table.columns" :key="column">
                        {{ column.toUpperCase() }}
                      </th>
                    </tr>
                  </slot>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in table.data" :key="index">
                    <slot :row="item">
                      <td>{{ item.description }}</td>
                      <td>{{ item.min }}</td>
                      <td>{{ item.max }}</td>
                      <td>
                        <b-button
                          class="btn m-1"
                          size="sm"
                          variant="warning"
                          @click="onEditStock(item)"
                        >
                          Edit
                        </b-button>
                      </td>
                    </slot>
                  </tr>
                </tbody>
              </table>
            </div>
          </card>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
const tableColumns = ["description", "min", "max", ""];

export default {
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
            description: "Station A",
            min: 30,
            max: 50,
          },
          {
            description: "Station B",
            min: 30,
            max: 100,
          },
          {
            description: "Station C",
            min: 30,
            max: 100,
          },
          {
            description: "Station D",
            min: 30,
            max: 200,
          },
        ],
      },
    };
  },
  methods: {},
};
</script>
<style></style>
