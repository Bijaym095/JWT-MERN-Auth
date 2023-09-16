import jwt_decode from "jwt-decode";

export const getCurrentUserId = (currentUser: string) => {
  const { _id }: { _id: string } = jwt_decode(currentUser);
  return _id;
};
