"use client";

import { type JSX, useActionState } from "react";
import { Control, Field, Label, Message, Root } from "@radix-ui/react-form";

import { login } from "@app/actions/auth";
import { Button } from "@/components/ui/Button";

const LoginForm = (): JSX.Element => {
  const [state, formAction] = useActionState<any, FormData>(login, undefined);

  return (
    <Root
      action={formAction}
      className="flex w-96 flex-col justify-center bg-dark gap-y-4 shadow border border-gray p-4 text-white"
    >
      <h2 className="text-lg font-bold">Autorization</h2>
      <Field name="username">
        <Label className="text-sm">Username</Label>
        <Message className="text-[13px] ml-2 text-white opacity-80" match="valueMissing">
          Please enter your username
        </Message>
        <Control asChild>
          <input
            className="box-border inline-flex h-[35px] w-full appearance-none items-center justify-center rounded px-2.5 text-[15px] leading-none text-black shadow-[0_0_0_1px] outline-none hover:shadow-[0_0_0_1px_black] focus:shadow-[0_0_0_2px_black]"
            type="text"
            required
          />
        </Control>
      </Field>
      <Field name="password">
        <Label className="text-sm mb-1">Password</Label>
        <Message className="text-[13px] ml-2 text-white opacity-80" match="valueMissing">
          Please enter your password
        </Message>
        <Message className="text-[13px] ml-2 text-white opacity-80" match="typeMismatch">
          Please provide a valid password
        </Message>
        <Control asChild>
          <input
            className="box-border inline-flex h-[35px] w-full appearance-none items-center justify-center rounded px-2.5 text-[15px] leading-none text-black shadow-[0_0_0_1px] outline-none hover:shadow-[0_0_0_1px_black] focus:shadow-[0_0_0_2px_black]"
            type="password"
            required
          />
        </Control>
      </Field>

      <Button type="submit">Create account</Button>

      {state?.error}
    </Root>
  );
};

export default LoginForm;
