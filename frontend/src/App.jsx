import { Box } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import { useColorModeValue } from "./components/ui/color-mode";
import CreatePage from "./pages/CreatePage";
import HomePage from "./pages/HomePage";
import { Toaster } from "./components/ui/toaster";

function App() {
  return (
    <>
      <Box bg={useColorModeValue("white", "gray.800")}>
        <Navbar />
        <Routes>
          <Route index path="/" element={<HomePage />} />
          <Route path="/create" element={<CreatePage />} />
        </Routes>
      </Box>
      <Toaster />
    </>
  );
}

export default App;
