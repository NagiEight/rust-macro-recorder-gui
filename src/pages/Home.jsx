import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import MacroEditorPage from "../components/MacroEditorPage";

const Home = () => {
  const [activePanel, setActivePanel] = useState("syntax");

  return (
    <div>
      <Sidebar activePanel={activePanel} setActivePanel={setActivePanel} />
      <MacroEditorPage></MacroEditorPage>
    </div>
  );
};

export default Home;
