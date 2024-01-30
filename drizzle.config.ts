import type {Config} from 'drizzle-kit';
import * as dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.resolve(__dirname, '.env') });

export default {
    driver : 'pg',
    schema: './lib/db/schema.ts',
    dbCredentials: {
        connectionString: process.env.DATABASE_URL!,
    },
} satisfies Config;
