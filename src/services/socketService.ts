import io from 'socket.io-client';

const SOCKET_URL = 'http://localhost:3000'; // Change to your backend URL

class SocketService {
  private socket: any = null;

  connect() {
    this.socket = io(SOCKET_URL);
    return this.socket;
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  joinRoom(roomName: string) {
    if (this.socket) {
      this.socket.emit('join', roomName);
    }
  }

  sendMessage(message: any) {
    if (this.socket) {
      this.socket.emit('message', message);
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