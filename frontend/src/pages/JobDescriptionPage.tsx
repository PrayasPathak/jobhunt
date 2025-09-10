import { Button } from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import { Link } from "react-router-dom";

const JobDescriptionPage = () => {
  return (
    <div className="min-h-[100vh] bg-mine-shaft-950 font-['Poppins'] p-4">
      <Link to="/find-jobs" className="my-4 inline-block">
        <Button
          variant="light"
          color="brightSun.4"
          leftSection={<IconArrowLeft size={20} />}
        >
          Back
        </Button>
      </Link>
      <div className="flex gap-5"></div>
    </div>
  );
};
export default JobDescriptionPage;
