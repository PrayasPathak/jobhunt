import { ActionIcon, Button, Divider } from "@mantine/core";
import { IconBookmark } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import { card, desc, skills } from "../Data/JobDescData";
import DOMPurify from "dompurify";

const JobDesc = () => {
  const data = DOMPurify.sanitize(desc);
  return (
    <div className="w-2/3">
      {/* Description */}
      <div className="flex justify-between">
        <div className="flex gap-2 items-center">
          <div className="p-3 bg-mine-shaft-800 rounded-xl">
            <img src={`/icons/Google.png`} alt="Meta" className="h-14" />
          </div>
          <div className="flex flex-col gap-1">
            <div className="font-semibold text-2xl">Software Engineer III</div>
            <div className="text-lg text-mine-shaft-300">
              Google &#x2022; 3 days ago &bull; 48 Applicants
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2 items-center">
          <Link to="/apply-job">
            <Button variant="light" color="brightSun.4" size="sm">
              Apply
            </Button>
          </Link>
          <IconBookmark className="text-bright-sun-400 cursor-pointer" />
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
            <div className="font-semibold">{item.value}</div>
          </div>
        ))}
      </div>
      <Divider my="xl" />
      {/* Required Skills */}
      <div>
        <div className="text-xl font-semibold mb-5">Required Skills</div>
        <div className="flex flex-wrap gap-2">
          {skills.map((skill, index) => (
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
              <img src={`/icons/Google.png`} alt="Meta" className="h-8" />
            </div>
            <div className="flex flex-col">
              <div className="font-medium text-lg">Google</div>
              <div className=" text-mine-shaft-300">10K+ Employees</div>
            </div>
          </div>
          <Link to="">
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
