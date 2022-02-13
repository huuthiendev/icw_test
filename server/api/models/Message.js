/**
 * Message.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    roomId: { type: 'string', required: false },
    username: { type: 'string', required: false },
    text: { type: 'string', required: false },
  },
};

