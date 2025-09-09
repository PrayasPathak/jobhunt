import { Avatar } from "@mantine/core";
import { IconAsset, IconBell, IconSettings } from "@tabler/icons-react";

const Header = () => {
  return (
    <div className="w-full h-28 bg-black text-white px-6 flex justify-between items-center">
      {/* Image */}
      <div className="flex gap-2 items-center">
        <IconAsset className="h-10 w-10" stroke={1.25} />
        <span className="text-3xl font-semibold">iJobs</span>
      </div>
      {/* Links */}
      <div className="flex gap-3 text-sm">
        <a href="">Find Jobs</a>
        <a href="">Find Talent</a>
        <a href="">Post Job</a>
        <a href="">Posted Jobs</a>
        <a href="">Job History</a>
      </div>
      {/* Profile */}
      <div className="flex gap-5 items-center">
        <IconBell />
        <div className="flex gap-2 items-center">
          <span>Marshal</span>
          <Avatar src="avatar.png" alt="User Avatar" />
        </div>
        <IconSettings />
      </div>
    </div>
  );
};
export default Header;
