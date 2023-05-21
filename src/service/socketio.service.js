import { io } from 'socket.io-client';
import CONSTANTS from 'src/utils/constants';

class SocketioService {
    socket;
    constructor() { }

    setupSocketConnection() {
        this.socket = io(CONSTANTS.APP_SOCKET_ENDPOINT);

        this.socket.emit('my message', 'Hello there from Vue.');
    }

    barcodeListener(key) {
        this.socket.on(key, (data) => {
            console.log(data);
        });
    }

    disconnect() {
        if (this.socket) {
            this.socket.disconnect();
        }
    }
}

export default new SocketioService();