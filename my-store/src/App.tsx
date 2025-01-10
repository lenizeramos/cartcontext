import { useState } from "react";
import "./App.css";
import StoreItems from "./components/StoreItems";
import Sidebar from "./components/Sidebar";

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const openSidebar = () => setIsSidebarOpen(true);
  const closeSidebar = () => setIsSidebarOpen(false);
  return (
    <>
      <StoreItems openSidebar={openSidebar}/>
      <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />
    </>
  );
}

export default App;
