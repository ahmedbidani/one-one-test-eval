module.exports = {


    friendlyName: 'Save message',
  
  
    description: 'save new message',  
  
    inputs: {
  
      message: {
        required: true,
        type: 'string',
      },
  
    },
  
  
    exits: {
  
      success: {
        description: 'New conversation was created successfully.'
      },
  
      invalid: {
        responseType: 'badRequest',
        description: 'The provided message is invalid.',
        extendedDescription: 'If this request was sent from a graphical user interface, the request '+
        'parameters should have been validated/coerced _before_ they were sent.'
      },
  
    },
  
  
    fn: async function ({message}) {
      if (this.req.me) { 
        var conversation = await Conversation.create({
          message,
          sent_at: Date.now(),
          sender: this.req.me.id
        }).fetch();
  
        var conversationWithSender = await Conversation.findOne({ id: conversation.id }).populate('sender');
  
        if (this.req.isSocket)  { 
          sails.sockets.broadcast('chatRoom', 'newMessage', { conversation: conversationWithSender } );
        }
      } else {
        return this.res.unauthorized();
      }

  
    }
  
  };
  