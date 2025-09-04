import js from '@eslint/js'; // ESLint core config for JavaScript
import globals from 'globals'; // Predefined global variables for various environments
import reactHooks from 'eslint-plugin-react-hooks'; // ESLint plugin for React hooks rules
import reactRefresh from 'eslint-plugin-react-refresh'; // ESLint plugin for Vite + React Fast Refresh
import { defineConfig, globalIgnores } from 'eslint/config'; // ESLint helper functions

export default defineConfig([
  // Ignore 'dist' folder globally
  globalIgnores(['dist']),

  {
    // Apply rules to all JS and JSX files
    files: ['**/*.{js,jsx}'],

    // Extend base recommended rules
    extends: [
      js.configs.recommended, // JavaScript recommended rules
      reactHooks.configs['recommended-latest'], // React hooks linting rules
      reactRefresh.configs.vite, // React Fast Refresh linting rules for Vite
    ],

    // Language options for parsing
    languageOptions: {
      ecmaVersion: 2020, // Support modern JS syntax
      globals: globals.browser, // Recognize browser globals (window, document, etc.)
      parserOptions: {
        ecmaVersion: 'latest', // Support latest ECMAScript features
        ecmaFeatures: { jsx: true }, // Enable JSX parsing
        sourceType: 'module', // Use ES modules
      },
    },

    // Custom rules
    rules: {
      // Disallow unused variables except for ones starting with uppercase or underscore
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
    },
  },
]);