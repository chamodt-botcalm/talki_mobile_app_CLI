import io from 'socket.io-client';
import { SOCKET_URL } from '../config/env';

class SocketService {
  private socket: any = null;

  connect() {
    this.socket = io(SOCKET_URL, { transports: ['websocket'] });
    return this.socket;
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  onMessage(callback: (message: any) => void) {
    if (this.socket) {
      this.socket.on('message', callback);
    }
  }

  onCall(callback: (data: any) => void) {
    if (this.socket) {
      this.socket.on('call', callback);
    }
  }
}

export default new SocketService();
