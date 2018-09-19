const Artist = require('../models/artist');

/**
 * Searches through the Artist collection
 * @param {object} criteria An object with a name, age, and yearsActive
 * @param {string} sortProperty The property to sort the results by
 * @param {integer} offset How many records to skip in the result set
 * @param {integer} limit How many records to return in the result set
 * @return {promise} A promise that resolves with the artists, count, offset, and limit
 * like this: { all: [artists], count: count, offset: offset, limit: limit }
 */
module.exports = (criteria, sortProperty, offset = 0, limit = 20) => {
  //write a query that will follow sort, offset, limit options only

  // //ES5
  // const sortOrder = {}; //empty object
  // sortOrder[sortProperty] = 1;
  // //set object's property (equal to sortProperty) value to 1

  const query = Artist
    .find(buildQuery(criteria)) //helper function
    .sort ({ [sortProperty]: 1 }) //ES6
    .skip (offset)
    .limit(limit);

  return Promise.all ([query, Artist.find(buildQuery(criteria)).count()])
    .then ((result) => {
      return {
        all: result[0],
        count: result[1],
        offset: offset,
        limit: limit
      };
    });
};

const buildQuery = (criteria) => {
  //console.log(criteria);
  const query = {};

  if (criteria.name) {
    query.$text = { $search: criteria.name };
    //text search requires index on the property
    //db.artists.createIndex ({ name: "text" }) in mongodb shell
  }

  if (criteria.age) {
    query.age = {
      $gte: criteria.age.min,
      $lte: criteria.age.max
    };
    //{ age: { $gte: minAge, $lte: maxAge } }
  }

  if (criteria.yearsActive) {
    query.yearsActive = {
      $gte: criteria.yearsActive.min,
      $lte: criteria.yearsActive.max
    };
  }



  return query;
}
