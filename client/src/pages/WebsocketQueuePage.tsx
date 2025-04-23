import { useRequestQueue } from '@/hooks/useRequestQueue';
import { PageHeader } from '@/components/features/users';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';

const WebsocketQueuePage = () => {
  const { requestItems, sendRequest, sendAllRequests, resetAll } = useRequestQueue();

  // Get status badge based on status
  const getStatusBadge = (status: string, error?: string) => {
    switch (status) {
      case 'pending':
        return (
          <span className="px-2 py-1 text-xs rounded-full bg-orange-100 text-orange-800">
            Pending
          </span>
        );
      case 'complete':
        return (
          <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
            Complete
          </span>
        );
      case 'idle':
        if (error) {
          return (
            <span className="px-2 py-1 text-xs rounded-full bg-red-100 text-red-800">Error</span>
          );
        }
        return null;
      default:
        return null;
    }
  };

  return (
    <div className="bg-white p-4 sm:p-6 rounded-lg shadow">
      <PageHeader
        title="Websocket Queue Demo"
        subtitle="Process requests in real-time using websockets"
      />

      <div className="mb-6 flex flex-col sm:flex-row sm:space-x-4 space-y-2 sm:space-y-0">
        <Button variant="primary" onClick={sendAllRequests}>
          <span className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-1"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                clipRule="evenodd"
              />
            </svg>
            Process All Requests
          </span>
        </Button>

        <Button variant="outline" onClick={resetAll}>
          <span className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-1"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
                clipRule="evenodd"
              />
            </svg>
            Reset All
          </span>
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {requestItems.map((item, index) => (
          <Card
            key={item.id}
            className={`${
              item.status === 'idle'
                ? item.error
                  ? 'bg-red-50'
                  : 'bg-white'
                : item.status === 'pending'
                  ? 'bg-orange-50'
                  : 'bg-green-50'
            }`}
          >
            <CardContent>
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-sm font-medium">Request #{item.id + 1}</h3>

                {item.status === 'idle' && !item.error ? (
                  <button
                    onClick={() => sendRequest(index)}
                    className="p-1 rounded-full text-blue-500 hover:bg-blue-50 cursor-pointer"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 rotate-90"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                    </svg>
                  </button>
                ) : (
                  getStatusBadge(item.status, item.error)
                )}
              </div>

              <p className="mt-2 overflow-hidden text-ellipsis line-clamp-3 text-sm text-gray-600">
                {item.status === 'idle' && !item.error && 'Ready to process'}
                {item.status === 'idle' && item.error && (
                  <span className="text-red-600">{item.error}</span>
                )}
                {item.status === 'pending' && 'Processing...'}
                {item.status === 'complete' && item.result}
              </p>

              {item.requestId && (
                <div className="mt-2 text-xs text-gray-500">ID: {item.requestId}</div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default WebsocketQueuePage;
