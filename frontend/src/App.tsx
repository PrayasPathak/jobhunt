import { createTheme, Divider, MantineProvider } from "@mantine/core";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "@mantine/core/styles.css";
import "@mantine/carousel/styles.css";
import "@mantine/tiptap/styles.css";
import HomePage from "./pages/HomePage";
import FindJobs from "./pages/FindJobs";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import FindTalents from "./pages/FindTalents";
import TalentProfilePage from "./pages/TalentProfilePage";
import PostJobPage from "./pages/PostJobPage";
import JobDescriptionPage from "./pages/JobDescriptionPage";
import ApplyJobPage from "./pages/ApplyJobPage";

const theme = createTheme({
  colors: {
    mineShaft: [
      "#f6f6f6",
      "#e7e7e7",
      "#d1d1d1",
      "#b0b0b0",
      "#888888",
      "#6d6d6d",
      "#5d5d5d",
      "#4f4f4f",
      "#454545",
      "#3d3d3d",
      "#2d2d2d",
    ],
    brightSun: [
      "#fffbeb",
      "#fff3c6",
      "#ffe588",
      "#ffd149",
      "#ffbd20",
      "#f99b07",
      "#dd7302",
      "#b75006",
      "#943c0c",
      "#7a330d",
      "#461902",
    ],
  },
  fontFamily: "Poppins, sans-serif",
  primaryColor: "brightSun",
  primaryShade: 4,
});

const App = () => {
  return (
    <MantineProvider theme={theme} defaultColorScheme="dark">
      <BrowserRouter>
        <div className="relative">
          <Header />
          <Divider size="xs" mx="md" />
          <Routes>
            <Route path="/find-jobs" element={<FindJobs />} />
            <Route path="/find-talents" element={<FindTalents />} />
            <Route path="/talent-profile" element={<TalentProfilePage />} />
            <Route path="/post-job" element={<PostJobPage />} />
            <Route path="/apply-job" element={<ApplyJobPage />} />
            <Route path="/jobs" element={<JobDescriptionPage />} />
            <Route path="*" element={<HomePage />} />
          </Routes>
          <Footer />
        </div>
      </BrowserRouter>
    </MantineProvider>
  );
};
export default App;
