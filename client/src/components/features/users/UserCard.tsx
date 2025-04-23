import { User } from 'shared';
import { Card, CardContent } from '@/components/ui/Card';
import { useState } from 'react';

interface UserCardProps {
  user: User;
}

const UserCard = ({ user }: UserCardProps) => {
  const { avatar, first_name, last_name, age, nationality, hobbies } = user;
  const [imageError, setImageError] = useState(false);

  // Generate a consistent GitHub avatar ID based on user name
  const getGithubAvatarUrl = () => {
    // Generate a number between 0-10000000 based on the user name
    const hash =
      Math.abs(
        (first_name + last_name).split('').reduce((a, b) => {
          return a + b.charCodeAt(0);
        }, 0) * 13,
      ) % 10000000;

    return `https://avatars.githubusercontent.com/u/${hash}`;
  };

  // Display first 2 hobbies and show +n if there are more
  const displayedHobbies = hobbies.slice(0, 2);
  const remainingCount = hobbies.length > 2 ? hobbies.length - 2 : 0;

  return (
    <Card className="h-full hover:shadow-md transition-shadow">
      <CardContent className="h-full p-3 sm:p-4">
        <div className="flex items-start h-full">
          <img
            src={imageError ? getGithubAvatarUrl() : avatar}
            alt={`${first_name} ${last_name}`}
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full mr-3 sm:mr-4 flex-shrink-0 bg-gray-100"
            onError={() => setImageError(true)}
          />
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap justify-between items-start">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mr-2 truncate">
                {first_name} {last_name}
              </h3>
              <span className="text-sm sm:text-base text-gray-500 flex-shrink-0">{age} years</span>
            </div>
            <p className="text-sm text-gray-600 mb-1 sm:mb-2 truncate">{nationality}</p>

            {hobbies.length > 0 && (
              <div className="mt-1 sm:mt-2">
                <p className="text-xs sm:text-sm text-gray-500 truncate">
                  {displayedHobbies.join(', ')}
                  {remainingCount > 0 && (
                    <span className="ml-1 font-medium text-blue-600">+{remainingCount}</span>
                  )}
                </p>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserCard;
