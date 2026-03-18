import { Routes, Route } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import LibraryScreen from "./screens/LibraryScreen";
import NavBar from "./features/navigations/NavBar";

const NotFound = () => <h2>404: This path isn't programmed.</h2>;

export default function App() {
  return (
    <div className="min-h-screen bg-main text-main transition-colors duration-500">
      {/* 1. Navigation Menu */}
      <NavBar />

      {/* 2. Routing Logic */}
      <main className=" flex justify-center">
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/library" element={<LibraryScreen />} />

          {/* 3. Catch-all for broken links */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
}
