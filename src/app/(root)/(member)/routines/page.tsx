import { RedirectButton } from "@/components/shared/redirectBtn";
import React from "react";
import { RoutineDetailChips } from "@/components/shared/routine/routine-detail-chips";
const RoutinesPage = () => {
  return (
    <div className="flex gap-x-5 h-full overflow-y-auto">
      <aside className="flex min-h-full h-full  items-center justify-center  w-[15vw] border-r-[1px]">
        {" "}
        query section{" "}
      </aside>

      <div className="w-full h-full flex flex-col gap-y-5">
        <section className="border-b-[1px] py-5">pagination section </section>
        <section className="h-full flex flex-wrap overflow-y-auto">
          <div className="flex flex-col  w-[300px] rounded-xl border-[1px] items-start p-5 gap-y-5">
            <h2> Name </h2>
            <p className="opacity-[70%] line-clamp-4 ">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin
              consequat commodo lorem. Aenean non molestie urna. Morbi lacinia
              congue dui, sodales interdum metus accumsan eget. Nullam venenatis
              erat quis nulla cursus, vel aliquam purus fermentum. Mauris sit
              amet elementum dolor. Maecenas cursus lorem dignissim rutrum
              luctus. Mauris fringilla sit amet dolor at interdum. Pellentesque
              eget posuere augue, a mollis nunc. Nam luctus aliquam nisl nec
              porta. Nam diam tortor, aliquet quis hendrerit eget, tempus a
              nibh. Cras in nulla nec est finibus facilisis. Nullam et malesuada
              libero. Pellentesque habitant morbi tristique senectus et netus et
              malesuada fames ac turpis egestas. Cras tellus lectus, accumsan
              nec suscipit at, fringilla ut elit.{" "}
            </p>
            {/* item chips */}

            <RoutineDetailChips />
            <span className="flex gap-x-4">
              {" "}
              Duration: <h5> 60 </h5>
            </span>
            <span className="flex gap-x-4">
              {" "}
              Modules: <h5> 5 </h5>
            </span>
            <span className="flex gap-x-4">
              {" "}
              Level: <h5> Beginner </h5>
            </span>
            <span className="flex gap-x-4">
              {" "}
              Cost: <h5> Free </h5>
            </span>
            <RedirectButton route="/routines/1"> More Details </RedirectButton>
            <button className="p-3 bg-green-600 w-full rounded-xl hover:bg-green-700/80">
              {" "}
              Add course{" "}
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default RoutinesPage;
