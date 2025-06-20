// src/components/DashboardLayout/DashboardLayout.tsx
import React, { useState, useEffect } from "react";

import { Header } from "./Header";
import { Sidebar, MobileSidebar } from "./Sidebar";
import { DashboardLayoutProperties } from "./types";
import "../../assets/dashboard-layout.css";

export const DashboardLayout: React.FC<DashboardLayoutProperties> = ({
  children,
  sidebarContent,
  headerContent,
  title = "Dashboard",
  showSidebar = true,
  sidebarWidth = "w-64",
  collapsedSidebarWidth = "w-16",
  sidebarPosition = "left",
  customSidebarClass = "",
  customHeaderClass = "",
  customMainClass = "",
}) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Detect screen size changes
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Toggle sidebar visibility
  const toggleSidebar = () => {
    if (isMobile) {
      setMobileSidebarOpen(!mobileSidebarOpen);
    } else {
      setSidebarCollapsed(!sidebarCollapsed);
    }
  };

  return (
    <div
      className={`dashboard-container ${sidebarPosition === "right" ? "sidebar-right" : "sidebar-left"}`}
    >
      {/* Regular sidebar for desktop */}
      {showSidebar && !isMobile && (
        <Sidebar
          title={title}
          collapsed={sidebarCollapsed}
          onToggle={toggleSidebar}
          width={sidebarWidth}
          collapsedWidth={collapsedSidebarWidth}
          position={sidebarPosition}
          customClass={customSidebarClass}
        >
          {sidebarContent}
        </Sidebar>
      )}

      {/* Mobile sidebar */}
      {showSidebar && isMobile && (
        <MobileSidebar
          title={title}
          collapsed={false}
          onToggle={toggleSidebar}
          width={sidebarWidth}
          collapsedWidth={collapsedSidebarWidth}
          position={sidebarPosition}
          isOpen={mobileSidebarOpen}
          onClose={() => setMobileSidebarOpen(false)}
          customClass={customSidebarClass}
        >
          {sidebarContent}
        </MobileSidebar>
      )}

      {/* Main content area */}
      <div className="dashboard-main">
        <Header
          showMenuToggle={showSidebar}
          onMenuToggle={toggleSidebar}
          customClass={customHeaderClass}
        >
          {headerContent}
        </Header>

        <main className={`dashboard-content ${customMainClass}`}>
          <div className="content-container">{children}</div>
        </main>
      </div>
    </div>
  );
};

// Demo content for preview
// const DemoContent: React.FC = () => {
//   const cards = [
//     { title: "Total Users", value: "8,249", className: "card-blue" },
//     { title: "New Customers", value: "+2.6%", className: "card-green" },
//     { title: "Revenue", value: "$24,780", className: "card-purple" },
//     { title: "Active Sessions", value: "427", className: "card-yellow" },
//   ];

//   return (
//     <div className="demo-content">
//       <div className="stat-cards">
//         {cards.map((card, index) => (
//           <div key={index} className={`stat-card ${card.className}`}>
//             <h3 className="card-title">{card.title}</h3>
//             <p className="card-value">{card.value}</p>
//           </div>
//         ))}
//       </div>

//       <div className="activity-card">
//         <h2 className="section-title">Recent Activity</h2>
//         <div className="activity-list">
//           {[1, 2, 3, 4].map((item) => (
//             <div key={item} className="activity-item">
//               <div className="activity-avatar"></div>
//               <div className="activity-details">
//                 <h4 className="activity-name">Activity Item {item}</h4>
//                 <p className="activity-description">
//                   Description of this activity
//                 </p>
//               </div>
//               <span className="activity-time">5m ago</span>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };
