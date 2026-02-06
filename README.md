# Echo WebSocket SharedWorker

A demonstration of WebSocket connections using JavaScript SharedWorkers for efficient multi-tab communication.

## 🎯 Overview

This project demonstrates how to use SharedWorkers to manage WebSocket connections across multiple browser tabs, reducing server load and maintaining consistent state.

## 🚀 Features

- **SharedWorker**: Single WebSocket connection shared across all tabs
- **No-Worker Fallback**: Standard WebSocket implementation for comparison
- **Real-time Updates**: Synchronized messages across all open tabs
- **Efficient Resource Usage**: One connection serves multiple tabs

## 📁 Files

| File | Description |
|------|-------------|
| `worker.js` | SharedWorker script managing WebSocket |
| `main.js` | Main application logic |
| `testws.html` | Demo page with SharedWorker |
| `testws_noworker.html` | Demo page without SharedWorker (for comparison) |

## 🛠️ Tech Stack

- **Language:** JavaScript (ES6+)
- **API:** WebSocket API, SharedWorker API
- **Browser Support:** Modern browsers with SharedWorker support

## 🚀 Usage

```bash
# Clone the repository
git clone https://github.com/gmuller-dev/Echo-websocket-sharedworker.git
cd Echo-websocket-sharedworker

# Serve files (any static server works)
python3 -m http.server 8000
# or
npx serve
```

Then open `http://localhost:8000/testws.html` in multiple tabs to see the SharedWorker in action.

## 📊 How It Works

1. **With SharedWorker** (`testws.html`):
   - First tab creates SharedWorker
   - Subsequent tabs connect to existing worker
   - Single WebSocket connection for all tabs
   - Messages broadcast to all connected tabs

2. **Without SharedWorker** (`testws_noworker.html`):
   - Each tab creates its own WebSocket
   - Multiple connections to the same server
   - Good for comparison/testing

## 🔍 Use Cases

- Chat applications
- Real-time dashboards
- Multi-tab synchronized state
- Live notifications

## 📚 Learn More

- [MDN: SharedWorker](https://developer.mozilla.org/en-US/docs/Web/API/SharedWorker)
- [MDN: WebSocket](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket)

---
*Efficient multi-tab communication*
