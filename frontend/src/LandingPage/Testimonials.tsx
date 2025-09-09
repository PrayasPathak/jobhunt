import { Avatar, Rating } from "@mantine/core";
import { testimonials } from "../Data/Data";

const Testimonials = () => {
  return (
    <div className="mt-20 pb-5">
      <div className="text-4xl font-semibold text-mine-shaft-100 text-center mb-3">
        What <span className="text-bright-sun-400">User </span> say about us?
      </div>

      <div className="flex justify-evenly">
        {testimonials.map((item, index) => (
          <div
            className="flex flex-col gap-3 w-[23%] border border-bright-sun-400 p-3 rounded-xl mt-10"
            key={index}
          >
            <div className="flex gap-2 items-center">
              <Avatar src="avatar.png" alt="avatar" className="w-14 h-14" />
              <div>
                <div className="text-lg text-mine-shaft-100 font-semibold">
                  {item.name}
                </div>
                <Rating value={item.rating} fractions={2} readOnly />
              </div>
            </div>

            <div className="text-xs text-mine-shaft-300">
              {item.testimonial}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Testimonials;
