import { Divider, Text } from "@mantine/core";
import { IconBookmark, IconClockHour3 } from "@tabler/icons-react";

interface Props {
  company: string;
  applicants: number;
  jobTitle: string;
  experience: string;
  jobType: string;
  location: string;
  jobPackage: string;
  postedDaysAgo: number;
  description: string;
}

const JobCard = ({
  company,
  applicants,
  jobTitle,
  experience,
  jobType,
  location,
  jobPackage,
  postedDaysAgo,
  description,
}: Props) => {
  return (
    <div className="bg-mine-shaft-900 p-4 w-80 flex flex-col gap-3 rounded-xl hover:shadow-[0_0_5px_1px_yellow] !shadow-bright-sun-400 cursor-pointer">
      <div className="flex justify-between">
        <div className="flex gap-2 items-center">
          <div className="p-2 bg-mine-shaft-800 rounded-md">
            <img src={`/icons/${company}.png`} alt="Meta" className="h-7" />
          </div>
          <div>
            <div>{jobTitle}</div>
            <div className="text-sm text-mine-shaft-300 font-semibold">
              {company} &#x2022; {applicants} Applicants
            </div>
          </div>
        </div>
        <IconBookmark className="text-mine-shaft-300 cursor-pointer" />
      </div>
      {/* Job Titles */}
      <div className="flex gap-2 [&>span]:py-1 [&>span]:px-2 [&>span]:bg-mine-shaft-800 [&>span]:text-bright-sun-400 [&>span]:rounded-lg text-xs">
        <span>{experience}</span>
        <span>{jobType}</span>
        <span>{location}</span>
      </div>
      {/* Job Description */}
      <div>
        <Text
          lineClamp={3}
          className="!text-xs text-justify text-mine-shaft-300"
        >
          {description}
        </Text>
      </div>
      <Divider size="xs" color="mineShaft.7" />
      {/* Salary and ob Posted Time */}
      <div className="flex justify-between">
        <span className="font-semibold text-mine-shaft-200">
          &#8377; {jobPackage}
        </span>
        <span className="flex gap-1 items-center text-xs text-mine-shaft-400">
          <IconClockHour3 stroke={1.5} className="h-5 w-5" /> {postedDaysAgo}{" "}
          days ago
        </span>
      </div>
    </div>
  );
};
export default JobCard;
