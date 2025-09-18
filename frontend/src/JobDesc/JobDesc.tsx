import { ActionIcon, Button, Divider } from "@mantine/core";
import { IconBookmark, IconBookmarkFilled } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import { card } from "../Data/JobDescData";
import DOMPurify from "dompurify";
import { timeAgo } from "../Services/Utilities";
import { useDispatch, useSelector } from "react-redux";
import { changeProfile } from "../Slices/ProfileSlice";
import { useEffect, useState } from "react";

const JobDesc = (props: any) => {
  const data = DOMPurify.sanitize(props.description);
  const profile = useSelector((state) => state.profile);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [applied, setApplied] = useState(false);

  console.log(props.applicants);
  console.log(user);
  useEffect(() => {
    if (
      props.applicants?.filter(
        (applicant: any) =>
          applicant.applicantTd && applicant.applicantTd === user.profileId
      ).length > 0
    )
      setApplied(true);
    else setApplied(false);
  }, [props]);

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
    <div className="w-2/3">
      {/* Description */}
      <div className="flex justify-between">
        <div className="flex gap-2 items-center">
          <div className="p-3 bg-mine-shaft-800 rounded-xl">
            <img
              src={`/icons/${props.company}.png`}
              alt="Meta"
              className="h-14"
            />
          </div>
          <div className="flex flex-col gap-1">
            <div className="font-semibold text-2xl">{props.jobTitle}</div>
            <div className="text-lg text-mine-shaft-300">
              {props.company} &#x2022; {timeAgo(props.postTime)} &bull;{" "}
              {props.applicants ? props.applicants.length : 0} Applicants
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2 items-center">
          {(props.edit || !applied) && (
            <Link to={`/apply-job/${props.id}`}>
              <Button variant="light" color="brightSun.4" size="sm">
                {props.edit ? "Edit" : "Apply"}
              </Button>
            </Link>
          )}
          {applied && (
            <Button variant="light" color="green.8" size="sm">
              Applied
            </Button>
          )}
          {props.edit ? (
            <Button variant="outline" size="sm" color="red.5">
              Delete
            </Button>
          ) : profile.savedJobs?.includes(props.id) ? (
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
      </div>
      <Divider my="xl" />
      <div className="flex justify-between">
        {card.map((item, index) => (
          <div className="flex flex-col items-center gap-1" key={index}>
            <ActionIcon
              size="lg"
              variant="light"
              radius="xl"
              className="!h-12 !w-12"
              color="brightSun.4"
            >
              <item.icon stroke={1.5} className="h-4/5 w-4/5" />
            </ActionIcon>
            <div className="text-sm text-mine-shaft-300">{item.name}</div>
            <div className="font-semibold">
              {props ? props[item.id] : "NA"}{" "}
              {item.id === "packageOffered" && <>LPA</>}
            </div>
          </div>
        ))}
      </div>
      <Divider my="xl" />
      {/* Required Skills */}
      <div>
        <div className="text-xl font-semibold mb-5">Required Skills</div>
        <div className="flex flex-wrap gap-2">
          {props?.skillsRequired?.map((skill: any, index: number) => (
            <div key={index}>
              <ActionIcon
                size="lg"
                variant="light"
                radius="xl"
                className="!h-fit !w-fit font-medium !text-sm"
                color="brightSun.4"
                p="xs"
              >
                {skill}
              </ActionIcon>
            </div>
          ))}
        </div>
      </div>
      <Divider my="xl" />
      {/* Job Description */}
      <div
        dangerouslySetInnerHTML={{ __html: data }}
        className="[&_h4]:text-xl [&_*]:text-mine-shaft-300 [&_h4]:my-5 [&_h4]:font-semibold text-mine-shaft-200 [&_p]:text-justify [&_li]:marker:text-bright-sun-400 [&_li]:mb-1"
      ></div>
      <Divider my="xl" />
      {/* Company Card */}
      <div>
        <div className="text-xl font-semibold mb-5">About Company</div>
        <div className="flex justify-between mb-3">
          <div className="flex gap-2 items-center">
            <div className="p-3 bg-mine-shaft-800 rounded-xl">
              <img
                src={`/icons/${props.company}.png`}
                alt={props.company}
                className="h-8"
              />
            </div>
            <div className="flex flex-col">
              <div className="font-medium text-lg">{props.company}</div>
              <div className=" text-mine-shaft-300">10K+ Employees</div>
            </div>
          </div>
          <Link to={`/company/${props.company}`}>
            <Button variant="light" color="brightSun.4">
              Company Page
            </Button>
          </Link>
        </div>
        {/* Company description */}
        <div className="text-mine-shaft-300 text-justify">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nihil,
          labore quibusdam amet fugiat laborum minima ad nam, similique vero
          excepturi molestiae ullam, exercitationem deleniti. Temporibus dolore
          ut qui dolorum velit animi, est placeat rem vel cum nam consequuntur
          expedita possimus.
        </div>
      </div>
    </div>
  );
};
export default JobDesc;
