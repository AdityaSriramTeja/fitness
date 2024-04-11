import { DetailChips } from "@/components/shared/detailChips";
import React from "react";

const RouteDetails = () => {
  return (
    <div className="relative p-10 flex flex-col gap-y-5 ">
      <button className=" bg-green-600 h-20 w-20 text-5xl rounded-full z-[10] opacity-85  hover:bg-green-700/80 fixed bottom-10 right-10">
        {" "}
        +{" "}
      </button>
      <section className="  flex flex-col gap-y-5  ">
        <h1 className="text-lg font-bold"> Push ups </h1>
        <p className="opacity-[80%]">
          5 sets of 10 push ups each
          {/* Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin
          consequat commodo lorem. Aenean non molestie urna. Morbi lacinia
          congue dui, sodales interdum metus accumsan eget. Nullam venenatis
          erat quis nulla cursus, vel aliquam purus fermentum. Mauris sit amet
          elementum dolor. Maecenas cursus lorem dignissim rutrum luctus. Mauris
          fringilla sit amet dolor at interdum. Pellentesque eget posuere augue,
          a mollis nunc. Nam luctus aliquam nisl nec porta. Nam diam tortor,
          aliquet quis hendrerit eget, tempus a nibh. Cras in nulla nec est
          finibus facilisis. Nullam et malesuada libero. Pellentesque habitant
          morbi tristique senectus et netus et malesuada fames ac turpis
          egestas. Cras tellus lectus, accumsan nec suscipit at, fringilla ut
          elit. Nulla id finibus magna. Aenean in nisl mi. Mauris ultricies
          luctus luctus. In efficitur porttitor ex. Morbi sollicitudin at lectus
          id tincidunt. Curabitur risus velit, aliquet et sem et, consectetur
          egestas felis. Praesent sagittis magna justo, vel ullamcorper felis
          luctus eget. Nam sagittis dapibus volutpat. Etiam facilisis orci non
          metus dictum suscipit. Etiam sed elit auctor, pretium lectus in,
          rutrum enim. Integer vel mollis leo. Ut quis mi eget nisi ornare
          mattis in vel leo. Vestibulum eleifend mauris non maximus tempor.
          Donec vitae malesuada erat. Integer eget gravida sem, nec sodales
          nisl. Aliquam quis sodales nisi. Proin auctor cursus mi, pulvinar
          tempor leo ultricies ut. Integer id lacus quis nulla sagittis posuere
          et vel odio. Proin at lacus ex. Aenean blandit consequat mauris id
          gravida. Nulla malesuada est nec velit porttitor, at pretium risus
          mattis. In non orci aliquet diam venenatis auctor. Integer in ligula
          in diam maximus egestas. Nunc nec pharetra nisi. Sed non imperdiet
          ligula, ut malesuada dui. Nullam et neque id mauris malesuada pulvinar
          eget et dui. Aliquam efficitur congue porta. Suspendisse maximus
          laoreet felis in venenatis. In vitae lacinia nunc, in facilisis risus.
          Sed in rutrum ipsum, in convallis ligula. Sed convallis, nibh et
          porttitor pharetra, metus lacus accumsan lorem, vel condimentum dolor
          tortor non risus. Nullam malesuada vel dolor vel lobortis. Duis
          malesuada sapien sit amet accumsan viverra. Aliquam tincidunt libero
          tortor, non tincidunt velit interdum non. Donec aliquet luctus porta.
          Etiam at bibendum tellus, et condimentum arcu. Ut sed diam sed mi
          iaculis congue in at magna. Nunc venenatis posuere justo ac vehicula.{" "} */}
        </p>

        <div className="flex gap-x-5 w-full flex-wrap">
          Tags:
          <DetailChips label="heart" />
          <DetailChips label="intense" />
        </div>
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
      </section>
      {/* <span className="w-full flex justify-center border-b-[1px]">
        <h2> Modules </h2>{" "}
      </span>
      <section className="space-y-5">
        <div className="border-[1px] flex flex-col gap-y-5 w-full rounded-lg p-10 capitalize">
          <h3>Title: push ups</h3>
          <p>Description: 3 sets of 10 push ups </p>
          <span className="flex gap-x-4">
            {" "}
            Number of rests: <h5> 3 </h5>
          </span>
          <span className="flex gap-x-4">
            {" "}
            Duration of each rest: <h5> 23 minutes </h5>
          </span>
          <span className="flex gap-x-4">
            {" "}
            Expected time to finish module: <h5> 40 minutes </h5>
          </span>
          <span className="flex gap-x-4 font-bold">
            {" "}
            Frequency (every week): <h5> Monday and Sunday </h5>
          </span>
        </div>
        <div className="border-[1px] flex flex-col gap-y-5 w-full rounded-lg p-10 capitalize">
          <h3>Title: push ups</h3>
          <p>Description: 3 sets of 10 push ups </p>
          <span className="flex gap-x-4">
            {" "}
            Number of rests: <h5> 3 </h5>
          </span>
          <span className="flex gap-x-4">
            {" "}
            Duration of each rest: <h5> 23 minutes </h5>
          </span>
          <span className="flex gap-x-4">
            {" "}
            Expected time to finish module: <h5> 40 minutes </h5>
          </span>
          <span className="flex gap-x-4 font-bold">
            {" "}
            Frequency (every week): <h5> Monday and Sunday </h5>
          </span>
        </div>
        <div className="border-[1px] flex flex-col gap-y-5 w-full rounded-lg p-10 capitalize">
          <h3>Title: push ups</h3>
          <p>Description: 3 sets of 10 push ups </p>
          <span className="flex gap-x-4">
            {" "}
            Number of rests: <h5> 3 </h5>
          </span>
          <span className="flex gap-x-4">
            {" "}
            Duration of each rest: <h5> 23 minutes </h5>
          </span>
          <span className="flex gap-x-4">
            {" "}
            Expected time to finish module: <h5> 40 minutes </h5>
          </span>
          <span className="flex gap-x-4 font-bold">
            {" "}
            Frequency (every week): <h5> Monday and Sunday </h5>
          </span>
        </div>
      </section> */}
    </div>
  );
};

export default RouteDetails;
