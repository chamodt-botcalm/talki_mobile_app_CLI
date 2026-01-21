/**
 * Central place for environment/config values.
 * Update these when your backend IP/port changes.
 *
 * Android Emulator: http://10.0.2.2:3001
 * Real Device:      http://YOUR_PC_IP:3001
 * iOS Simulator:    http://localhost:3001
 */
export const API_BASE_URL = 'http://10.231.198.74:3001'; // Real Device
export const API_TIMEOUT_MS = 10000;

// If you use socket.io, usually same host/port as API:
export const SOCKET_URL = API_BASE_URL;
