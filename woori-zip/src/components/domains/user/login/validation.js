export const validatePassword = (pass) => {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]|.*\d|.*\W)|(?=.*[A-Z])(?=.*\d|.*\W)|(?=.*\d)(?=.*\W|.*[a-z]).{8,}$/;
  return passwordRegex.test(pass) && pass.length >= 8
    ? ''
    : '비밀번호는 8자 이상이며, 대문자, 소문자, 숫자와 기호를 최소 2개 이상 포함해야 합니다.';
};

export const confirmPassword = (pass, confirmPass) => {
  const validationMessage = validatePassword(pass);

  if (validationMessage) {
    return validationMessage;
  }

  return pass === confirmPass
    ? ''
    : '비밀번호가 일치하지 않습니다. 다시 확인해 주세요.';
};

export const validateName = (name) => {
  const usernameRegex = /^[a-zA-Z가-힣]+$/;
  return usernameRegex.test(name)
    ? ''
    : '이름은 영문 또는 한글만 포함해야 합니다.';
};

export const validateDateOfBirth = (birthday) => {
  const inputDate = new Date(birthday);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  return inputDate <= yesterday
  ? ''
  : '생년월일은 오늘보다 이전이어야 합니다.';
};

export const validateEmail = (email) => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email)
  ? ''
  : '이메일은 예시와 같은 형식이어야 합니다. ex)woorizip@woorizip.com';
}

export const validatLicenseId = (licenseId) => {
  const licenseIdRegx = /^[0-9-]+$/;
  return licenseIdRegx.test(licenseId)
  ? ''
  : '중개업자는 숫자 형식이어야 합니다.'
}