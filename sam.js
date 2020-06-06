
const ACC_SID = 'AC54c0df77997771ac45ddcdb9f2be819e'
const ACC_TOKEN = '98b5365232b887e45fbc02332e03ac5f'
const client = require("twilio")(ACC_SID, ACC_TOKEN);

client.messages
.create({
  body: 'nfdvdkln',
  from: '+12512999838',
  to: "+917875303861"
})
.then((msg) => console.log(msg.sid))
.catch((err) => console.log(err));