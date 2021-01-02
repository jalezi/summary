export default (fieldName = true) => (rootValue, _, __, info) => {
  info.cacheControl.setCacheHint({ maxAge: 60, scope: 'PRIVATE' });
  if (fieldName) {
    return rootValue[info.fieldName];
  }
  return rootValue;
};
