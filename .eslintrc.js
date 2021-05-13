module.exports = {
  parser: '@typescript-eslint/parser', // Specifies the ESLint parser
  parserOptions: {
    ecmaVersion: 2020, // Allows for the parsing of modern ECMAScript features
    sourceType: 'module', // Allows for the use of imports
    ecmaFeatures: {
      jsx: true, // Allows for the parsing of JSX
    },
  },
  settings: {
    react: {
      version: 'detect', // Tells eslint-plugin-react to automatically detect the version of React to use
    },
  },
  extends: [
    'plugin:react/recommended', // Uses the recommended rules from @eslint-plugin-react
    'plugin:@typescript-eslint/recommended', // Uses the recommended rules from the @typescript-eslint/eslint-plugin
    'prettier',
  ],
  rules: {
    // Place to specify ESLint rules. Can be used to overwrite rules specified from the extended configs
    // e.g. "@typescript-eslint/explicit-function-return-type": "off",
  },
};

// {
//   "extends": [
//     "react-app",
//     "airbnb",
//     "plugin:jsx-a11y/recommended",
//     "prettier",
//     "prettier/react",
//     "plugin:react/recommended",
//     "plugin:react-hooks/recommended"
//   ],
//   "plugins": ["jsx-a11y", "prettier", "react", "import"],
//   "rules": {
//     "semi": 1,
//     "comma-dangle": 0,
//     "arrow-body-style": 1,
//     "linebreak-style": [0, "windows"],
//     "react/jsx-filename-extension": [0, { "extensions": ["*.js", "*.jsx"] }],
//     "react/forbid-prop-types": 0,
//     "react/prefer-stateless-function": 0
//   }
// }
