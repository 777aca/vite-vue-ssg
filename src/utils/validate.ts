/**
 * 去除空格
 * @param str
 * @returns
 */
export const removeSpaces = (str: string) => str.replace(/\s/g, "");

/**
 * 校验邮箱
 * @param email
 * @returns
 */
export const isValidEmail = (email: string) => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
};
