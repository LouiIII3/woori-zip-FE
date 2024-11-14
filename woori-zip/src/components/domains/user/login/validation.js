export const validateUsername = (name) => {
    const usernameRegex = /^[a-zA-Z0-9]{5,}$/;
    return usernameRegex.test(name)
      ? ''
      : '아이디는 5자 이상이며, 영문 또는 숫자만 포함해야 합니다.';
  };
  
  export const validatePassword = (pass) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]|.*\d|.*\W)|(?=.*[A-Z])(?=.*\d|.*\W)|(?=.*\d)(?=.*\W|.*[a-z]).{8,}$/;
    return passwordRegex.test(pass) && pass.length >= 8
      ? ''
      : '비밀번호는 8자 이상이며, 대문자, 소문자, 숫자와 기호를 최소 2개 이상 포함해야 합니다.';
  };
  