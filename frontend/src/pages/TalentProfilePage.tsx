import { Button } from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import { profile } from "../Data/TalentData";
import Profile from "../TalentProfile/Profile";
import RecommendTalent from "../TalentProfile/RecommendTalent";

const TalentProfilePage = () => {
  return (
    <div className="min-h-[100vh] bg-mine-shaft-950 font-['Poppins'] p-4">
      <Link to="/find-talents" className="my-4 inline-block">
        <Button
          variant="light"
          color="brightSun.4"
          leftSection={<IconArrowLeft size={20} />}
        >
          Back
        </Button>
      </Link>
      <div className="flex gap-5">
        <Profile {...profile} />
        <RecommendTalent />
      </div>
    </div>
  );
};
export default TalentProfilePage;
