import { useRequestQueue } from '@/hooks/useRequestQueue';
import { PageHeader } from '@/components/features/users';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { PlayCircleIcon, RefreshCycleIcon, PaperAirplaneIcon } from '@/components/ui/icons';

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
            <PlayCircleIcon className="h-5 w-5 mr-1" fontSize="small" />
            Process All Requests
          </span>
        </Button>

        <Button variant="outline" onClick={resetAll}>
          <span className="flex items-center">
            <RefreshCycleIcon className="h-5 w-5 mr-1" fontSize="small" />
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
                    <PaperAirplaneIcon className="h-4 w-4 rotate-90" fontSize="small" />
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
