import React from 'react';
import { Box, Typography } from '@/components/ui';

interface PageHeaderProps {
  title: string;
  subtitle: string;
  className?: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, subtitle, className = '' }) => {
  return (
    <Box className={`mb-6 ${className}`}>
      <Typography variant="h5" className="mb-2 font-bold">
        {title}
      </Typography>
      <Typography variant="body2" color="secondary">
        {subtitle}
      </Typography>
    </Box>
  );
};

export default PageHeader;
