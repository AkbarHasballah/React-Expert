module.exports = {
    "env": {
      "browser": true,
      "es2021": true,
      "node": true,
      "cypress/globals": ture
    },
    "extends": [
      "plugin:react/recommended",
      "airbnb"
    ],
    "parserOptions": {
      "ecmaFeatures": {
        "jsx": true
      },
      "ecmaVersion": 12,
      "sourceType": "module"
    },
    "plugins": [
      "react",
      "cypress"
    ],
    "rules": {
        'no-underscore-dangle': 'off',
        'react/react-in-jsx-scope': 'off',
        'no-console': 'off',  // Menonaktifkan peringatan no-console
        'react/no-danger': 'off',  // Menonaktifkan peringatan no-danger
        'no-alert': 'off', 
    }
  };
  