// import Sidebar from "./Sidebar";
// import TopNav from "./TopNav";

// export default function AppShell({ children }: { children: React.ReactNode }) {
//   return (
//     <div className="min-h-screen bg-background">
//       <Sidebar />

//       <TopNav />

//       <main
//         className="
//           mr-60
//           pt-14
//           min-h-screen
//           p-6
//           mt-8
//         "
//       >
//         {children}
//       </main>
//     </div>
//   );
// }

import Sidebar from "./Sidebar";
import TopNav from "./TopNav";

export default function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen">
      <Sidebar />

      <TopNav />

      <main
        className="
mr-60
pt-14
min-h-screen
p-6
"
      >
        {children}
      </main>
    </div>
  );
}
