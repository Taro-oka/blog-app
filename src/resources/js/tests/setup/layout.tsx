import React from "react";

type LayoutProps = {
  children: React.ReactNode;
  header?: React.ReactNode;
};

export const createAuthenticatedLayoutMock = () => ({
  default: ({ children, header }: LayoutProps) => (
    <div>
      {header}
      <main>{children}</main>
    </div>
  ),
});
