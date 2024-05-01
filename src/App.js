import "./App.css";
import { useState, createContext, useContext } from "react";
import { Nav } from "./nav";
import { Viz } from "./Viz";

export const AppContext = createContext();
export const useAppContext = () => useContext(AppContext);

const initState = {
  gfile: null,
  graph: { nodes: null, links: null, note: null },
  allText: null,
};

function App() {
  const [state, setState] = useState(initState);

  const updateContext = (updates) =>
    setState((prev) => ({
      ...prev,
      ...updates,
    }));

  return (
    <AppContext.Provider value={{ ...state, updateContext }}>
      <div className="relative h-screen bg-[#32302f]">
        <Nav />
        <Viz />
        {/* <Main /> */}
      </div>
    </AppContext.Provider>
  );
}

export default App;
