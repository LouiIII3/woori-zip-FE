"use server";

import { deleteSession } from "./session.js";
import { redirect } from "next/navigation";


export async function logout() {
  await deleteSession();
  redirect("/login");
}
