export const logo = (parent: Record<string, string>) => parent.logo_path;

export const country = (parent: Record<string, string>) =>
  parent.origin_country;

export const parentCompany = (parent: Record<string, string>) =>
  parent.parent_company;
