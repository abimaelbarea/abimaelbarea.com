const toDateString = (str: string) => {
  const date = new Date(str);
  return date.toDateString();
};

export { toDateString };
