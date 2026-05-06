# CH.SC.U4CSE23250

Backend project for campus hiring evaluation.

## Features
- CRUD API
- Logging middleware
- Vehicle maintenance scheduler
- Notification priority inbox

## Files

- `app.js` - Express backend
- `logging-middleware/` - Logging functions
- `vehicle_scheduling/scheduler.js` - Vehicle scheduling
- `notification_app_be/priority_inbox.js` - Priority inbox

## Run Project

Install packages:

```bash
npm install
```

Set token:

```bash
export EVAL_TOKEN="TOKEN"
```

Run backend:

```bash
npm start
```

Run scheduler:

```bash
node vehicle_scheduling/scheduler.js
```

Run notifications:

```bash
node notification_app_be/priority_inbox.js
```

Server runs on:

```bash
http://localhost:3000
```