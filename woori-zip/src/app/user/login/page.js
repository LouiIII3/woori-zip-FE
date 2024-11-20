'use client'

import { handleCredentialsSignin } from "@/app/actions/authActions";
import Login from "@/components/domains/user/login/LoginPage";

// LoginPage 컴포넌트
function LoginPage() {

  const handleLogin = async (username, password) => {
    const response = await handleCredentialsSignin({ username, password });
    return response;
  };

  return (
    <div>
      <Login onLogin={handleLogin} /> {/* handleLogin을 Login 컴포넌트에 전달 */}
    </div>
  );
}

export default LoginPage;
