import { Avatar, Button, Divider, Modal, Text } from "@mantine/core";
import { DateInput, TimeInput } from "@mantine/dates";
import { useDisclosure } from "@mantine/hooks";
import { IconCalendarMonth, IconHeart, IconMapPin } from "@tabler/icons-react";
import { useRef, useState } from "react";
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
  posted?: boolean;
  invited?: boolean;
}

const TalentCard = ({
  name,
  role,
  company,
  topSkills,
  about,
  expectedCtc,
  location,
  image,
  posted,
  invited,
}: Props) => {
  const [opened, { open, close }] = useDisclosure(false);
  const [date, setDate] = useState<string | null>(null);
  const ref = useRef<HTMLInputElement>(null);

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
      {invited ? (
        <div className="flex gap-1 text-mine-shaft-200 text-sm items-center">
          <IconCalendarMonth stroke={1.5} />
          Interview: September 11, 2025 15:00 PM
        </div>
      ) : (
        <div className="flex justify-between">
          <span className="font-semibold text-mine-shaft-200">
            {expectedCtc}
          </span>
          <span className="flex gap-1 items-center text-xs text-mine-shaft-400">
            <IconMapPin /> {location}
          </span>
        </div>
      )}

      <Divider size="xs" color="mineShaft.7" />
      <div className="flex [&>*]:w-1/2 [&>*]:p-1">
        {!invited && (
          <>
            <Link to="/talent-profile">
              <Button variant="outline" color="brightSun.4" fullWidth>
                Profile
              </Button>
            </Link>
            <div>
              {posted ? (
                <Button
                  variant="light"
                  color="brightSun.4"
                  fullWidth
                  rightSection={<IconCalendarMonth className="h-5 w-5" />}
                  onClick={open}
                >
                  Schedule
                </Button>
              ) : (
                <Button variant="light" color="brightSun.4" fullWidth>
                  Message
                </Button>
              )}
            </div>
          </>
        )}

        {invited && (
          <>
            <div>
              <Button variant="outline" color="brightSun.4" fullWidth>
                Accept
              </Button>
            </div>
            <div>
              <Button variant="light" color="red.5" fullWidth>
                Reject
              </Button>
            </div>
          </>
        )}
        <Modal
          opened={opened}
          onClose={close}
          title="Schedule Interview"
          centered
        >
          <div className="flex flex-col gap-4">
            <DateInput
              label="Date"
              placeholder="Enter Date"
              value={date}
              onChange={setDate}
              minDate={new Date()}
            />
            <TimeInput
              label="Time"
              ref={ref}
              onClick={() => ref.current?.showPicker()}
            />
            <Button variant="light" color="brightSun.4" fullWidth>
              Schedule
            </Button>
          </div>
        </Modal>
      </div>
    </div>
  );
};
export default TalentCard;
