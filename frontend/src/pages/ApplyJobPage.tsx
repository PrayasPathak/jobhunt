import { Button } from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import ApplyJob from "../ApplyJOb/ApplyJob";

const ApplyJobPage = () => {
  return (
    <div className="min-h-[100vh] bg-mine-shaft-950 font-['Poppins'] p-4">
      <Link to="/jobs" className="my-4 inline-block">
        <Button
          variant="light"
          color="brightSun.4"
          leftSection={<IconArrowLeft size={20} />}
        >
          Back
        </Button>
      </Link>
      <ApplyJob />
    </div>
  );
};
export default ApplyJobPage;
