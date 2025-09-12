import { profile } from "../Data/TalentData";
import Profile from "../Profile/Profile";

const ProfilePage = () => {
  return (
    <div className="min-h-[90vh] bg-mine-shaft-950 font-['Poppins'] p-4 overflow-hidden">
      <Profile {...profile} />
    </div>
  );
};
export default ProfilePage;
