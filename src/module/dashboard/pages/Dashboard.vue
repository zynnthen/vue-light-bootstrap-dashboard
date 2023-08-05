<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div
          class="col-xl-3 col-md-3"
          v-for="(item, index) in randomItems"
          :key="index"
        >
          <stats-card :style="{ 'background-color': item.color }">
            <div slot="content">
              <p class="card-category" style="color: black">
                Forklift {{ index + 1 }}
              </p>
              <!-- <h4 class="card-title">
                {{ barcode1 }}{{ Math.floor(Math.random() * 200000000) }}
              </h4> -->
              <h5 class="card-title">Station: {{ item.letter }}</h5>
              <h6 class="card-title">Time: {{ item.timeSpent }} mins</h6>
            </div>
            <!-- <div slot="footer">
              <i class="fa fa-calendar-o"></i>Last updated:
              {{ barcode1LastUpdated }}
            </div> -->
            <div slot="footer">
              <i class="fa fa-calendar-o"></i>
              <span style="color: black">
                Last updated: {{ getRandomTime() }}
              </span>
            </div>
          </stats-card>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import SocketioService from "src/service/socketio.service.js";
import StatsCard from "src/components/Cards/StatsCard.vue";
import { io } from "socket.io-client";
import CONSTANTS from "src/utils/constants";

export default {
  components: {
    StatsCard,
  },
  data() {
    return {
      barcode1: "",
      barcode1LastUpdated: "",
      barcode2: "",
      barcode2LastUpdated: "",
      socket: io(CONSTANTS.APP_SOCKET_ENDPOINT),
      randomItems: [],
    };
  },
  created() {
    // SocketioService.setupSocketConnection();
    // SocketioService.barcodeListener('barcode1');
    // SocketioService.barcodeListener('barcode2');

    for (var i = 0; i < 24; i++) {
      this.randomItems.push(this.generateRandomData());
    }

    this.socket.on("barcode1", (data) => {
      console.log(data);
      this.barcode1 = data;
      this.barcode1LastUpdated = new Date().toLocaleTimeString();
    });

    this.socket.on("barcode2", (data) => {
      console.log(data);
      this.barcode2 = data;
      this.barcode2LastUpdated = new Date().toLocaleTimeString();
    });
  },
  beforeUnmount() {
    SocketioService.disconnect();
  },
  methods: {
    getRandomTime() {
      var date = new Date(2023, 5, 20); // June is represented by 5 since months are zero-based in JavaScript
      var startHour = 13; // 1 PM
      var endHour = 17; // 5 PM
      var randomHour =
        Math.floor(Math.random() * (endHour - startHour + 1)) + startHour;
      var randomMinute = Math.floor(Math.random() * 60);

      date.setHours(randomHour, randomMinute);

      return date.toLocaleString("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
    },
    generateRandomData() {
      var timeMappings = [
        { color: "white", minTime: 0, maxTime: 0 },
        { color: "lightgreen", minTime: 1, maxTime: 59 },
        { color: "lightcoral", minTime: 60, maxTime: 120 },
      ];

      var colorMappings = {
        white: 0,
        lightgreen: 1,
        lightcoral: 2,
      };

      var randomTimeMapping =
        timeMappings[Math.floor(Math.random() * timeMappings.length)];
      var randomColor = randomTimeMapping.color;
      var randomTime =
        Math.floor(
          Math.random() *
            (randomTimeMapping.maxTime - randomTimeMapping.minTime + 1)
        ) + randomTimeMapping.minTime;

      var randomLetter = "-";
      if (randomColor !== "white") {
        randomLetter = String.fromCharCode(Math.floor(Math.random() * 4) + 65); // Generate random letter from A to D
      }

      return {
        color: randomColor,
        timeSpent: randomTime,
        mappedValue: colorMappings[randomColor],
        letter: randomLetter,
      };
    },
  },
};
</script>
<style></style>
