import React, { FC } from "react";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <div className="w-full h-screen flex flex-col overflow-auto">
      <div className="h-full w-full overflow-auto">{children}</div>
    </div>
  );
};

export default Layout;
