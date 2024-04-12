import React from "react";
import Navbar from "@/components/shared/Navbar";
import { MemberAchievements } from "@/components/memberAchievements";
import MemberClassEnrolled from "@/components/shared/member/classEnrolled";
import { MemberFitnessGoal } from "@/components/shared/member/fitnessGoal";
import { routes } from "../../trainer/layout";

export default function PublicProfile({ params }: { params: { username: string } }) {
  // const { data: achivements, inProgress: achivementLoading } = useQuery({
  //   queryKey: ["userachievements", username];

  // })
  return (
    <div className="h-full flex flex-col gap-y-10">
      <Navbar routes={routes} />
      <div className="px-20 py-10 space-y-10">
        <section className="flex items-center w-full gap-x-5">
          <div className="w-20 h-20 bg-black rounded-xl" /> <h1 className="font-bold text-xl flex-1"> {params.username} </h1>
        </section>
        <hr />
        <section className="flex flex-wrap w-full gap-10 justify-evenly">
          <MemberFitnessGoal username={params.username} />
          <MemberClassEnrolled username={params.username} />
        </section>
        <MemberAchievements username={params.username} />
      </div>
    </div>
  );
}
