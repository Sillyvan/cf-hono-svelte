import { defineConfig } from 'drizzle-kit';

export default defineConfig({
	schema: './src/schema.ts',
	verbose: true,
	strict: true,
	dialect: 'sqlite',
	driver: 'd1-http'
});
