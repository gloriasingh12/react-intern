{
  "manifest_version": 3,
  "name": "SOIT Productivity Tracker",
  "version": "1.0",
  "permissions": ["tabs", "storage", "history"],
  "action": {
    "default_popup": "index.html"
  },
  "background": {
    "service_worker": "background.js"
  }
}
