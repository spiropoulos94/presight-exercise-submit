import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UsersPage from '@/pages/UsersPage';
import StreamingTextPage from '@/pages/StreamingTextPage';
import WebsocketQueuePage from '@/pages/WebsocketQueuePage';
import Navigation from '@/components/Navigation';

const App = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gray-50">
        <Navigation />
        <main className="flex-grow container mx-auto py-6 px-4 sm:px-6">
          <Routes>
            <Route path="/" element={<UsersPage />} />
            <Route path="/streaming" element={<StreamingTextPage />} />
            <Route path="/websocket" element={<WebsocketQueuePage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
