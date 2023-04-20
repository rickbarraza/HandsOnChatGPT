# Hands on with ChatGPT & GitHub Codespaces

![cover slide](/imgs_readme/02cover.jpg)

Greetings MSFTies from our AI Design Day talk this morning (April 19, 2023). here is a step by step breakdown of what we demo’d today - creative coding & exploratory engineering with ChatGPT APIs from scratch using vanilla JS, HTML & CSS. This code is in no way complete, but represents the initial steps I went through to get a sketch setup and start tinkering with an idea. The idea we will stand up is a ChatGPT interactive story engine for my son, called "Mr Harfang's Worlds of Wonder". Once we're done, I'll show you how to FORK this repo, add your own OpenAI API key as Codespaces Secret, and use this for whatever project you want to make too. Let's go break some eggs!

![creative coding landscape](/imgs_readme/03creativecoding.jpg)

Normally, I code up sketches on my Mac, using Visual Studio Code and designing, testing and experimenting locally. Occasionally, I would push up some projects to GitHub to share casually with someone, or just store in the cloud. But my GitHub relationship hasn't traditionally be about Pull Requests, Collaborations, Versioning, etc. DevOps does not really describe my messy, creative process. I'm not converging on a stable answer, I'm diverging toward unexplored curiosities. Once GitHub made it easy to deploy your repo to it's Github Pages, I started payign more attention. A couple clicks later and my archived rickbarraza.com repo is retired, but live again. Nice. But two things were still constraints: 1) I would do still do my dev and testing locally, in Visual Studio Code, and 2) GP Pages does the serving of static (client side) pages for me, but doesn't give me COMPUTE so I can run (host) my own code on the backend. And I need that if I want to call out to other APIs or keep passwords and content safe, etc.

![github landscape](/imgs_readme/04github.jpg)

This is where GitHub's new CODESPACES completely changes the game. CODESPACES is a consumer friendly offering of Microsoft's Dev Containers, preconfigured to get you up and running with a free 1) virtual cloud computer (image) and 2) a cloud based instance of Visual Studio Code with your account settings sync'd and 3) a live terminal where you can dev, run, review and iterate all from your browser. It's fantastic. Most importantly, this lets more creatives, artists and designers start playing with OpenAI and other APIs and technologies faster than ever. They don't need to setup or configure their own home machine to run Python, handle authentication, etc. You can also go into another persons repo on GitHub and instead of needing to clone it locally, setup an environment, and try and get it running on your machine, a well configured Repo will let a visitor open it into a Codespace, configured to run in the cloud on a suitable machine. They're still gaining in popularity, but Codespaces are something that I think will boost creative coding, and teaching/learning/researching design + AI, significantly in the next few years. It's what we'll use for the entire walkthrough.

## Setting up our Codespace with OpenAI

Enough chatting, let's start making. We are going to use Codespaces to create a NODE.JS server that serves up an HTML/CSS page that will be an interactive, ChatGPT based RPG storyteller. Let's fire up your first Codespace (this project assumes you have a GitHub account, and also have an OpenAI access code for chatGPT or GPT4). See the GitHub header there? Click CODESPACES and it will take you to this screen below. We're going to use the default, *BLANK* template. It comes preconfigured with loads of needed goodies and boots up quickly.

![fire up your codespace](/imgs_readme/05initialprompt.jpg)

We'll create all our files here. But how to start?

Here's the problem, I think of myself as a passionate amateur at best, and tinker with too many languages to remember any of their idiosyncrasies to code flawlessly off the top of my head. 

So let's go full Inception, and I'm going to use ChatGPT to help me create a ChatGPT experience to help other creative coders learn ChatGPT. I open up Edge, go to Bing Chat, and type in this prompt:


![initial prompt](/imgs_readme/setupCodespace.png)

and here is the code it gave me. Create a file called index.js and copy this in.

```
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
```

The BingChat reply also gives instructions on my project setup. According to it's instructions, create a folder called /public and add an index.html page and styles.css page in the public folder.

What goes into the index.html page? Let's ask ChatGPT again (in the same conversation, so it remembers the index.js server it just recommended...).

![prompting for client](/imgs_readme/06promptclient.jpg)

And here is the code it generated. Let's just copy and paste that right into the index.html page.

```
<!DOCTYPE html>
<html>
  <head>
    <title>OpenAI GPT-3 Demo</title>
    <link rel="stylesheet" href="/styles.css">
  </head>
  <body>
    <h1>OpenAI GPT-3 Demo</h1>
    <form id="form">
      <label for="prompt">Enter your prompt:</label><br>
      <input type="text" id="prompt" name="prompt"><br><br>
      <input type="submit" value="Submit">
    </form>
    <div id="response"></div>
    <script>
      const form = document.querySelector('#form');
      const responseDiv = document.querySelector('#response');
      form.addEventListener('submit', async (event) => {
        event.preventDefault();
        const prompt = document.querySelector('#prompt').value;
        const res = await fetch('/api/gpt', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ prompt })
        });
        console.log("calling to server...")
        const data = await res.json();
        responseDiv.textContent = data.message;
      });
    </script>
  </body>
</html>
```

I add some minimal css to the styles.css file too, just to make sure it works.

```
body {
   background-color: papayawhip;
}
```

In your Codespace / Visual Studio Code work environment, open the VS Code terminal window ( CTRL-`) and try and run it:

```
$ node index.js
```


### It's not going to work. 


It will complain it doesn't have the 'express' module installed. If you look at the index.js code that was generated, you see that it has some dependencies it assumes are already installed, namely 'express' and 'openai'. They're not, so let's install those now:

```
$ npm install express --save
$ npm install openai --save
```

That (--save) command is going to create and add these modules into a new *package.json* file that helps other people get your project running on their machines by running an *npm install* command the first time they open your code on their own local or cloud machine.

Try and run it again:

```
node index.js
```

### It's still going to work. But we're getting closer.


It keeps choking on the getting the 'openai' module running. It is looking for your OpenAI key, it assumes you have it saved as an ENV variable, but we haven't set that up yet. Let's fix that now. Here is what we're going to do. Add this CODESPACE project we've been building from our BLANK Template as an official REPO on our GitHub Account. You can do that directly in the Codespace window by clicking on the source control icon and following the steps. Name the project what you want, make it public or private, but you probably want to UNCHECK the option of saving that "node_modules" folder it created automatically for you when we installed 'express' and 'openai'. By unchecking that option when it asks what you want to Commit to your new repo, it will also automatically create a *.gitignore* file for you to too. It' actually been doing a bit of stuff behind the scenes. 

A small window should pop up in the lower right hand corner when this repo is setup on your GitHub account, asking you to go to GitHub and view it. Click that button to open in a new browser window. You're back at good 'ol GitHub. Here is what we do next. We need to add your OPENAI Access key to this repo and we're going to do that with *GITHUB CODESPACE SECRETS*.

Click on your Profile in the upper right corner of your GitHub window, and go down to Settings. On the Settings page, on the left hand options, click the CODESPACES section. At the top of the SETTINGS > CODESPACES page, you see the option to add your OpenAI key. Create a new secret, the one I'm using is called 'OPENAI_API_KEY'. Once you have have added your OpenAI API KEY as a Codespace secret, you need to add the REPO you just made, and the one we are coding in your Codespace window, to the list of Repos for that Codespace secret. 

The Codespaces Secret will now be let you use your API key securely in any of your future repos you add to it. Here is how our *index.js* page is calling it: 

```
const openai = new OpenAI(process.env.OPENAI_API_KEY);
```

Restart your Codespace (or it may notice the change and give you an option to reload it directly), and the above line of code should now be able to run.

Let's try running it one more time:

```
node index.js
```

and still no go. But this should be the last time we fail. What's going on?


## The OpenAI Code that BingChat Generated Was Wrong

Let's stop and really look at the OpenAI code that BingChat generated for us and we pasted in *index.js*. It's not the most up to date way to call their services. in fact, you'll notice it's not even calling a ChatGPT model, but the original *davinci* model. Let's do an old fashion search and learn and go directly to OpenAI's page on working with Chat.

![openAI's API page](/imgs_readme/07openai.jpg)

Here is the updated index.js code, with the OpenAI sections rewritten and made a bit more robust. If you know your way around JavaScript a bit, compare this code with what was generated, to get a sense for what has changeed and why. But if not, no worries. We'll loop back later and do a bit more updates before we're done.


```
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// NEW OPENAI CODE
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);


app.use(bodyParser.json());
app.use(express.static('public'));

// UPDATE THE app.post('/api/gpt') FUNCTION AND
// ADD SOME HELPER FUNCTIONS TO STORE ALL THE MESSAGES
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
```

## NOW it should work

If you've setup your CODESPACE secret correctly, and have this repo with the updated code shown above launch your project one more time:

```
$ node index.js
```

It should start up your server, open a little window in the bottom right saying it is hosting a page (don't worry, although it is a URL on the internet, GitHub is handling the security so it is only private to you right now, and you should go ahead and click on that URL it shows you.

You should find the starter template all up and running with the ability to round trip your project.


# The minimum workable project

Although I am still going to walk through the PROJECT I want to build with this, if you just want to get the minimum viable project setup with HTML,CSS and a node server running JavaScript - you can grab a copy and go do your own thing. In THIS repo, you can find the above code
In this current Rep

In THIS repo, you will find two sets of 


go ahead and click it


![RPG inspiration](/imgs_readme/08rpg.jpg)

![the original Mr. Harfang](/imgs_readme/09harfang.jpg)

![Bing image creator](/imgs_readme/10imgcreator.jpg)

![Finding the app look](/imgs_readme/11appbrand.jpg)

![comping in figma](/imgs_readme/12figma.jpg)

![first generation prompts](/imgs_readme/13oldschoolprompt.jpg)

![modern prompt conversations](/imgs_readme/14newschool.jpg)

![exploring more possibilities](/imgs_readme/15moreideas.jpg)

![how this applies to enterprise](/imgs_readme/16thinkingenterprise.jpg)

