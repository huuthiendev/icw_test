/**
 * Policy Mappings
 * (sails.config.policies)
 *
 * Policies are simple functions which run **before** your actions.
 */

module.exports.policies = {
  '*': 'isValidSocket',
  'RoomController': {
    'checkUserInRoom': true,
  },
};
