import { ActionIcon, Divider, TagsInput, Textarea } from "@mantine/core";
import {
  IconBriefcase,
  IconDeviceFloppy,
  IconMapPin,
  IconPencil,
  IconPlus,
} from "@tabler/icons-react";
import { useState } from "react";
import fields from "../Data/Profile";
import CertiCard from "./CertiCard";
import ExpCard from "./ExpCard";
import { SelectInput } from "./SelectInput";
import ExpInput from "./ExpInput";
import CertiInput from "./CertiInput";

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

const Profile = (props: Props) => {
  const [edit, setEdit] = useState([false, false, false, false, false]);
  const select = fields;
  const [about, setAbout] = useState(props.about);
  const [skills, setSkills] = useState<string[]>(props.skills);
  const [addExp, setAddExp] = useState(false);
  const [addCerti, setAddCerti] = useState(false);

  const handleEdit = (index: number) => {
    const newEdit = [...edit];
    newEdit[index] = !newEdit[index];
    setEdit(newEdit);
  };

  return (
    <div className="w-4/5 mx-auto">
      {/* Left */}
      <div className="relative">
        <img src="/profile/banner.jpg" alt="Banner" className="rounded-t-2xl" />
        <img
          src="/avatar.png"
          alt="Avatar"
          className="rounded-full h-48 w-48  absolute -bottom-1/3 left-3 border-8 border-mine-shaft-950"
        />
      </div>
      <div className="px-3 mt-20">
        <div className="text-3xl font-semibold flex justify-between">
          {props.name}
          <ActionIcon variant="subtle" color="brightSun.4" size="lg">
            {edit[0] ? (
              <IconDeviceFloppy
                className="h-4/5 w-4/5"
                onClick={() => handleEdit(0)}
              />
            ) : (
              <IconPencil
                className="h-4/5 w-4/5"
                onClick={() => handleEdit(0)}
              />
            )}
          </ActionIcon>
        </div>
        {edit[0] ? (
          <>
            <div className="flex gap-10 [&>*]:w-1/2">
              <SelectInput {...select[0]} />
              <SelectInput {...select[1]} />
            </div>
            <SelectInput {...select[2]} />
          </>
        ) : (
          <>
            <span className="text-lg flex gap-1 items-center">
              <IconBriefcase className="h-5 w-5" stroke={1.5} />
              {props.role} &bull; {props.company}
            </span>
            <span className="flex gap-1 items-center text-xs text-mine-shaft-300">
              <IconMapPin className="h-5 w-5" stroke={1.5} /> {props.location}
            </span>
          </>
        )}
      </div>
      {/* About*/}
      <Divider my="xl" mx="xs" />
      <div className="p-3">
        <div className="text-2xl font-semibold mb-3 flex justify-between">
          About{" "}
          <ActionIcon variant="subtle" color="brightSun.4" size="lg">
            {edit[1] ? (
              <IconDeviceFloppy
                className="h-4/5 w-4/5"
                onClick={() => handleEdit(1)}
              />
            ) : (
              <IconPencil
                className="h-4/5 w-4/5"
                onClick={() => handleEdit(1)}
              />
            )}
          </ActionIcon>
        </div>
        {edit[1] ? (
          <Textarea
            autosize
            minRows={3}
            placeholder="Enter about yourself"
            value={about}
            onChange={(e) => setAbout(e.target.value)}
          />
        ) : (
          <div className="text-sm text-mine-shaft-300 text-justify">
            {about}
          </div>
        )}
      </div>

      {/* Skills */}
      <Divider my="xl" mx="xs" />
      <div className="p-3">
        <div className="text-2xl font-semibold mb-3 flex justify-between">
          Skills{" "}
          <ActionIcon variant="subtle" color="brightSun.4" size="lg">
            {edit[2] ? (
              <IconDeviceFloppy
                className="h-4/5 w-4/5"
                onClick={() => handleEdit(2)}
              />
            ) : (
              <IconPencil
                className="h-4/5 w-4/5"
                onClick={() => handleEdit(2)}
              />
            )}
          </ActionIcon>
        </div>
        {edit[2] ? (
          <TagsInput
            splitChars={[",", "|", " "]}
            placeholder="Add Skill"
            value={skills}
            onChange={setSkills}
          />
        ) : (
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
        )}
      </div>

      {/* Experience */}
      <Divider my="xl" mx="xs" />
      <div>
        <div className="text-2xl font-semibold mb-4 flex justify-between">
          Experience
          <div className="flex gap-2">
            <ActionIcon variant="subtle" color="brightSun.4" size="lg">
              <IconPlus
                className="h-4/5 w-4/5"
                onClick={() => setAddExp(true)}
              />
            </ActionIcon>
            <ActionIcon variant="subtle" color="brightSun.4" size="lg">
              {edit[3] ? (
                <IconDeviceFloppy
                  className="h-4/5 w-4/5"
                  onClick={() => handleEdit(3)}
                />
              ) : (
                <IconPencil
                  className="h-4/5 w-4/5"
                  onClick={() => handleEdit(3)}
                />
              )}
            </ActionIcon>
          </div>
        </div>
        <div className="flex flex-col gap-8">
          {props.experience.map((exp, index) => (
            <ExpCard key={index} {...exp} edit={edit[3]} />
          ))}
          {addExp && <ExpInput setEdit={setAddExp} add />}
        </div>
      </div>

      {/* Certification */}
      <Divider my="xl" mx="xs" />
      <div className="p-3">
        <div className="text-2xl font-semibold mb-5 flex justify-between">
          Certifications
          <div className="flex gap-2">
            <ActionIcon variant="subtle" color="brightSun.4" size="lg">
              <IconPlus
                className="h-4/5 w-4/5"
                onClick={() => setAddCerti(true)}
              />
            </ActionIcon>
            <ActionIcon variant="subtle" color="brightSun.4" size="lg">
              {edit[4] ? (
                <IconDeviceFloppy
                  className="h-4/5 w-4/5"
                  onClick={() => handleEdit(4)}
                />
              ) : (
                <IconPencil
                  className="h-4/5 w-4/5"
                  onClick={() => handleEdit(4)}
                />
              )}
            </ActionIcon>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          {props.certifications.map((cert, index) => (
            <CertiCard key={index} {...cert} edit={edit[4]} />
          ))}
          {addCerti && <CertiInput setEdit={setAddCerti} add />}
        </div>
      </div>
    </div>
  );
};
export default Profile;
