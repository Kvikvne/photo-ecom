const { getDb } = require('../connection');

const getPhotos = async () => {
  const db = getDb();
  let photos = [];
  
  await db.collection('photos')
    .find()
    .sort({ id: 1 })
    .forEach(photo => photos.push(photo));

  return photos;
};

module.exports = { getPhotos };
