import { Button, Divider } from "@mantine/core";
import { IconBriefcase, IconMapPin } from "@tabler/icons-react";
import ExpCard from "./ExpCard";
import CertiCard from "./CertiCard";

interface Experience {
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
}

interface Certification {
  name: string;
  issuer: string;
  issueDate: string;
  certificateId: string;
}

interface Props {
  name: string;
  role: string;
  company: string;
  location: string;
  about: string;
  skills: string[];
  experience: Array<Experience>;
  certifications: Array<Certification>;
}

const Profile = ({
  name,
  role,
  company,
  location,
  about,
  skills,
  experience,
  certifications,
}: Props) => {
  return (
    <div className="w-2/3">
      {/* Left */}
      <div className="relative">
        <img src="/profile/banner.jpg" alt="Banner" className="rounded-t-2xl" />
        <img
          src="/avatar.png"
          alt="Avatar"
          className="rounded-full h-48 w-48  absolute -bottom-1/3 left-3 border-8 border-mine-shaft-950"
        />
      </div>
      <div className="px-3 mt-16">
        <div className="text-3xl font-semibold flex justify-between">
          {name}
          <Button color="brightSun.4" variant="light">
            Message
          </Button>
        </div>
        <span className="text-lg flex gap-1 items-center">
          <IconBriefcase className="h-5 w-5" stroke={1.5} />
          {role} &bull; {company}
        </span>
        <span className="flex gap-1 items-center text-xs text-mine-shaft-300">
          <IconMapPin className="h-5 w-5" stroke={1.5} /> {location}
        </span>
      </div>
      {/* About*/}
      <Divider my="xl" mx="xs" />
      <div className="p-3">
        <div className="text-2xl font-semibold mb-3">About</div>
        <div className="text-sm text-mine-shaft-300 text-justify">{about}</div>
      </div>

      {/* Skills */}
      <Divider my="xl" mx="xs" />
      <div className="p-3">
        <div className="text-2xl font-semibold mb-3">Skills</div>
        <div className="flex flex-wrap gap-2">
          {skills.map((skill, index) => (
            <div
              key={index}
              className="bg-bright-sun-300 text-sm font-medium bg-opacity-15 rounded-3xl text-bright-sun-400 px-3 py-1"
            >
              {skill}
            </div>
          ))}
        </div>
      </div>

      {/* Experience */}
      <Divider my="xl" mx="xs" />
      <div className="p-3">
        <div className="text-2xl font-semibold mb-5">Experience</div>
        <div className="flex flex-col gap-3">
          {experience.map((exp, index) => (
            <ExpCard key={index} {...exp} />
          ))}
        </div>
      </div>

      {/* Certification */}
      <Divider my="xl" mx="xs" />
      <div className="p-3">
        <div className="text-2xl font-semibold mb-5">Certifications</div>
        <div className="flex flex-col gap-3">
          {certifications.map((cert, index) => (
            <CertiCard key={index} {...cert} />
          ))}
        </div>
      </div>
    </div>
  );
};
export default Profile;
