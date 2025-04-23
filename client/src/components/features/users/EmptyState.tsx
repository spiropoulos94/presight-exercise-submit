import React from 'react';
import { Typography } from '@/components/ui';
import { ChatBubbleIcon } from '@/components/ui/icons';

interface EmptyStateProps {
  loading: boolean;
}

const EmptyState: React.FC<EmptyStateProps> = ({ loading }) => (
  <div className="flex flex-col items-center justify-center h-full py-10">
    <ChatBubbleIcon fontSize="large" className="w-16 h-16 text-gray-300 mb-4" />
    <Typography variant="h6" className="text-center mb-2">
      No users found
    </Typography>
    <Typography variant="body2" color="secondary" className="text-center max-w-md">
      {loading
        ? 'Loading users...'
        : 'Try adjusting your filters or search criteria to find users.'}
    </Typography>
  </div>
);

export default EmptyState;
