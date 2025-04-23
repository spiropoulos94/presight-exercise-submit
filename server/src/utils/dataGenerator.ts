import { faker } from '@faker-js/faker';
import type { User } from 'shared';

/**
 * List of common hobbies for random generation
 */
const HOBBIES = [
  'Reading',
  'Gaming',
  'Cooking',
  'Hiking',
  'Photography',
  'Painting',
  'Gardening',
  'Fishing',
  'Woodworking',
  'Running',
  'Swimming',
  'Cycling',
  'Yoga',
  'Meditation',
  'Dancing',
  'Singing',
  'Playing guitar',
  'Knitting',
  'Baking',
  'Camping',
  'Bird watching',
  'Collecting stamps',
  'Chess',
  'Pottery',
  'Surfing',
  'Skiing',
  'Tennis',
  'Basketball',
  'Soccer',
  'Volunteering',
];

/**
 * Generate a random user with fake data
 */
export const generateUser = (id: number): User => {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();

  return {
    id,
    avatar: faker.image.avatar(),
    first_name: firstName,
    last_name: lastName,
    age: faker.number.int({ min: 18, max: 80 }),
    nationality: faker.location.country(),
    hobbies: Array.from({ length: faker.number.int({ min: 0, max: 10 }) }, () =>
      faker.helpers.arrayElement(HOBBIES),
    ),
  };
};

/**
 * Generate a batch of random users
 */
export const generateUsers = (count: number): User[] => {
  return Array.from({ length: count }, (_, index) => generateUser(index + 1));
};

/**
 * Generate a long text for the streaming endpoint
 */
export const generateLongText = (): string => {
  return faker.lorem.paragraphs(32);
};

/**
 * Generate a random result for the queue processing
 */
export const generateQueueResult = (requestId: string): string => {
  return `Result for request ${requestId}: ${faker.lorem.sentence()}`;
};
