import { drizzle } from 'drizzle-orm/expo-sqlite';
import { openDatabaseSync } from 'expo-sqlite';
import * as schema from './schema';

// Open the database
const expo = openDatabaseSync('dorfromantik.db', { enableChangeListener: true });

// Create the drizzle instance
export const db = drizzle(expo, { schema });

export { schema };