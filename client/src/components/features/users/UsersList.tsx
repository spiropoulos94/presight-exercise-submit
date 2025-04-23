import React, { useRef } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';
import UserCard from './UserCard';
import { User } from 'shared';
import { Box, CircularProgress, Typography } from '@/components/ui';

export interface UsersListProps {
  users: User[];
  loading: boolean;
  hasMore: boolean;
  loadMore: () => void;
  total: number;
}

const UsersList: React.FC<UsersListProps> = ({ users, loading, hasMore, loadMore, total }) => {
  const parentRef = useRef<HTMLDivElement>(null);

  const rowVirtualizer = useVirtualizer({
    count: hasMore ? users.length + 1 : users.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 150, // Increased height for better mobile display
    overscan: 5,
  });

  // When we're near the bottom, load more data
  React.useEffect(() => {
    const scrollElement = parentRef.current;
    if (!scrollElement) return;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = scrollElement;

      // If we're near the bottom and there's more data to load
      if (scrollHeight - scrollTop - clientHeight < 300 && hasMore && !loading) {
        loadMore();
      }
    };

    scrollElement.addEventListener('scroll', handleScroll);
    return () => scrollElement.removeEventListener('scroll', handleScroll);
  }, [hasMore, loadMore, loading]);

  return (
    <Box className="w-full">
      <Box className="mb-3 sm:mb-4 flex justify-between items-center">
        <Typography variant="body2" color="secondary">
          Showing {users.length} of {total} users
        </Typography>

        {loading && !users.length && <CircularProgress size={20} className="ml-2" />}
      </Box>

      <div
        ref={parentRef}
        className="h-[calc(100vh-200px)] sm:h-[calc(100vh-250px)] overflow-auto rounded-lg bg-white p-2 sm:p-4"
      >
        <div className="relative w-full" style={{ height: `${rowVirtualizer.getTotalSize()}px` }}>
          {rowVirtualizer.getVirtualItems().map((virtualRow) => {
            const isLoaderRow = virtualRow.index >= users.length;

            return (
              <div
                key={virtualRow.index}
                className="absolute top-0 left-0 w-full px-2 py-2"
                style={{
                  height: `${virtualRow.size}px`,
                  transform: `translateY(${virtualRow.start}px)`,
                }}
              >
                <div className="h-full">
                  {isLoaderRow ? (
                    <div className="flex justify-center items-center py-4">
                      <CircularProgress size={24} />
                      <Typography variant="body2" color="secondary" className="ml-2">
                        Loading more...
                      </Typography>
                    </div>
                  ) : (
                    <div className="h-full pb-2">
                      <UserCard user={users[virtualRow.index]} />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Box>
  );
};

export default UsersList;
