parasails.registerPage('conversations', {
  //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
  //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
  //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
  data: {
    syncing: false,
    // Form data
    formData: {
      message: null,
    },
    conversations: [],

    // For tracking client-side validation errors in our form.
    // > Has property set to `true` for each invalid property in `formData`.
    formErrors: { /* … */ },

    // A set of validation rules for our form.
    // > The form will not be submitted if these are invalid.
    formRules: {
      message: { required: true },
    },

    // Server error state for the form
    cloudError: '',
  },

  //  ╦  ╦╔═╗╔═╗╔═╗╦ ╦╔═╗╦  ╔═╗
  //  ║  ║╠╣ ║╣ ║  ╚╦╝║  ║  ║╣
  //  ╩═╝╩╚  ╚═╝╚═╝ ╩ ╚═╝╩═╝╚═╝
  beforeMount: function() {
    //…
  },
  mounted: async function() {
    $this = this;
    io.socket.get('/conversations', function serverResponded (body, JWR) {
      $this.conversations = body;
      $this.scrollDown('.card-body');
    });
    io.socket.on('newMessage', function (data){
      $this.conversations.push(data.conversation);
      $this.scrollDown('.card-body');
    });
    //…
  },

  //  ╦╔╗╔╔╦╗╔═╗╦═╗╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
  //  ║║║║ ║ ║╣ ╠╦╝╠═╣║   ║ ║║ ║║║║╚═╗
  //  ╩╝╚╝ ╩ ╚═╝╩╚═╩ ╩╚═╝ ╩ ╩╚═╝╝╚╝╚═╝
  methods: {
    sendMessage: async function() {
      if(this.formData.message != null && this.formData.message != '') {
        const message = this.formData.message;
        $this = this;
        io.socket.post('/api/v1/dashboard/save-message', { message }, function serverResponded (body, JWR) {
          $this.formData.message = '';
        });
      }
    },
    momentFromNow: function (date) {
      return moment(date).fromNow();
    },
    scrollDown: function(name) {
      $(name).animate({ scrollTop: 9999 }, 'slow');
    }
  }
});
