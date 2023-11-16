import { useAppSelector } from "./redux-hook";

export const useAuth = () => {
  const { status } = useAppSelector((state) => state.reducer.user);

  return status === 'authenticated';
};
