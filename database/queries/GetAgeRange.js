const Artist = require('../models/artist');

/**
 * Finds the lowest and highest age of artists in the Artist collection
 * @return {promise} A promise that resolves with an object
 * containing the min and max ages, like { min: 16, max: 45 }.
 */
module.exports = () => {
  const minQuery = Artist
    .find({}) //give back a list of artists
    .sort ({ age: 1 })
    .limit(1)
    .then((artists) => artists[0].age); //give a terminatio of minQuery

  const maxQuery = Artist
    .find({})
    .sort ({ age: -1 })
    .limit(1)
    .then((artists) => artists[0].age);

  return Promise.all([minQuery, maxQuery])
    .then ((result) => {
      return { min: result[0], max:result[1] };
    });
};

// apply
// GetAgeRange()
//   .then ((argument) => {
//     console.log (argument); //{ min: 14, max: 35 }
//   })
