import { Routes, Route } from "react-router-dom";
import DashboardPage from "./containers/DashboardPage";
import LoginPage from "./containers/LoginPage";
import UnProtectedAuth from "./components/functionals/UnProtectedAuth";
import RegisterPage from "./containers/RegisterPage";
import ProtectedAuth from "./components/functionals/ProtectedAuth";
import ISSLocation from "./containers/ISSLocationPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route
          path="/login"
          element={
            <UnProtectedAuth>
              <LoginPage />
            </UnProtectedAuth>
          }
        />
        <Route
          path="/register"
          element={
            <UnProtectedAuth>
              <RegisterPage />
            </UnProtectedAuth>
          }
        />
        <Route
          path="/iss-location-now"
          element={
            <ProtectedAuth>
              <ISSLocation />
            </ProtectedAuth>
          }
        />
      </Routes>
    </>
  );
}

export default App;
