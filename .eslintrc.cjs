/* eslint-env node */
module.exports = {
    root: true,
    env: {
        node: true,
        browser: true
    },
    extends: [
        'plugin:vue/vue3-essential',
        'eslint:recommended'
    ],
    parserOptions: {
        ecmaVersion: 'latest'
    },
    rules: {
        // # OFF
        'no-useless-escape': 'off',
        'vue/multi-word-component-names': 'off',
        'vue/no-multiple-template-root': 'off',
        'arrow-parens': 'off',
        'prefer-const': 'off',
        'no-undef': 'off', // Compatibility
        'no-fallthrough': 'off',
        'no-extra-boolean-cast': 'off',
        'no-useless-catch': 'off',
        'no-irregular-whitespace': 'off',
        'no-prototype-builtins': 'off',
        'no-case-declarations': 'off',
        'no-unused-vars': ['off', {
            'vars': 'local',
            'args': 'none',
            'ignoreRestSiblings': true
        }],
        'no-async-promise-executor': 'off',
        'vue/script-setup-uses-vars': 'off',
        'vue/no-unused-vars': ['off', {
            'ignorePattern': 'Regexp'
        }],
        'vue/no-unused-components': ['off', {
            'ignoreWhenBindingPresent': true
        }],
        // # Default
        'semi': ['error', 'always'],
        'quotes': ['error', 'single'],
        'indent': ['error', 4, {
            'SwitchCase': 1,
            'ObjectExpression': 1,
            'MemberExpression': 1,
            'ImportDeclaration': 1,
            'VariableDeclarator': 1,
            'ignoredNodes': [
                'CallExpression > FunctionExpression.callee > BlockStatement.body'
            ],
            'ignoreComments': true
        }],
        'comma-style': ['error', 'last'],
        'comma-dangle': ['error', 'never'],
        'comma-spacing': ['error', {
            'before': false,
            'after': true
        }],
        'block-spacing': ['error', 'always'],
        'no-tabs': ['error', {
            'allowIndentationTabs': true
        }],
        'no-empty': ['error', {
            'allowEmptyCatch': true
        }],
        'no-use-before-define': ['error', {
            'functions': false,
            'variables': false
        }],
        'no-trailing-spaces': ['error', {
            'skipBlankLines': true,
            'ignoreComments': true
        }],
        'arrow-spacing': ['error', {
            'before': true,
            'after': true
        }],
        'no-spaced-func': 'error',
        'no-mixed-spaces-and-tabs': 'error',
        'no-unexpected-multiline': 'error',
        'space-in-parens': ['error', 'never', {
            'exceptions': []
        }],
        'space-infix-ops': ['error', {
            'int32Hint': false
        }],
        'space-before-blocks': ['error', 'always'],
        'space-before-function-paren': ['error', {
            'anonymous': 'never',
            'named': 'never',
            'asyncArrow': 'always'
        }],
        'array-bracket-spacing': ['error', 'never'],
        'func-call-spacing': ['error', 'never'],
        'function-call-argument-newline': ['error', 'consistent'],
        'key-spacing': ['error', {
            'beforeColon': false,
            'afterColon': true
        }],
        'keyword-spacing': ['error', {
            'before': true,
            'after': true
        }],
        'object-property-newline': ['error', {
            'allowMultiplePropertiesPerLine': true
        }]
        // ! Essential Check list
        // 'vue/no-arrow-functions-in-watch'
        // 'vue/no-async-in-computed-properties'
        // 'vue/no-dupe-keys'
        // 'vue/no-dupe-v-else-if'
        // 'vue/no-duplicate-attributes'
        // 'vue/no-mutating-props'
        // 'vue/no-parsing-error'
        // 'vue/no-reserved-keys'
        // 'vue/no-shared-component-data'
        // 'vue/no-side-effects-in-computed-properties'
        // 'vue/no-template-key'
        // 'vue/no-textarea-mustache'
        // 'vue/no-unused-components'
        // 'vue/no-unused-vars'
        // 'vue/no-use-v-if-with-v-for'
        // 'vue/require-component-is'
        // 'vue/require-prop-type-constructor'
        // 'vue/require-render-return'
        // 'vue/require-v-for-key'
        // 'vue/require-valid-default-prop'
        // 'vue/return-in-computed-property'
        // 'vue/use-v-on-exact'
        // 'vue/valid-template-root'
        // 'vue/valid-v-bind'
        // 'vue/valid-v-cloak'
        // 'vue/valid-v-else-if'
        // 'vue/valid-v-else'
        // 'vue/valid-v-for'
        // 'vue/valid-v-html'
        // 'vue/valid-v-if'
        // 'vue/valid-v-model'
        // 'vue/valid-v-on'
        // 'vue/valid-v-once'
        // 'vue/valid-v-pre'
        // 'vue/valid-v-show'
        // 'vue/valid-v-slot'
        // 'vue/valid-v-text'

    }
};