export const formatDate = (date: string): string => {
  const formatedDate = new Date(date);
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  return formatedDate.toLocaleDateString("en-US", options);
};
