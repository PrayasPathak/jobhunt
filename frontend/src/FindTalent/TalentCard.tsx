import { Avatar, Button, Divider, Text } from "@mantine/core";
import { IconHeart, IconMapPin } from "@tabler/icons-react";
import { Link } from "react-router-dom";

interface Props {
  name: string;
  role: string;
  company: string;
  topSkills: string[];
  about: string;
  expectedCtc: string;
  location: string;
  image: string;
}

const JobCard = ({
  name,
  role,
  company,
  topSkills,
  about,
  expectedCtc,
  location,
  image,
}: Props) => {
  return (
    <div className="bg-mine-shaft-900 p-4 w-80 flex flex-col gap-3 rounded-xl hover:shadow-[0_0_5px_1px_yellow] !shadow-bright-sun-400 cursor-pointer">
      <div className="flex justify-between">
        <div className="flex gap-2 items-center">
          <div className="p-2 bg-mine-shaft-800 rounded-full">
            <Avatar src={`/${image}.png`} alt="Meta" size="lg" />
          </div>
          <div>
            <div className="font-semibold text-lg">{name}</div>
            <div className="text-sm text-mine-shaft-300">
              {role} &bull; {company}
            </div>
          </div>
        </div>
        <IconHeart className="text-mine-shaft-300 cursor-pointer" />
      </div>
      {/* Job Titles */}
      <div className="flex gap-2 [&>span]:py-1 [&>span]:px-2 [&>span]:bg-mine-shaft-800 [&>span]:text-bright-sun-400 [&>span]:rounded-lg text-xs">
        {topSkills.map((skill, index) => (
          <span key={index}>{skill}</span>
        ))}
      </div>
      {/* Job Description */}
      <div>
        <Text
          lineClamp={3}
          className="!text-xs text-justify text-mine-shaft-300"
        >
          {about}
        </Text>
      </div>
      <Divider size="xs" color="mineShaft.7" />
      {/* Salary and ob Posted Time */}
      <div className="flex justify-between">
        <span className="font-semibold text-mine-shaft-200">{expectedCtc}</span>
        <span className="flex gap-1 items-center text-xs text-mine-shaft-400">
          <IconMapPin /> {location}
        </span>
      </div>
      <Divider size="xs" color="mineShaft.7" />
      <div className="flex [&>*]:w-1/2 [&>*]:p-1">
        <Link to="/talent-profile">
          <Button variant="outline" color="brightSun.4" fullWidth>
            Profile
          </Button>
        </Link>
        <div>
          <Button variant="light" color="brightSun.4" fullWidth>
            Message
          </Button>
        </div>
      </div>
    </div>
  );
};
export default JobCard;
