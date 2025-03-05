export const formatDateWithoutYear = (date: Date): string => {
  const options: Intl.DateTimeFormatOptions = { month: "long", day: "numeric" };
  return new Intl.DateTimeFormat("en-US", options).format(date);
};
