const axios = require("axios");
class Validator {
  //Cards,Miniatures,Gaming,Anime,Boardgames,Comics,D&D,Other
  VALID_CATEGORIES = [
    "cards",
    "miniatures",
    "gaming",
    "anime",
    "boardgames",
    "comics",
    "dungeons and dragons",
    "other",
  ];
  DEFAULT_IMAGE =
    "https://www.ncenet.com/wp-content/uploads/2020/04/No-image-found.jpg";
  validateCategory(category) {
    try {
      let validated = "";
      let valid = false;
      this.VALID_CATEGORIES.forEach((validCategory) => {
        if (valid) return;
        if (validCategory === category) {
          validated = category;
          valid = true;
        }
      });
      if (valid) {
        return validated;
      } else {
        return false;
      }
    } catch (err) {
      //TODO:: THROW TO SCOPE
      throw new Error("server", { cause: error });
    }
  }

  async validateImageUrl(url) {
    try {
      if (!this.checkForImageFile(url)) {
        return false;
      }
      const reachable = await this.checkIfLinkIsReachable(url);
      return !!reachable;
    } catch (err) {
      throw new Error("server", { cause: error });
    }
  }
  getDefaultImage() {
    return this.DEFAULT_IMAGE;
  }
  checkForImageFile(url) {
    return /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url);
  }
  async checkIfLinkIsReachable(url) {
    try {
      const res = await axios.get(url);
      const status = res.status;
      if (status == 200) {
        return true;
      } else {
        return false;
      }
    } catch (err) {
      return false;
    }
  }
  validateEmail(email) {
    const validFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
      email
    );
    if (!validFormat) return false;
    const checkForCommonDomain = /\.(com|net|org)$/.test(email);
    const checkForCountryDomain =
      /\.(us|co|be|nl|fr|th|ca|uk|cn|ru|ir|in|de|ua|au)/.test(email);
    return !!(checkForCommonDomain || checkForCountryDomain);
  }
}
const validator = new Validator();
module.exports = validator;
