const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

app.use(bodyParser.json());
app.use(express.static('public'));

const messages = [];

function addMessage(role, content) {
   messages.push({ role: role, content: content });
}

async function sendToOpenAI() {
  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: messages,
  }).catch((err) => {
     console.log("error received: " + err);
  });
  reply = completion.data.choices[0].message.content;
  return reply;
}

app.post('/api/gpt', async (req, res) => {
  console.log("Received: " + req.body.prompt);
  addMessage('user', req.body.prompt);
  reply = await sendToOpenAI();
  console.log("Reply: " + reply);
  addMessage("assistant", reply);
  res.send({ message: reply });
});


app.listen(3000, () => {
  console.log('Server listening on port 3000');
});