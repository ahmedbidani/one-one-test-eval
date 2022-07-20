module.exports = {


  friendlyName: 'View conversations or redirect',


  description: 'Display or redirect to the appropriate homepage, depending on login status.',


  exits: {

    success: {
      statusCode: 200,
      description: 'Requesting user is a guest, so show the login page.',
      viewTemplatePath: 'pages/entrance/view-login'
    },

    redirect: {
      responseType: 'redirect',
      description: 'Requesting user is logged in, so redirect to the internal welcome page.'
    },

  },


  fn: async function () {

    if (this.req.me) {
      throw {redirect:'/conversations'};
    }

    return {};

  }


};
