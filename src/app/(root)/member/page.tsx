"use client";

import { MemberHealth } from "@/components/memberHealth";
import { MemberAchievements } from "@/components/memberAchievements";
import { MemberRoutine } from "@/components/memberRoutines";
import { useUsername } from "@/hooks/auth";
import { Spinner } from "@chakra-ui/react";

const Member = () => {
  const username = useUsername();
  // const [members, setMembers] = useState<MemberType[]>();

  return (
    <div className="p-10 h-full space-y-10 ">
      <h1 className="text-2xl font-bold underline"> Welcome @{username} </h1>
      <h3 className="text-lg font-semibold"> Dashboard </h3>
      <div className="h-[100vh] max-h-[300vh] grid   grid-cols-2 gap-4">
        {username ? (
          <>
            <MemberHealth username={username} />
            <MemberAchievements username={username} />
            <MemberRoutine username={username} />
          </>
        ) : (
          <Spinner />
        )}
      </div>
    </div>
  );
};

export default Member;
