import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Divider } from "@mantine/core";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import ApplyJobPage from "./ApplyJobPage";
import CompanyDetailPage from "./CompanyDetailPage";
import FindJobs from "./FindJobs";
import FindTalents from "./FindTalents";
import HomePage from "./HomePage";
import JobDescriptionPage from "./JobDescriptionPage";
import JobHistoryPage from "./JobHistoryPage";
import PostedJobsPage from "./PostedJobsPage";
import PostJobPage from "./PostJobPage";
import ProfilePage from "./ProfilePage";
import SignupPage from "./SignupPage";
import TalentProfilePage from "./TalentProfilePage";
import { useSelector } from "react-redux";
const AppRoutes = () => {
  const user = useSelector((state) => state.user);
  return (
    <BrowserRouter>
      <div className="relative">
        <Header />
        <Divider size="xs" mx="md" />
        <Routes>
          <Route path="/find-jobs" element={<FindJobs />} />
          <Route path="/find-talents" element={<FindTalents />} />
          <Route path="/talent-profile" element={<TalentProfilePage />} />
          <Route path="/post-job" element={<PostJobPage />} />
          <Route path="/posted-jobs" element={<PostedJobsPage />} />
          <Route path="/company" element={<CompanyDetailPage />} />
          <Route path="/apply-job" element={<ApplyJobPage />} />
          <Route path="/jobs" element={<JobDescriptionPage />} />
          <Route path="/job-history" element={<JobHistoryPage />} />
          <Route
            path="/signup"
            element={user ? <Navigate to="/" /> : <SignupPage />}
          />
          <Route
            path="/login"
            element={user ? <Navigate to="/" /> : <SignupPage />}
          />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
};
export default AppRoutes;
