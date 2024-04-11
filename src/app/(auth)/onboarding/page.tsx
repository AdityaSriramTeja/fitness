import RedirectButton from "@/components/shared/RedirectBtn";
import React from "react";

const page = () => {
  return (
    <div className="border-2 h-full w-[70%] flex flex-col p-5 rounded-lg gap-y-10">
      <h1> Onboarding</h1>
      <span className="flex items-center gap-x-5">
        {" "}
        <h5> First Name: </h5> <input type="text" className="input" />
      </span>
      <span className="flex items-center gap-x-5">
        {" "}
        <h5> Last Name: </h5> <input type="text" className="input" />
      </span>
      <span className="flex items-center gap-x-5">
        {" "}
        <h5> Phone Number: </h5> <input type="text" className="input" />
      </span>
      <span className="flex items-center gap-x-5">
        {" "}
        <h5> Primary Address: </h5> <input type="text" className="input" />
      </span>
      <span className="flex items-center gap-x-5">
        {" "}
        <h5> Email : </h5> <input type="text" className="input" />
      </span>

      <div className="mb-4 space-y-3">
        <h3 className="text-lg font-semibold "> Register as a: </h3>
        <ul className="w-48 text-sm font-medium text-gray-900 border border-gray-200 rounded-lg  dark:border-gray-600 dark:text-white">
          <li className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
            <div className="flex items-center ps-3">
              <input id="list-radio-user" type="radio" value="member" name="identificationType" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
              <label htmlFor="list-radio-user" className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                Member
              </label>
            </div>
          </li>
          <li className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
            <div className="flex items-center ps-3">
              <input id="list-radio-trainer" type="radio" value="trainer" name="identificationType" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
              <label htmlFor="list-radio-trainer" className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                Trainer
              </label>
            </div>
          </li>
        </ul>
      </div>

      <h4> Enter your starting weight and height (you can edit this later) </h4>
      <span className="flex items-center gap-x-5">
        {" "}
        <h5> Weight : </h5> <input type="text" className="input" />
      </span>
      <span className="flex items-center gap-x-5">
        {" "}
        <h5> Height : </h5> <input type="text" className="input" />
      </span>

      <div className="mb-4 space-y-3">
        <ul className="w-48 text-sm font-medium text-gray-900 border border-gray-200 rounded-lg  dark:border-gray-600 dark:text-white">
          <li className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
            <div className="flex items-center ps-3">
              <input id="list-radio-user-male" type="radio" value="male" name="identificationType" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
              <label htmlFor="list-radio-user-male" className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                Male
              </label>
            </div>
          </li>
          <li className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
            <div className="flex items-center ps-3">
              <input id="list-radio-user-female" type="radio" value="female" name="identificationType" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
              <label htmlFor="list-radio-user-female" className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                Female
              </label>
            </div>
          </li>
        </ul>
      </div>

      <RedirectButton route="/"> Complete Onboarding </RedirectButton>
    </div>
  );
};

export default page;
