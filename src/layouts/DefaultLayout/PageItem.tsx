export type PageItem = {
  title: string;
  href: string;
  icon?: JSX.Element;
  badge?: JSX.Element;
  matches?: RegExp;
  children?: PageItem[];
  featureFlag?: string;
  anchorClassName?: string;
};
