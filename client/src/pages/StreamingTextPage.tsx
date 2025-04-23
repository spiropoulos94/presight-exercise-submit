import { useRef, useEffect } from 'react';
import { useStreamingText } from '@/hooks/useStreamingText';
import { PageHeader } from '@/components/features/users';
import { Button } from '@/components/ui/Button';
import { PlayCircleIcon, StopCircleIcon } from '@/components/ui/icons';

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
            <PlayCircleIcon className="h-5 w-5 mr-1" fontSize="small" />
            Start Streaming
          </span>
        </Button>

        <Button variant="danger" onClick={cancelStreaming} disabled={!isLoading}>
          <span className="flex items-center">
            <StopCircleIcon className="h-5 w-5 mr-1" fontSize="small" />
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
