# React + Go Hello World

Simple full-stack starter:
- `frontend/`: React app (Vite)
- `backend/`: Go API

## Run With Docker (One Command)

From the project root:

```bash
docker compose up --build
```

Open:
- `http://localhost:5173` (frontend via Nginx)
- `http://localhost:8080/api/hello` (API directly)

Stop:

```bash
docker compose down
```

## Run Locally (Without Docker)

1. Start the Go backend:

```bash
cd backend
go run .
```

2. In a second terminal, start the React frontend:

```bash
cd frontend
npm install
npm run dev
```

3. Open:
- `http://localhost:5173` (frontend)
- `http://localhost:8080/api/hello` (API directly)

The React app fetches `/api/hello` through a Vite proxy to the Go backend.

## Debug In VS Code (Breakpoints)

1. Stop Docker stack first so ports are free:

```bash
docker compose down
```

2. Open this folder in VS Code.

3. Install extensions:
- `Go` (by Google)
- `JavaScript Debugger` (usually built-in in recent VS Code)

4. Go to **Run and Debug** and start:
- `Debug Full Stack (Go + React)`

This launches:
- Go API debugger on port `8080`
- React dev server + Chrome debugger on `http://localhost:5173`

You can now put breakpoints in:
- `backend/main.go`
- `frontend/src/App.jsx`

## Debug Full Stack Inside Docker

This is separate from the normal stack and uses different host ports to avoid conflicts:
- frontend debug URL: `http://localhost:5174`
- backend API direct: `http://localhost:8081/api/hello`
- Go Delve debugger: `localhost:2345`

### One-time setup

Install VS Code extensions:
- `Go` (by Google)
- `JavaScript Debugger` (usually built-in)

### Run debug stack

```bash
docker compose -f docker-compose.debug.yml up --build -d
```

For later debug sessions, you can just keep it running or use:

```bash
docker compose -f docker-compose.debug.yml up -d --no-recreate
```

### Attach debugger in VS Code

Recommended sequence in VS Code:
1. Reload VS Code window:
- Press `Cmd+Shift+P`
- Run `Developer: Reload Window`
2. In **Run and Debug**, start:
- `Attach Go API (Docker Delve)`
3. Then start:
- `Debug React (Chrome, Docker)` (or `Debug Full Stack (Docker)`)

This will:
- attach to Go API running in Docker via Delve
- open Chrome debugger at `http://localhost:5174`
- wait for Delve (`2345`) before attaching, so Go breakpoints bind reliably

Breakpoints work in:
- `backend/main.go`
- `frontend/src/App.jsx`

If Go breakpoints appear grey/unbound:
- run the VS Code config `Debug Full Stack (Docker)` (it uses legacy Delve remote attach)
- place breakpoints on executable lines like `16`, `18`, `33`, `40`, `50` in `backend/main.go`
- ensure breakpoints are globally enabled in VS Code (Run and Debug -> Activate Breakpoints)

If you see `Socket connection to remote was closed`:
1. Restart debug containers:

```bash
docker compose -f docker-compose.debug.yml down
docker compose -f docker-compose.debug.yml up -d
```

2. Wait a couple seconds and re-run:
- `Attach Go API (Docker Delve)`

If API requests hang during debugging:
- the Go process is paused on a breakpoint; press `F5` (Continue)

### Stop debug stack

```bash
docker compose -f docker-compose.debug.yml down
```
