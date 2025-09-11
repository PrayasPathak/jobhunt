import { ActionIcon } from "@mantine/core";
import { IconExternalLink } from "@tabler/icons-react";

interface Props {
  name: string;
  employees: number;
}

const CompanyCard = ({ name, employees }: Props) => {
  return (
    <div>
      <div className="flex justify-between bg-mine-shaft-900 items-center rounded-lg p-2">
        <div className="flex gap-2 items-center">
          <div className="p-2 bg-mine-shaft-800 rounded-md">
            <img src={`/icons/${name}.png`} alt="Meta" className="h-7" />
          </div>
          <div>
            <div>{name}</div>
            <div className="text-sm text-mine-shaft-300 font-semibold">
              {employees} emplyees
            </div>
          </div>
        </div>
        <ActionIcon color="brightSun.4" variant="subtle">
          <IconExternalLink />
        </ActionIcon>
      </div>
    </div>
  );
};
export default CompanyCard;
