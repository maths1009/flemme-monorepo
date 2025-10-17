export default {
  extends: ['gitmoji'],
  ignores: [commit => commit.includes('Version Packages')],
  rules: {
    'subject-empty': [0, 'never'],
    'type-empty': [0, 'never'],
    'type-enum': [0, 'never'],
  },
};
