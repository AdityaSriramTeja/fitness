"use client";
import { DetailChips } from "@/components/shared/detailChips";
import { SelectClassDates } from "@/components/ui/selectClassDates";
import React, { useState } from "react";

// CREATE TABLE Class(
//   id SERIAL PRIMARY KEY,
//   name TEXT NOT NULL,
//   is_group_class BOOLEAN NOT NULL,
//   room_id INT,
//   schedule_slot_id INT,
//   trainer_username TEXT,
//   FOREIGN KEY (schedule_slot_id) REFERENCES Schedule_Slot(id),
//   FOREIGN KEY (room_id) REFERENCES Room(id),
//   FOREIGN KEY (trainer_username) REFERENCES Trainer(username)
// );

const SchedulePage = () => {
  const [days, setDays] = useState([]);
  return (
    <div className="h-full p-10 flex flex-col">
      <section className="w-full ">
        {" "}
        <SelectClassDates setDays={setDays} />{" "}
      </section>
      <p> {JSON.stringify(days)}</p>
      <section className="flex flex-wrap gap-5 ">
        <div className="w-[30vw] border-2 p-5 rounded-lg flex flex-col justify-evenly gap-y-6">
          <span className="flex gap-4 flex-wrap">
            {" "}
            <DetailChips label="Group" /> <DetailChips label="Monday" />{" "}
            <DetailChips label="Tuesday" />{" "}
          </span>

          <h2 className="font-bold text-xl"> Cardio </h2>
          <span> Room Number: 203</span>
          <span> Trainer: Bob</span>
          <span> Days: Monday and Tuesday </span>
          <div className=" w-full flex justify-center">
            <button className="border-2 p-2 rounded-xl bg-green-400 hover:bg-green-500">
              {" "}
              Add Course{" "}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SchedulePage;
