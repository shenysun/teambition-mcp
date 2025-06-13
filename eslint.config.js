import antfu from '@antfu/eslint-config'

export default antfu(
  {
    rules: {
      'no-console': 'off',
      'node/prefer-global/process': 'off',
      'no-unused-vars': 'off',
    },
  },
  {
    ignores: ['.taskmaster/docs/技术方案/**/*'],
  },
)
