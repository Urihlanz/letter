import { type JSX } from "react";

import LoginForm from "@components/Auth/form";

const Page = async (): Promise<JSX.Element> => {
  return (
    <div className="flex h-screen bg-default w-full items-center justify-center">
      <LoginForm />
    </div>
  );
};

export default Page;
