import { toast } from "react-toastify";

export const useAsync = <T extends (...args: any[]) => Promise<any>>(fn: T) => {
  return async (...args: Parameters<T>) => {
    try {
      return await fn(...args);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Something went wrong");
      throw error;
    }
  };
};
