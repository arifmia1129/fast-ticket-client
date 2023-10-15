import jwtDecode from "jwt-decode";

export const tokenDecode = (token: string) => {
  if (token) {
    return jwtDecode(token);
  } else {
    return "";
  }
};
