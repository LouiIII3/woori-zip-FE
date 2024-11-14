"use client"

import { logout } from "../../../utils/actions.js";

function page() {
  return (
    <div>
      <div>로그인한 회원만 볼 수 있는 페이지</div>
      <button onClick={() => logout()}>Logout</button>
    </div>
  )
}

export default page