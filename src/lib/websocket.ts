// WebSocket client stub for real-time notifications
// TODO: Replace with real WebSocket server URL and logic

export function connectWebSocket(onMessage: (msg: any) => void) {
  // TODO: Connect to real WebSocket server
  // Example: const ws = new WebSocket('ws://localhost:3001');
  // ws.onmessage = (event) => onMessage(JSON.parse(event.data));
  // return ws;
  return {
    close: () => {},
  };
} 