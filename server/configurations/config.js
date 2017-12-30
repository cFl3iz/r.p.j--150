var Config = module.exports = {

  //---------------------
  //Main Configurations
  //---------------------
  port: 8000,

  jwtSecret: 'aeha8j4h20adn92k10nkav0sjf90sleicazvyi54j39jfqasfjk9',

  loggingConfig: {
    format : [
              "{{timestamp}} <{{title}}> {{message}}", //default format
              {
                error : "{{timestamp}} <{{title}}> {{message}} (in {{file}}:{{line}})\nCall Stack:\n{{stack}}" // error format
              }
    ],
    dateformat : "HH:MM:ss.L",
    preprocess :  function(data){
      data.title = data.title.toUpperCase();
    },
    level: 'debug'
  },

  //---------------------
  //Login Configurations
  //---------------------

  //Needs to be the same as Client firstHash
  firstHash: 'd28cb767c4272d8ab91000283c67747cb2ef7cd1',

  //Mail to send activation codes from
  //koulwpkdxxztbhfe
  //pop3:xhkrstvvnnzqbgdh
  mailFrom: 'smtps://y0uping_miniprogra@163.com:woaizhu131@smtp.163.com',

  //Activation API Location
  actUrl: 'http://localhost:8000/activate/',

  //Allows only one logged in user at a time.
  enforceOneUser: false,

  //Temporary Password Complexity for lost Passwords
  lostPasswordComplexity: 2,

  //Temporary Password Expiration in Milliseconds
  tempPasswordExpires: 3600000, //1 hour

  //------------------------
  //Database Configurations
  //------------------------

  mongoDBconnect: 'mongodb://dba:dba@localhost:27017/admin'
};
