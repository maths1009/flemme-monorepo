interface User {
  name: string;
  avatar: string;
}

const USERS: Record<string, User> = {
  MATHIS: {
    avatar: 'https://github.com/shadcn.png',
    name: 'Mathis',
  },
};

export { USERS };
export type { User };
