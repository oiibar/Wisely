import { useState } from "react";
import { toast } from "react-toastify";

export const useFetch = <T, Args extends any[]>(
  asyncFunction: (...args: Args) => Promise<T>,
  options?: {
    onSuccess?: (data: T) => void;
    onError?: (error: unknown) => void;
    successMessage?: string;
    errorMessage?: string;
  }
) => {
  const [loading, setLoading] = useState(false);

  const fetch = async (...args: Args): Promise<T | undefined> => {
    setLoading(true);
    try {
      const data = await asyncFunction(...args);
      if (options?.successMessage) toast.success(options.successMessage);
      options?.onSuccess?.(data);
      return data;
    } catch (error) {
      if (options?.errorMessage) toast.error(options.errorMessage);
      options?.onError?.(error);
      return undefined;
    } finally {
      setLoading(false);
    }
  };

  return { fetch, loading };
};
