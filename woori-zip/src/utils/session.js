import "server-only";
import { cookies } from "next/headers";


export async function deleteSession() {
  cookies().delete("session");
}
