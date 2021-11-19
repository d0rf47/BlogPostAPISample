const NodeCache = require('node-cache');

class Cache {

  constructor() {
    this.cache = new NodeCache({ });
  }

  get(key, storeFunction) {
    const value = this.cache.get(key);    
    if (value) {
      console.log('serving from cache');
      return Promise.resolve(value);
    }

    return storeFunction().then((result) => {
      // console.log(result)
      this.cache.set(key, result);
      return result;
    });
  }

}

module.exports = Cache;