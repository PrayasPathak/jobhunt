import { Tabs } from "@mantine/core";
import Card from "./Card";
import { useEffect, useState } from "react";
import { getAllJobs } from "../Services/JobService";
import { useSelector } from "react-redux";

const JobHistory = () => {
  const [activeTab, setActiveTab] = useState<any>("APPLIED");
  const [jobList, setJobList] = useState<any>([]);
  const [showList, setShowList] = useState();
  const profile = useSelector((state) => state.profile);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    getAllJobs()
      .then((res) => {
        setJobList(res);

        setShowList(
          res.filter((job) => {
            let found = false;
            job.applicants?.forEach((applicant) => {
              if (
                applicant.applicantTd == user.profileId &&
                applicant.applicationStatus === "APPLIED"
              )
                found = true;
            });
            return found;
          })
        );
      })
      .catch((err) => console.log(err));
  }, []);

  const handleTabChange = (value: string | null) => {
    setActiveTab(value);
    if (value === "SAVED") {
      setShowList(jobList.filter((job) => profile.savedJobs?.includes(job.id)));
      console.log(showList);
    } else {
      setShowList(
        jobList.filter((job) => {
          let found = false;
          job.applicants?.forEach((applicant) => {
            if (
              applicant.applicantTd == user.profileId &&
              applicant.applicationStatus == value
            )
              found = true;
          });
          return found;
        })
      );
    }
  };

  return (
    <div className="">
      <div className="text-2xl font-semibold mb-5">Job History</div>
      <Tabs variant="outline" value={activeTab} onChange={handleTabChange}>
        <Tabs.List className="[&_button]:text-lg font-semibold mb-5 [&_button[data-active='true']]:text-bright-sun-400">
          <Tabs.Tab value="APPLIED">Applied</Tabs.Tab>
          <Tabs.Tab value="SAVED">Saved</Tabs.Tab>
          <Tabs.Tab value="OFFERED">Offered</Tabs.Tab>
          <Tabs.Tab value="INTERVIEWING">Interviewing</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value={activeTab}>
          <div className="mt-10 flex flex-wrap gap-5">
            {showList?.map((job, index) => (
              <Card
                key={index}
                {...job}
                applied
                {...{ [activeTab.toLowerCase()]: true }}
              />
            ))}
          </div>
        </Tabs.Panel>
      </Tabs>
    </div>
  );
};
export default JobHistory;
