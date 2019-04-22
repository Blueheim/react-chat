const formatMessage = (userName, type, text) => {
  return {
    userName,
    type,
    text,
    createdAt: new Date().getTime(),
  };
};
export { formatMessage };
