import { BrowserRouter, Routes, Route } from "react-router-dom";
import Auth from "./pages/Auth";
import Profile from "./pages/Profile";
import Dashboard from "./pages/Dashboard";
import JobEdit from "./pages/JobEdit";
import JobView from "./pages/JobView";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Auth */}

        <Route
          path="/auth"
          element={<Auth />}
        />

        {/* Dashboard */}

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        {/* Jobs */}

        <Route
          path="/jobs/:id"
          element={<JobView />}
        />

        <Route
          path="/jobs/:id/edit"
          element={<JobEdit />}
        />

        {/* Profile */}
        <Route
          path="/profile"
          element={<Profile />}
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
