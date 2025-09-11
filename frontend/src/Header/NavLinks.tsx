import { Link, useLocation } from "react-router-dom";

const NavLinks = () => {
  const links = [
    { name: "Find Jobs", url: "find-jobs" },
    { name: "Find Talents", url: "find-talents" },
    { name: "Post Job", url: "post-job" },
    { name: "Posted Jobs", url: "posted-jobs" },
  ];
  const location = useLocation();
  return (
    <div className="flex gap-5 h-full items-center text-mine-shaft-300">
      {links.map((link) => (
        <div
          key={link.name}
          className={`h-full flex items-center border-t-[3px] ${
            location.pathname === "/" + link.url
              ? "border-bright-sun-400 text-bright-sun-400"
              : "border-transparent"
          }`}
        >
          <Link to={link.url}>{link.name}</Link>
        </div>
      ))}
    </div>
  );
};
export default NavLinks;
