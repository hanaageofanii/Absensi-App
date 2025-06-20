module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
  ],
  parserOptions: {
    parser: '@babel/eslint-parser',
    requireConfigFile: false,
  },
  globals: {
    defineProps: 'readonly',
    defineEmits: 'readonly',
  },
  rules: {
    // Aturan tambahan bisa ditaruh di sini
  },
}
