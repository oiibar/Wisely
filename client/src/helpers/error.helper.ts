export const extractErrorMessage = (error: any): string =>
  error?.response?.data?.message || error.message || "Something went wrong";
