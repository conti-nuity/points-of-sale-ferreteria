export const useFinder = (value, data) => {
  return value != null && value.length > 0
    ? data.filter((item) =>
        item.name.toLocaleLowerCase().includes(value.toLocaleLowerCase())
      )
    : data;
};
