# Campus Notifications Microservice

Simple notification system for students.

## Features
- Get the notifications
- Mark them as read
- We have to unread count
- Filter them by type
- Prioritizing the inbox

## Tech Used
- Node.js
- Express.js
- PostgreSQL
- Redis
- WebSocket

## API Routes

```bash
GET /api/notifications
PUT /api/notifications/:id/read
GET /api/notifications/unread/count
GET /api/notifications?type=Placement
```

## Database
Had used PostgreSQL because it helps with structed format.

## Scaling Ideas
- Pagination
- DB partitioning

## Priority Inbox
Notifications will get sorted by:
1. Placement
2. Result
3. Event

