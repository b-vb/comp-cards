// eslint-disable-next-line import/prefer-default-export
export const formatDate = (date: Date) => date.toLocaleString('nl-NL', {
  year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric',
});
