import Cookies from "js-cookie";

export const setUserCookie = (cookieName, cookieValues) => {
  Cookies.set(cookieName, JSON.stringify(cookieValues), { expires: 7 });
};

export const getUserFromCookie = (cookieName) => {
  const userString = Cookies.get(cookieName);
  if (userString) {
    return JSON.parse(userString);
  } else {
    return false;
  }
};
