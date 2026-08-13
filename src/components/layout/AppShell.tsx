// import Sidebar from "./Sidebar";
// import TopNav from "./TopNav";

// export default function AppShell({ children }: { children: React.ReactNode }) {
//   return (
//     <div className="min-h-screen">
//       <Sidebar />

//       <TopNav />

//       <main
//         className="
// mr-60
// pt-14
// min-h-screen
// p-6
// "
//       >
//         {children}
//       </main>
//     </div>
//   );
// }

"use client";

import { useState } from "react";
import Sidebar from "./Sidebar";
import TopNav from "./TopNav";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const closeMobileSidebar = () => {
    setMobileSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Desktop Sidebar */}
      <Sidebar />

      {/* Mobile Sidebar */}
      <Sidebar mobile open={mobileSidebarOpen} onClose={closeMobileSidebar} />

      {/* Top Navigation */}
      <TopNav onMenuClick={() => setMobileSidebarOpen(true)} />

      {/* Page Content */}
      <main
        className="
          min-h-screen
          pt-16
          p-4
          sm:p-6
          md:mr-60
        "
      >
        {children}
      </main>
    </div>
  );
}
