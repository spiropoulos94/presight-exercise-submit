# Presight Frontend Exercise

This project demonstrates a full-stack application with React frontend and Node.js backend, showcasing various technical capabilities:

1. A paginated list with filtering and search capabilities
2. A streaming text response display
3. A WebWorker-based API with WebSocket communication

## Architecture

The project uses a monorepo structure with three main packages:

- `client`: React application with TypeScript, Vite, TailwindCSS, and React Router
- `server`: Express backend with TypeScript, WebSockets, and in-memory data
- `shared`: Common types and utilities shared between client and server

## Getting Started

### Prerequisites

- Node.js 18+ and npm 8+

### Installation

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```

### Running the Application

Development mode with hot-reloading:

```
npm run dev
```

Production build:

```
npm run build
```

Start production build:

```
npm start
```

### Testing

Run tests:

```
npm test
```

### Linting

Lint all packages:

```
npm run lint
```

Fix linting issues:

```
npm run lint:fix
```

## Features

### 1. User Listing with Filtering

- Virtual scrolling with infinite loading
- Filter by nationality and hobbies
- Search by name
- Responsive card layout

### 2. Streaming Text

- Backend streams text character by character
- Frontend displays text as it arrives
- Shows loading state during streaming

### 3. WebSocket Queue Processing

- Backend queues requests and processes them in a background worker
- Frontend displays multiple request states
- Real-time updates via WebSockets

## Testing Strategy

This project includes a comprehensive testing approach:

### Frontend Tests

- **Component Tests**: Using Vitest and React Testing Library to test React components in a user-centric way. Tests focus on behavior rather than implementation details.
- **Example**: The Navigation component tests verify both rendering and proper linking functionality.

### Backend Tests

- **API Integration Tests**: Testing the full request/response cycle of REST endpoints using Jest and Supertest.
- **Controller Unit Tests**: Testing the logic in controllers with mocked dependencies.
- **Example tests covered**:
  - API routes for users with filtering and pagination
  - Health check endpoints
  - Error handling for non-existent routes

### Testing Tools & Libraries

- **Frontend**:

  - Vitest: A Vite-native test runner that's faster than Jest for Vite projects
  - React Testing Library: For behavior-driven component testing
  - @testing-library/jest-dom: For additional DOM matchers

- **Backend**:
  - Jest: The standard testing framework for Node.js
  - Supertest: For API endpoint testing
  - ts-jest: TypeScript preprocessor for Jest

### Running Tests

```bash
# Run all tests
npm test

# Run only client tests
cd client && npm test

# Run only server tests
cd server && npm test

# Run client tests in watch mode
cd client && npm run test:watch
```

## Tech Stack

- **Frontend**: React 19, TypeScript, Vite, TailwindCSS, Tanstack Query, React Virtual
- **Backend**: Node.js, Express, TypeScript, Socket.io
- **Testing**: Vitest, Jest, React Testing Library
- **Other**: ESLint, Prettier

#### Create a react application and nodes web server for the following use cases

1. Create a mock api to serve paginated list of information with filtering and search capabilities

   - Define a data object having the following
     - avatar
     - first_name
     - last_name
     - age
     - nationality
     - hobbies (list of 0 to 10 items)
   - Display the list as individual cards using virtual scroll component, subsequent pages must be loaded using infinite scroll technique (preferably using `@tanstack/react-virtual`)
   - Design the card as
     ```
     |----------------------------------|
     | avatar      first_name+last_name |
     |             nationality      age |
     |                                  |
     |             (2 hobbies) (+n)     |
     |----------------------------------|
     ```
     > display top 2 hobbies and show remaining count if applicable as _`+n`_
   - Provide a side list in page to show top 20 hobbies and nationality that can be applied as filters
   - Provide a searchbox to find and filter the data by first_name, last_name

2. Read http response as stream and create a display that will print the response one character at a time

   - Create an api that responds with long text (`faker.lorem.paragraphs(32)`)
   - Read the response as a stream, while the stream is open display the available response one character at a time
   - Once the stream is closed print entire response

3. Create an api that will process each request in webworker and respond with the result over websocket

   - The api endpoint must cache each request into an in-memory queue and respond with `pending`
   - The queued requests must be processed in a webworker, the worker should send a result over websockets (for the exercise a text result can be sent after a timeout of 2seconds)
   - In react show 20 items that correspond to 20 requests, display `pending` for each of the requests and display corresponding result on receiving the websocket result

   > request --> `pending` --> socket message --> `result`
