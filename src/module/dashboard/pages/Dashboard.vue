<template>
    <div class="content">
        <div class="container-fluid">
            <div class="row">
                <div class="col-xl-6 col-md-6">
                    <stats-card>
                        <div slot="header" class="icon-warning">
                            <i class="nc-icon nc-chart text-warning"></i>
                        </div>
                        <div slot="content">
                            <p class="card-category">Barcode 1</p>
                            <h4 class="card-title">105GB</h4>
                        </div>
                        <div slot="footer">
                            <i class="fa fa-calendar-o"></i>Last updated
                        </div>
                    </stats-card>
                </div>

                <div class="col-xl-6 col-md-6">
                    <stats-card>
                        <div slot="header" class="icon-success">
                            <i class="nc-icon nc-light-3 text-success"></i>
                        </div>
                        <div slot="content">
                            <p class="card-category">Barcode 2</p>
                            <h4 class="card-title">$1,345</h4>
                        </div>
                        <div slot="footer">
                            <i class="fa fa-calendar-o"></i>Last updated
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

export default {
    components: {
        StatsCard
    },
    created() {
        SocketioService.setupSocketConnection();
        SocketioService.barcodeListener('barcode1');
        SocketioService.barcodeListener('barcode2');
    },
    beforeUnmount() {
        SocketioService.disconnect();
    }
}
</script>
<style></style>
  