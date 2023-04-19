const express = require('express');
const bodyParser = require('body-parser');
const OpenAI = require('openai');

const app = express();
const openai = new OpenAI(process.env.OPENAI_API_KEY);

app.use(bodyParser.json());
app.use(express.static('public'));

let conversationHistory = [];

app.post('/api/gpt', async (req, res) => {
  conversationHistory.push(req.body.prompt);
  const prompt = conversationHistory.join('\n');
  const response = await openai.complete({
    engine: 'davinci',
    prompt,
    maxTokens: 150,
    temperature: 0.9,
    n: 1,
    stop: null
  });
  const message = response.data.choices[0].text;
  conversationHistory.push(message);
  res.json({ message });
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});