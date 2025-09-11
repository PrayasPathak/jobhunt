import { Avatar, AvatarGroup, Divider, Tabs } from "@mantine/core";
import { IconMapPin } from "@tabler/icons-react";
import AboutCompany from "./AboutCompany";
import CompanyEmployees from "./CompanyEmployees";
import CompanyJobs from "./CompanyJobs";

const CompanyProfile = () => {
  return (
    <div className="w-3/4">
      <div className="relative">
        <img src="/profile/banner.jpg" alt="Avatar" className="rounded-t-2xl" />
        <img
          src="/icons/Google.png"
          alt="Banner"
          className="rounded-3xl h-48 w-48  absolute -bottom-1/4 left-5 border-8 border-mine-shaft-950 bg-mine-shaft-950 p-2"
        />
      </div>
      <div className="px-3 mt-12">
        <div className="text-3xl font-semibold flex justify-between">
          Google
          <AvatarGroup>
            <Avatar src="avatar.png" />
            <Avatar src="avatar1.png" />
            <Avatar src="avatar2.png" />
            <Avatar>10k+</Avatar>
          </AvatarGroup>
        </div>
        <span className="flex gap-1 items-center text-xs text-mine-shaft-300">
          <IconMapPin className="h-5 w-5" stroke={1.5} /> New York
        </span>
      </div>
      {/* About*/}
      <Divider my="xl" mx="xs" />
      <div>
        <Tabs variant="outline" defaultValue="about">
          <Tabs.List className="[&_button]:text-lg font-semibold mb-5 [&_button[data-active='true']]:text-bright-sun-400">
            <Tabs.Tab value="about">About</Tabs.Tab>
            <Tabs.Tab value="jobs">Jobs</Tabs.Tab>
            <Tabs.Tab value="employees">Employees</Tabs.Tab>
          </Tabs.List>
          <Tabs.Panel value="about">
            <AboutCompany />
          </Tabs.Panel>
          <Tabs.Panel value="jobs">
            <CompanyJobs />
          </Tabs.Panel>
          <Tabs.Panel value="employees">
            <CompanyEmployees />
          </Tabs.Panel>
        </Tabs>
      </div>
    </div>
  );
};
export default CompanyProfile;
