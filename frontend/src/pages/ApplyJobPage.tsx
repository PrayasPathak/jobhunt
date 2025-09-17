import { Button } from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import ApplyJob from "../ApplyJob/ApplyJob";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getJobById } from "../Services/JobService";

const ApplyJobPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [job, setJob] = useState([{}]);

  useEffect(() => {
    window.scrollTo(0, 0);
    getJobById(id)
      .then((res) => setJob(res))
      .catch((err) => console.log(err));
  }, [id]);
  return (
    <div className="min-h-[100vh] bg-mine-shaft-950 font-['Poppins'] p-4">
      <Button
        onClick={() => navigate(-1)}
        variant="light"
        color="brightSun.4"
        leftSection={<IconArrowLeft size={20} />}
      >
        Back
      </Button>

      <ApplyJob {...job} />
    </div>
  );
};
export default ApplyJobPage;
