import React from "react";

type PageGetter<T> = () => T;

type HeadProps = {
  children?: React.ReactNode;
};

type LinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  children: React.ReactNode;
};

export const createInertiaPageMock = <T extends object>(getProps: PageGetter<T | undefined>) => ({
  Head: ({ children }: HeadProps) => <>{children}</>,
  Link: ({ children, href, ...rest }: LinkProps) => (
    <a href={href} {...rest}>
      {children}
    </a>
  ),
  usePage: () => ({ props: (getProps() ?? {}) as T }),
});

export const registerRouteMock = () => {
  (globalThis as { route?: (name: string, params?: unknown) => string }).route = (
    name: string,
    params?: unknown,
  ) => `${name}${params !== undefined ? `/${params}` : ""}`;
};
