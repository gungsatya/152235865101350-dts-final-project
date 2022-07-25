import { Routes, Route } from "react-router-dom";
import DashboardPage from "./containers/DashboardPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
      </Routes>
    </>
  );
}

export default App;
