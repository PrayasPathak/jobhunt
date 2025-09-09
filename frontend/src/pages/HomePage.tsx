import Header from "../Header/Header";
import Companies from "../LandingPage/Companies";
import DreamJob from "../LandingPage/DreamJob";
import JobCategpry from "../LandingPage/JobCategpry";
import Working from "../LandingPage/Working";

const HomePage = () => {
  return (
    <div className="min-h-[100vh] bg-mine-shaft-950 font-['Poppins']">
      <Header />
      <DreamJob />
      <Companies />
      <JobCategpry />
      <Working />
    </div>
  );
};
export default HomePage;
