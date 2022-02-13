/**
 * RoomController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  joinRoom,
  leaveRoom,
  checkUserInRoom
};

async function joinRoom(req, res) {
  try {
    console.log(`[RoomController] joinRoom - roomId (${req.body.roomId}) - username (${req.body.username})`);
    Utils.checkRequestParams(req.body, ['roomId', 'username']);

    var userData = { username: req.body.username, roomId: req.body.roomId };
    var checkUserInfo = await User.find(userData);
    if (checkUserInfo.length) {
      throw {
        errorCode: 'USERNAME_EXISTS_IN_ROOM',
        message: 'Your username has already been taken. Please try with another!'
      };
    }
    // Add socket id to a socket room
    sails.sockets.join(req.socket, req.body.roomId);
    var socketId = sails.sockets.getId(req);
    await User.create({ ...userData, socketId });
    // Get all messages in the room
    var messages = await Message.find({ roomId: req.body.roomId });
    return res.ok(messages);
  }
  catch (err) {
    console.log('[RoomController] joinRoom - error: ', err);
    return res.badRequest(err);
  }
}

async function leaveRoom(req, res) {
  try {
    Utils.checkRequestParams(req.body, ['roomId', 'username']);
    await User.destroy({ username: req.body.username, roomId: req.body.roomId });
    // Remove socket id to a socket room
    sails.sockets.leave(req.socket, req.body.roomId);
    return res.ok();
  }
  catch (err) {
    console.log('[RoomController] leaveRoom - error: ', err);
    return res.badRequest(err);
  }
}

async function checkUserInRoom(req, res) {
  try {
    var checkUserInfo = await User.find({ username: req.body.username, roomId: req.body.roomId });
    if (checkUserInfo.length) {
      throw {
        errorCode: 'USERNAME_EXISTS_IN_ROOM',
        message: 'Your username has already been taken. Please try with another!'
      };
    }
    return res.ok({ status: 'ok' });
  }
  catch (err) {
    console.log('[RoomController] checkUserInRoom - error: ', err);
    return res.badRequest(err);
  }
}