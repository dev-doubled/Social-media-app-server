export const generateVerificationCode = (length) => {
  const codeLength = length || 5;

  const min = 10 ** (codeLength - 1);
  const max = 10 ** codeLength - 1;

  const randomCode = Math.floor(min + Math.random() * (max - min + 1));

  return randomCode.toString();
};
