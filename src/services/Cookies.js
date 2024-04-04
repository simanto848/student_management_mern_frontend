import Cookies from "js-cookie";

export const cookieName = "user";

export const setUserCookie = (cookieValues) => {
  Cookies.set(cookieName, JSON.stringify(cookieValues), { expires: 7 });
};

export const getUserFromCookie = () => {
  const userString = Cookies.get(cookieName);
  if (userString) {
    return JSON.parse(userString);
  } else {
    return false;
  }
};
