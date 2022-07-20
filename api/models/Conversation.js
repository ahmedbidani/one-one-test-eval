module.exports = {
    attributes: {
      sent_at: {
        type: 'number'
      },
      message: {
        type: 'string'
      },
  
      // Add a reference to User
      sender: {
        model: 'user',
      }
    }
  };