import { Avatar } from "@mantine/core";
import { work } from "../Data/Data";

const Working = () => {
  return (
    <div className="mt-20 pb-5">
      <div className="text-4xl font-semibold text-mine-shaft-100 text-center mb-3">
        How it <span className="text-bright-sun-400">works</span>
      </div>
      <div className="text-xl text-mine-shaft-300 mx-auto w-1/2 mb-10">
        Effortlessly navigate through the process and land your dream job.
      </div>

      <div className="flex px-20 justify-between items-center">
        {/* Left */}
        <div className="relative">
          <img src="/working/girl.png" alt="Girl" className="w-[30rem]" />

          <div className="absolute w-36 flex flex-col justify-center items-center gap-1 border border-bright-sun-400 rounded-xl py-3 px-1 backdrop-blur-md top-[15%] right-0">
            <Avatar
              src="avatar1.png"
              alt="User avatar"
              className="!h-16 !w-16"
            />
            <div className="text-sm font-semibold text-mine-shaft-200 text-center">
              Complete your profile
            </div>
            <div className="text-xs text-mine-shaft-300">70% completed</div>
          </div>
        </div>
        {/* Right */}
        <div className="flex flex-col gap-10">
          {work.map((item, index) => (
            <div className="flex items-center gap-4" key={index}>
              <div className="p-2.5 bg-bright-sun-300 rounded-full">
                <img
                  src={`/working/${item.image}`}
                  alt={item.name}
                  className="h-12 w-12"
                />
              </div>
              <div>
                <div className="text-mine-shaft-200 font-semibold text-xl">
                  {item.name}
                </div>
                <div className="text-mine-shaft-300">{item.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Working;
