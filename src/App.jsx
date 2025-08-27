import "./App.css";
import Dashboard from "./pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router";
function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
