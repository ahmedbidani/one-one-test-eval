module.exports = {


  friendlyName: 'View conversations',


  description: 'Display "Conversations" page.',

  inputs: {},


  exits: {

    success: {
      viewTemplatePath: 'pages/dashboard/conversations'
    }

  },


  fn: async function (inputs, exits) {
    if (this.req.isSocket)  {
      const conversations = await Conversation.find().populate('sender');
      /* let roomName = `chat${_.deburr(this.req.me.id)}`; */
      const roomName = 'chatRoom';
      var socket = sails.sockets.parseSocket(this.req);
      sails.sockets.join(socket, roomName);
      console.log('sails.sockets',sails.sockets);
      return this.res.json(conversations); // render JSON response for our `site` object 
    }
    else return exits.success();

  }


};
