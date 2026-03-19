const qs = require('qs');
const query = {
  'populate[author]': '*',
  'populate[author][populate]': 'photo',
  'populate[coverImage]': '*',
  'populate[ogImage]': '*'
};
const queryString = new URLSearchParams(query).toString();
const parsed = qs.parse(queryString);
console.log(JSON.stringify(parsed, null, 2));
