<template>
    <div class="content">
        <div class="container-fluid">
            <div class="row">
                <div class="col-xl-6 col-md-6">
                    <stats-card>
                        <div slot="content">
                            <p class="card-category">Barcode 1</p>
                            <h4 class="card-title">{{ barcode1 }}</h4>
                        </div>
                        <div slot="footer">
                            <i class="fa fa-calendar-o"></i>Last updated: {{ barcode1LastUpdated }}
                        </div>
                    </stats-card>
                </div>

                <div class="col-xl-6 col-md-6">
                    <stats-card>
                        <div slot="content">
                            <p class="card-category">Barcode 2</p>
                            <h4 class="card-title">{{ barcode2 }}</h4>
                        </div>
                        <div slot="footer">
                            <i class="fa fa-calendar-o"></i>Last updated: {{ barcode2LastUpdated }}
                        </div>
                    </stats-card>
                </div>

            </div>
        </div>
    </div>
</template>
<script>
import SocketioService from 'src/service/socketio.service.js';
import StatsCard from 'src/components/Cards/StatsCard.vue'
import { io } from 'socket.io-client';
import CONSTANTS from 'src/utils/constants';

export default {
    components: {
        StatsCard
    },
    data() {
        return {
            barcode1: '',
            barcode1LastUpdated: '',
            barcode2: '',
            barcode2LastUpdated: '',
            socket: io(CONSTANTS.APP_SOCKET_ENDPOINT)
        }
    },
    created() {
        // SocketioService.setupSocketConnection();
        // SocketioService.barcodeListener('barcode1');
        // SocketioService.barcodeListener('barcode2');

        this.socket.on('barcode1', (data) => {
            console.log(data);
            this.barcode1 = data;
            this.barcode1LastUpdated = new Date().toLocaleTimeString();;
        });

        this.socket.on('barcode2', (data) => {
            console.log(data);
            this.barcode2 = data;
            this.barcode2LastUpdated = new Date().toLocaleTimeString();;
        });
    },
    beforeUnmount() {
        SocketioService.disconnect();
    }
}
</script>
<style></style>
  