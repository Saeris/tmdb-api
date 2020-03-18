export const gender = (parent: Record<string, number>): string => {
  switch (parent.gender) {
    case 1:
      return `Female`;
    case 2:
      return `Male`;
    default:
      return `Unknown`;
  }
};
