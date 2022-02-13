# ICW Test Chat Application

## Server Setup
Go to server folder
```bash
cd server
```
Install all dependencies
```bash
npm install
```
Update ENV (.env.example)
```
DB_HOST=<<Database Host>>
DB_PORT=<<Database Port>>
DB_USER=<<Database Username>>
DB_PASS=<<Database Password>>
DB_NAME=<<Database Name>>
```

Rename .env.example to .env

For the first run, we must use **—-alter** to generate collections in MongoDB.
```bash
sails lift --alter
```
Next times
```bash
sails lift
```

## Client Setup

Go to client folder
```bash
cd client
```
Install all dependencies
```bash
npm install
```
Start React Application
```bash
npm start
```

## Tech Stack
**Client:** React, React-Bootstrap

**Server:** Node, SailsJS, SocketIO
