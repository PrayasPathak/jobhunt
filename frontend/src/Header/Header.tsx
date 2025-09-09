import { Avatar, Indicator } from "@mantine/core";
import { IconAnchor, IconBell, IconSettings } from "@tabler/icons-react";
import NavLinks from "./NavLinks";

const Header = () => {
  return (
    <div className="w-full h-20 bg-mine-shaft-950 text-white px-6 flex justify-between items-center">
      {/* Image */}
      <div className="flex gap-1 items-center text-bright-sun-400">
        <IconAnchor className="h-8 w-8" stroke={2.5} />
        <span className="text-3xl font-semibold">JobHook</span>
      </div>
      {/* Links */}
      <NavLinks />
      {/* Profile */}
      <div className="flex gap-5 items-center">
        <div className="flex gap-2 items-center">
          <span>Marshal</span>
          <Avatar src="avatar.png" alt="User Avatar" />
        </div>
        <div className="bg-mine-shaft-900 p-1 rounded-full">
          <IconSettings stroke={1.5} />
        </div>
        <div className="bg-mine-shaft-900 p-1 rounded-full">
          <Indicator color="brightSun.4" size={8} offset={6}>
            <IconBell stroke={1.5} />
          </Indicator>
        </div>
      </div>
    </div>
  );
};
export default Header;
