module.exports = {
    parser: '@typescript-eslint/parser', // Specifies the ESLint parser
    extends: [
        'plugin:react/recommended', // Uses the recommended rules from @eslint-plugin-react
        'next/core-web-vitals', // Uses recommended rules from next js
        'plugin:@typescript-eslint/recommended', // Uses the recommended rules from the @typescript-eslint/eslint-plugin
        'plugin:prettier/recommended', // Enables eslint-plugin-prettier and displays prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
    ],
    parserOptions: {
        ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
        sourceType: 'module', // Allows for the use of imports
        ecmaFeatures: {
            jsx: true, // Allows for the parsing of JSX
        },
    },
    plugins: ['header', 'unicorn'],
    rules: {
        '@typescript-eslint/no-explicit-any': 'off', // allows the explicit usage of type any
        '@typescript-eslint/ban-ts-comment': 'off', // allows the usage of the ts-ignore comment
        'react-hooks/exhaustive-deps': 'off', // Checks effect dependencies
        'class-methods-use-this': 'off', // Enforces using this in classes
        'no-multi-str': 'warn', // No multiline strings
        'no-multi-spaces': 'warn', // No multiple consecutive spaces
        curly: 'warn', // Enforces using curly braces on controlled
        eqeqeq: 'error', // Enforces === and !==
        yoda: 'warn', // Enforces variables on left side of Equality Check
        'header/header': [2, 'block', header, 2], // Enforces header like defined above, with 2 following linebreaks
        // Enforces conditions for TODO comments.
        // [2022-mm-dd] fix code -> Set expiring date for comment
        // NOCL-xxx fix code -> Comments connected to tickets will be ignored
        // [>=0.2.0] fix code -> Set expiring packet version for comment
        // more https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/expiring-todo-comments.md
        'unicorn/expiring-todo-comments': [
            'error',
            {
                allowWarningComments: false,
                ignore: [/(:\s?|\s)[A-Z]{2,4}-\d*($|(\s+.*|-+.*))/], // Regex for todos to include ticket name. e.g. JIRA-256
            },
        ],
        'prettier/prettier': [
            'error',
            {
                trailingComma: 'all',
                singleQuote: true,
                tabWidth: 4,
                semi: true,
                printWidth: 120,
                quoteProps: 'as-needed',
                bracketSpacing: true,
                jsxSingleQuote: true,
                bracketSameLine: true,
                endOfLine: 'auto',
                arrowParens: 'always',
                htmlWhitespaceSensitivity: 'css',
                embeddedLanguageFormatting: 'auto',
                singleAttributePerLine: false,
            },
        ],
        '@next/next/no-img-element': 'off',
        'react/hook-use-state': ['error', { allowDestructuredState: true }],
    },
    settings: {
        react: {
            version: 'detect', // Tells eslint-plugin-react to automatically detect the version of React to use
        },
    },
};
