"use server";

import type { IronSession } from "iron-session";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { v4 as uuidv4 } from "uuid";

import type { SessionData } from "../lib";
import { defaultSession, sessionOptions } from "../lib";

const getSession = async (): Promise<IronSession<SessionData>> => {
  const session = await getIronSession<SessionData>(await cookies(), sessionOptions);

  if (!session.isLoggedIn) {
    session.isLoggedIn = defaultSession.isLoggedIn;
  }

  return session;
};

export const getSessionFromRequest = async (
  requestCookies: any
): Promise<IronSession<SessionData>> => {
  const session = await getIronSession<SessionData>(requestCookies, sessionOptions);

  if (!session.isLoggedIn) {
    session.isLoggedIn = defaultSession.isLoggedIn;
  }

  return session;
};

export const logout = async (): Promise<void> => {
  const session = await getSession();
  session.destroy();
  redirect("/auth");
};

export const login = async (
  prevState: { error: undefined | string },
  formData: FormData
): Promise<void> => {
  const session = await getSession();

  const formUsername = formData.get("username") as string;

  const user = {
    id: uuidv4(),
    username: formUsername,
  };

  if (!user) {
    return;
  }

  session.isLoggedIn = true;
  session.userId = String(user.id);
  session.username = user.username;

  await session.save();
};
