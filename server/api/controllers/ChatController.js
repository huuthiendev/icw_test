/**
 * ChatController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  sendMessage
};

async function sendMessage(req, res) {
  try {
    // Check parameters before proceeding
    Utils.checkRequestParams(req.body, ['roomId', 'username', 'text']);

    var messageData = {
      roomId: req.body.roomId,
      username: req.body.username,
      text: req.body.text
    };
    console.log('[ChatController] sendMessage - messageData: ', messageData);
    // Save the message to the database
    await Message.create(messageData);
    // Send a message to everyone in the room.
    sails.sockets.broadcast(messageData.roomId, 'incoming_message', messageData);
    return res.ok();
  }
  catch (err) {
    console.log('[ChatController] sendMessage - error: ', err);
    return res.badRequest(err);
  }
}