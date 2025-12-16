import { MagicCard } from "~/components/ui/magic-card";

const ExperienceGrid = () => {
  return (
    <div className="grid gap-4 grid-cols-[repeat(auto-fit,minmax(300px,1fr))]">
      <MagicCard
        gradientColor="#ffffff"
        gradientFrom="#ffffff"
        gradientTo="#ffffff"
        className="rounded-lg overflow-hidden transition hover:shadow-md sm:h-[27rem] h-max sm:gap-5 col-span-2 "
      >
        <div className="w-full h-70  ">
          <img
            src="/images/project-3.png"
            alt="image"
            className="object-cover  w-full h-full"
          />
        </div>
        <div className="flex justify-center items-center">
          <h2>Title lorem ipsum</h2>
          <p>
            Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem
            ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum{" "}
          </p>
        </div>
      </MagicCard>

      <MagicCard
        gradientColor="#ffffff"
        gradientFrom="#ffffff"
        gradientTo="#ffffff"
        className="rounded-lg overflow-hidden transition hover:shadow-md sm:h-[27rem] h-max sm:gap-5 col-span-1 "
      >
        <div>
          <img src="/images/project-3.png" alt="image" />
        </div>
        <div className="flex justify-center items-center">
          <h2>Title lorem ipsum</h2>
          <p>
            Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem
            ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum{" "}
          </p>
        </div>
      </MagicCard>

      <MagicCard
        gradientColor="#ffffff"
        gradientFrom="#ffffff"
        gradientTo="#ffffff"
        className="rounded-lg overflow-hidden transition hover:shadow-md sm:h-[27rem] h-max sm:gap-5 col-span-1 "
      >
        <div>
          <img src="/images/project-3.png" alt="image" />
        </div>
        <div className="flex justify-center items-center">
          <h2>Title lorem ipsum</h2>
          <p>
            Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem
            ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum{" "}
          </p>
        </div>
      </MagicCard>

      <MagicCard
        gradientColor="#ffffff"
        gradientFrom="#ffffff"
        gradientTo="#ffffff"
        className="rounded-lg overflow-hidden transition hover:shadow-md sm:h-[27rem] h-max sm:gap-5 col-span-2 "
      >
        <div>
          <img src="/images/project-3.png" alt="image" />
        </div>
        <div className="flex justify-center items-center">
          <h2>Title lorem ipsum</h2>
          <p>
            Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem
            ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum{" "}
          </p>
        </div>
      </MagicCard>
    </div>
  );
};

export default ExperienceGrid;
