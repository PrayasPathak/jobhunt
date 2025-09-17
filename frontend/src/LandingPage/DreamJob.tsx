import { Avatar, AvatarGroup, TextInput } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";

const DreamJob = () => {
  return (
    <div className="flex items-center px-16">
      {/* Left Section */}
      <div className="flex flex-col w-[45%] gap-3">
        <div className="text-6xl font-bold text-mine-shaft-100 [&>span]:text-bright-sun-400 leading-tight">
          Find your <span>dream job</span> with us
        </div>
        <div className="text-mine-shaft-200 text-lg">
          Good life begins with a good company. Start explore thousands of jobs
          in one place.
        </div>
        <div className="flex gap-3 mt-5">
          <TextInput
            variant="unstyled"
            label="Job Title"
            placeholder="Software Engineer"
            className="bg-mine-shaft-900 rounded-lg px-2 py-1 text-mine-shaft-100 [&_input]:!text-mine-shaft-100"
          />
          <TextInput
            className="bg-mine-shaft-900 rounded-lg px-2 py-1 text-mine-shaft-100 [&_input]:!text-mine-shaft-100"
            variant="unstyled"
            label="Job Type"
            placeholder="Full Time"
          />
          <div className="flex items-center justify-center h-full w-20 bg-bright-sun-400 hover:bg-bright-sun-500 cursor-pointer rounded-lg">
            <IconSearch className="h-[85%] w-[85%] text-mine-shaft-100 p-3" />
          </div>
        </div>
      </div>
      {/* Right Section */}
      <div className="w-[55%] flex items-center justify-center">
        <div className="w-[30rem] relative">
          <img src="/boy.png" alt="boy" />
          <div className="w-fit absolute top-[50%] -right-10 border-bright-sun-400 border rounded-lg p-2 backdrop-blur-md">
            <div className="text-center text-mine-shaft-100 mb-1 text-sm">
              10K+ got job
            </div>
            <AvatarGroup>
              <Avatar src="/avatar.png" />
              <Avatar src="/avatar1.png" />
              <Avatar src="/avatar2.png" />
              <Avatar>+9K</Avatar>
            </AvatarGroup>
          </div>

          <div className="w-fit absolute top-[28%] -left-5 border-bright-sun-400 border rounded-lg p-2 backdrop-blur-md flex flex-col gap-3">
            <div className="flex gap-2 items-center">
              <div className="w-10 h-10 p-1 bg-mine-shaft-900 rounded-lg">
                <img src="/google.png" alt="Google" />
              </div>
              <div className="text-sm text-mine-shaft-100">
                <div>Software Engineer</div>
                <div className="text-mine-shaft-200 text-xs">New York</div>
              </div>
            </div>
            <div className="flex justify-around gap-2 text-mine-shaft-200 text-sm">
              <span>1 day ago</span>
              <span>120 Applicants</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default DreamJob;
