module.exports = {
  format_date: date => {
    return `${new Date(date).getMonth() + 1}/${new Date(date).getDate()}/${new Date(date).getFullYear()}`;
  },
  format_plural: (word, amount) => {
    if (amount !== 1) {
      return `${word}s`;
    }

    return word;
  },

  ifCond: (v1, v2, options) => {
    if(v1 === v2) {
      return options.fn(this);
    }
    return options.inverse(this);
  }

};