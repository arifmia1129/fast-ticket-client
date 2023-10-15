export const getErrorMessageByPropertyName = (
  obj: Record<string, any>,
  path: any
) => {
  const properties = path.split(".");

  let value = obj;

  for (const prop of properties) {
    if (value[prop]) {
      value = value[prop];
    } else {
      return undefined;
    }
  }
  return value.message;
};
