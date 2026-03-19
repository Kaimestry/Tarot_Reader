//App.tsx
import { Routes, Route } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import LibraryScreen from "./screens/LibraryScreen";
import NavBar from "./features/navigations/NavBar";
import Footer from "./features/navigations/Footer";
import ReadingScreen from "./screens/reading/ReadingScreen";

const NotFound = () => <h2>404: This path isn't programmed.</h2>;

export default function App() {
  return (
    <div className="min-h-screen bg-main text-main transition-colors duration-500">
      {/* 1. Navigation Menu */}
      <NavBar />
      {/* 2. Routing Logic */}
      <main>
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/library" element={<LibraryScreen />} />
          <Route path="/reading" element={<ReadingScreen />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>{" "}
      <Footer />
    </div>
  );
}
