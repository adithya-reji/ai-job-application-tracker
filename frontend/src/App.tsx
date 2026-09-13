import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import AddJob from "./pages/AddJob";
import VerifyJob from "./pages/VerifyJob";
import EditJob from "./pages/EditJob";
import JobDetails from "./pages/JobDetails";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Auth */}

        <Route
          path="/login"
          element={<Login />}
        />

        {/* Dashboard */}

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        {/* Jobs */}

        <Route
          path="/jobs/add"
          element={<AddJob />}
        />

        <Route
          path="/jobs/:id"
          element={<JobDetails />}
        />

        <Route
          path="/jobs/:id/verify"
          element={<VerifyJob />}
        />

        <Route
          path="/jobs/:id/edit"
          element={<EditJob />}
        />

        {/* Fallback */}

        <Route
          path="*"
          element={<Dashboard />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App
