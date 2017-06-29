/* jshint esversion: 6 */
var chat = require("./chat.js");
var cfg = require("./config.json");

chat.API.get_token(cfg.chat_pass).then((ret) => {
  console.log(ret.chat_token);
}, (ret) => {
  console.log(ret);
});
