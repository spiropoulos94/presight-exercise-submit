import { useRef, useEffect } from 'react';
import { useStreamingText } from '@/hooks/useStreamingText';
import { PageHeader } from '@/components/features/users';
import { Button } from '@/components/ui/Button';

const StreamingText = () => {
  const { text, isLoading, error, refreshText, cancelStreaming } = useStreamingText();
  const textContainerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when text updates
  useEffect(() => {
    if (textContainerRef.current && isLoading) {
      textContainerRef.current.scrollTop = textContainerRef.current.scrollHeight;
    }
  }, [text, isLoading]);

  return (
    <div className="bg-white p-4 sm:p-6 rounded-lg shadow">
      <PageHeader
        title="Streaming Text Demo"
        subtitle="Watch as text streams in real-time from the server"
      />

      <div className="mb-6 flex flex-col sm:flex-row sm:space-x-4 space-y-2 sm:space-y-0">
        <Button
          variant={isLoading ? 'outline' : 'primary'}
          onClick={refreshText}
          disabled={isLoading}
        >
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
            Start Streaming
          </span>
        </Button>

        <Button variant="danger" onClick={cancelStreaming} disabled={!isLoading}>
          <span className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-1"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8 7a1 1 0 00-1 1v4a1 1 0 001 1h4a1 1 0 001-1V8a1 1 0 00-1-1H8z"
                clipRule="evenodd"
              />
            </svg>
            Stop Streaming
          </span>
        </Button>
      </div>

      {isLoading && (
        <div className="w-full h-1 bg-blue-100 overflow-hidden mb-4">
          <div className="h-full bg-blue-500 animate-pulse"></div>
        </div>
      )}

      {error && <div className="p-4 mb-4 text-red-700 bg-red-100 rounded-md">{error}</div>}

      <div
        className="p-4 h-[300px] sm:h-[400px] bg-gray-50 overflow-auto whitespace-pre-wrap rounded-lg border border-gray-200 shadow-sm"
        ref={textContainerRef}
      >
        {isLoading ? (
          <p className="text-base">{text}</p>
        ) : text ? (
          <div>
            <h3 className="mb-2 font-medium text-lg">Complete Text:</h3>
            <p className="text-base">{text}</p>
          </div>
        ) : (
          <div className="flex justify-center items-center h-full text-gray-500">
            Click &quot;Start Streaming&quot; to see streaming text...
          </div>
        )}
      </div>
    </div>
  );
};

export default StreamingText;
