import { MemberAchievements } from "@/components/memberAchievements";
import { MemberRoutine } from "@/components/memberRoutines";
import { UserNav } from "@/components/shared/userNav";
import React from "react";

const Member = () => {
  return (
    <div className="p-10 h-full space-y-10 ">
      <h1 className="text-2xl font-bold underline"> Welcome member </h1>
      <h3 className="text-lg font-semibold"> Dashboard </h3>
      <div className="h-[100vh] max-h-[300vh] grid   grid-cols-2 gap-4">
        <div className="border-2 rounded-xl p-5 space-y-10 ">
          <h4>Display health statistics </h4>
          <div className="flex flex-wrap flex-col gap-5  max-h-[450px]">
            <span className="text-lg font-semibold capitalize  bg-slate-500/50 px-3 rounded-lg">weight: 80</span>
            <span className="text-lg font-semibold capitalize bg-slate-500/50 px-3 rounded-lg">average sleep: 80 </span>
            <span className="text-lg font-semibold capitalize bg-slate-500/50 px-3 rounded-lg">average calories burnt: 80</span>
            <span className="text-lg font-semibold capitalize bg-slate-500/50 px-3 rounded-lg">average calories intake: 80</span>
          </div>
        </div>

        <MemberAchievements />
        <MemberRoutine />
      </div>
    </div>
  );
};

export default Member;
