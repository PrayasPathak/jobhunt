import { Button, Divider, Text } from "@mantine/core";
import {
  IconBookmark,
  IconBookmarkFilled,
  IconCalendarMonth,
  IconClockHour3,
} from "@tabler/icons-react";
import { Link } from "react-router-dom";
import { timeAgo } from "../Services/Utilities";
import { useDispatch, useSelector } from "react-redux";
import { changeProfile } from "../Slices/ProfileSlice";

const Card = (props: any) => {
  const profile = useSelector((state) => state.profile);
  const dispatch = useDispatch();

  const handleSaveJob = () => {
    let savedJobs = [...profile.savedJobs];
    if (savedJobs?.includes(props.id)) {
      savedJobs = savedJobs?.filter((id) => id !== props.id);
    } else {
      savedJobs = [...savedJobs, props.id];
    }
    const updatedProfile = { ...profile, savedJobs: savedJobs };
    dispatch(changeProfile(updatedProfile));
  };

  return (
    <div className="bg-mine-shaft-900 p-4 w-80 flex flex-col gap-3 rounded-xl hover:shadow-[0_0_5px_1px_yellow] !shadow-bright-sun-400 cursor-pointer">
      <div className="flex justify-between">
        <div className="flex gap-2 items-center">
          <div className="p-2 bg-mine-shaft-800 rounded-md">
            <img
              src={`/icons/${props.company}.png`}
              alt="Meta"
              className="h-7"
            />
          </div>
          <div>
            <div>{props.jobTitle}</div>
            <div className="text-sm text-mine-shaft-300 font-semibold">
              {props.company} &#x2022;{" "}
              {props.applicants ? props.applicants.length : 0} Applicants
            </div>
          </div>
        </div>
        {profile.savedJobs?.includes(props.id) ? (
          <IconBookmarkFilled
            className="cursor-pointer text-bright-sun-400"
            stroke={1.5}
            onClick={handleSaveJob}
          />
        ) : (
          <IconBookmark
            className="text-mine-shaft-300 cursor-pointer hover:text-bright-sun-400"
            stroke={1.5}
            onClick={handleSaveJob}
          />
        )}
      </div>
      {/* Job Titles */}
      <div className="flex gap-2 [&>span]:py-1 [&>span]:px-2 [&>span]:bg-mine-shaft-800 [&>span]:text-bright-sun-400 [&>span]:rounded-lg text-xs">
        <span>{props.experience}</span>
        <span>{props.jobType}</span>
        <span>{props.location}</span>
      </div>
      {/* Job Description */}
      <div>
        <Text
          lineClamp={3}
          className="!text-xs text-justify text-mine-shaft-300"
        >
          {props.about}
        </Text>
      </div>
      <Divider size="xs" color="mineShaft.7" />
      {/* Salary and ob Posted Time */}
      <div className="flex justify-between">
        <span className="font-semibold text-mine-shaft-200">
          &#8377; {props.packageOffered} LPA
        </span>
        <span className="flex gap-1 items-center text-xs text-mine-shaft-400">
          <IconClockHour3 stroke={1.5} className="h-5 w-5" />{" "}
          {props.applied || props.interviewing
            ? "Applied"
            : props.offered
            ? "Interviewed"
            : "Posted"}{" "}
          {timeAgo(props.postTime)}
        </span>
      </div>
      {(props.offered || props.interviewing) && <Divider color="mineShaft.4" />}
      {props.offered && (
        <div className="flex gap-2">
          <Button color="brightSun.4" variant="outline" fullWidth>
            Accept
          </Button>
          <Button color="red.5" variant="light" fullWidth>
            Reject
          </Button>
        </div>
      )}

      {props.interviewing && (
        <div className="flex gap-1 text-sm items-center">
          <IconCalendarMonth
            stroke={1.5}
            className="text-bright-sun-400 h-5 w-5"
          />
          Thursday 11, 2025 &bull;{" "}
          <span className="text-mine-shaft-400">15:00 PM</span>
        </div>
      )}
      <Link to={`/jobs/${props.id}`}>
        <Button fullWidth color="brightSun.4" variant="outline">
          View
        </Button>
      </Link>
    </div>
  );
};
export default Card;
