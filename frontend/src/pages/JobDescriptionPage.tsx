import { Button } from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import { Link, useParams } from "react-router-dom";
import JobDesc from "../JobDesc/JobDesc";
import RecommendedJobs from "../JobDesc/RecommendedJobs";
import { useEffect, useState } from "react";
import { getJobById } from "../Services/JobService";

const JobDescriptionPage = () => {
  const { id } = useParams();
  const [job, setJob] = useState<any>(null);

  console.log(job);

  useEffect(() => {
    window.scrollTo(0, 0);
    getJobById(id)
      .then((res) => {
        setJob(res);
      })
      .catch((err) => console.log(err));
  }, [id]);
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
      <div className="flex gap-5 justify-around">
        <JobDesc {...job} />
        <RecommendedJobs />
      </div>
    </div>
  );
};
export default JobDescriptionPage;
