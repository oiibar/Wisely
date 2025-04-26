import { useAppSelector } from "@store/hooks";

export const useAuth = (): boolean => {
  return useAppSelector((state) => state.user.isAuth);
};
