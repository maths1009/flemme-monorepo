import type { User, UserNode } from '@/data/users';

function getSlug(user: User): string {
  return `${user.firstName.toLowerCase()}-${user.lastName.toLowerCase()}`;
}

function getFullName(user: User): string {
  return `${user.firstName} ${user.lastName}`;
}

function buildHierarchy(users: User[]): UserNode[] {
  const userMap = new Map<string, UserNode>();

  for (const user of users) {
    userMap.set(user.id, { ...user, children: [] });
  }

  const roots: UserNode[] = [];

  for (const user of users) {
    const node = userMap.get(user.id)!;
    if (user.parentId) {
      const parent = userMap.get(user.parentId);
      if (parent) {
        parent.children.push(node);
      } else {
        roots.push(node);
      }
    } else {
      roots.push(node);
    }
  }

  const sortChildren = (nodes: UserNode[]): UserNode[] => {
    return nodes
      .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
      .map(node => ({ ...node, children: sortChildren(node.children) }));
  };

  return sortChildren(roots);
}

export { getSlug, getFullName, buildHierarchy };
