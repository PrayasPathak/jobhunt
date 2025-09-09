import { Carousel, CarouselSlide } from "@mantine/carousel";
import { jobCategory } from "../Data/Data";
import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";

const JobCategpry = () => {
  return (
    <div className="mt-20 pb-5">
      <div className="text-4xl font-semibold text-mine-shaft-100 text-center mb-3">
        Browse <span className="text-bright-sun-400">Job</span> Category
      </div>
      <div className="text-xl text-mine-shaft-300 mx-auto w-1/2 mb-10">
        Explore diverse job opportunities tailored to your skills. Start your
        career journey today!
      </div>

      <Carousel
        slideSize="22%"
        slideGap="md"
        emblaOptions={{
          loop: true,
        }}
        nextControlIcon={<IconArrowRight className="h-8 w-8" />}
        previousControlIcon={<IconArrowLeft className="h-8 w-8" />}
        className="focus-visible:[&_button]:!outline-none [&_button]:!bg-bright-sun-400 [&_button]:!border-none [&_button]:hover:!opacity-75 [&_button]:opacity-0 hover:[&_button]:opacity-100"
      >
        {jobCategory.map((category, index) => (
          <CarouselSlide key={index}>
            <div className="flex flex-col items-center w-64 gap-2 border border-bright-sun-400 p-5 rounded-xl hover:cursor-pointer hover:shadow-[0_0_5px_2px_black] my-5 !shadow-bright-sun-300 transition duration-300 ease-in-out">
              <div className="p-2 rounded-full bg-bright-sun-300">
                <img
                  className="h-8 w-8"
                  src={`/category/${category.name}.png`}
                  alt={category.name}
                />
              </div>
              <div className="text-mine-shaft-100 text-lg font-semibold">
                {category.name}
              </div>
              <div className="text-sm text-mine-shaft-300 text-center">
                {category.desc}
              </div>
              <div className="text-bright-sun-300 text-lg">
                {category.jobs}+ new jobs posted
              </div>
            </div>
          </CarouselSlide>
        ))}
      </Carousel>
    </div>
  );
};
export default JobCategpry;
