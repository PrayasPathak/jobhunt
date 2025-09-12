import { Indicator } from "@mantine/core";
import { IconAnchor, IconBell, IconSettings } from "@tabler/icons-react";
import { Link, useLocation } from "react-router-dom";
import NavLinks from "./NavLinks";
import ProfileMenu from "./ProfileMenu";

const Header = () => {
  const location = useLocation();
  return location.pathname != "/signup" && location.pathname != "/login" ? (
    <div className="w-full h-20 bg-mine-shaft-950 font-['Poppins'] text-white px-6 flex justify-between items-center">
      {/* Image */}
      <div className="flex gap-1 items-center text-bright-sun-400">
        <IconAnchor className="h-8 w-8" stroke={2.5} />
        <Link to="/" className="text-3xl font-semibold">
          JobHook
        </Link>
      </div>
      {/* Links */}
      <NavLinks />
      {/* Profile */}
      <div className="flex gap-5 items-center">
        <ProfileMenu />
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
  ) : (
    <></>
  );
};
export default Header;
