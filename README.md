# Hands on with ChatGPT & GitHub Codespaces

![cover slide](/imgs_readme/02cover.jpg)

Greetings MSFTies from our AI Design Day talk this morning (April 19, 2023). here is a step by step breakdown of what we demo’d today - creative coding & exploratory engineering with ChatGPT APIs from scratch using vanilla JS, HTML & CSS. This code is in no way complete, but represents the initial steps I went through to get a sketch setup and start tinkering with an idea. The idea we will stand up is a ChatGPT interactive story engine for my son, called "Mr Harfang's Worlds of Wonder". Once we're done, I'll show you how to FORK this repo, add your own OpenAI API key as Codespaces Secret, and use this for whatever project you want to make too. Let's go break some eggs!

![creative coding landscape](/imgs_readme/03creativecoding.jpg)

Normally, I code up sketches on my Mac, using Visual Studio Code and designing, testing and experimenting locally. Occasionally, I would push up some projects to GitHub to share casually with someone, or just store in the cloud. But my GitHub relationship hasn't traditionally be about Pull Requests, Collaborations, Versioning, etc. DevOps does not really describe my messy, creative process. I'm not converging on a stable answer, I'm diverging toward unexplored curiosities. Once GitHub made it easy to deploy your repo to it's Github Pages, I started payign more attention. A couple clicks later and my archived rickbarraza.com repo is retired, but live again. Nice. But two things were still constraints: 1) I would do still do my dev and testing locally, in Visual Studio Code, and 2) GP Pages does the serving of static (client side) pages for me, but doesn't give me COMPUTE so I can run (host) my own code on the backend. And I need that if I want to call out to other APIs or keep passwords and content safe, etc.

![github landscape](/imgs_readme/04github.jpg)

This is where GitHub's new CODESPACES completely changes the game. CODESPACES is a consumer friendly offering of Microsoft's Dev Containers, preconfigured to get you up and running with a free 1) virtual cloud computer (image) and 2) a cloud based instance of Visual Studio Code with your account settings sync'd and 3) a live terminal where you can dev, run, review and iterate all from your browser. It's fantastic. Most importantly, this lets more creatives, artists and designers start playing with OpenAI and other APIs and technologies faster than ever. They don't need to setup or configure their own home machine to run Python, handle authentication, etc. You can also go into another persons repo on GitHub and instead of needing to clone it locally, setup an environment, and try and get it running on your machine, a well configured Repo will let a visitor open it into a Codespace, configured to run in the cloud on a suitable machine. They're still gaining in popularity, but Codespaces are something that I think will boost creative coding, and teaching/learning/researching design + AI, significantly in the next few years. It's what we'll use for the entire walkthrough.

## Setting up our Codespace with OpenAI

Enough chatting, let's start making. We are going to use Codespaces to create a NODE.JS server that serves up an HTML/CSS page that will be an interactive, ChatGPT based RPG storyteller. Here's the problem, I think of myself as a passionate amateur at best, and tinker with too many languages to remember any of their idiosyncrasies to code flawlessly off the top of my head. 

So let's go full Inception, and I'm going to use ChatGPT to help me create a ChatGPT experience to help other creative coders learn ChatGPT. I open up Edge, go to Bing Chat, and type in this prompt:


![initial prompt](/imgs_readme/05initialprompt.jpg)





![prompting for client](/imgs_readme/06promptclient.jpg)

![openAI's API page](/imgs_readme/07openai.jpg)

![RPG inspiration](/imgs_readme/08rpg.jpg)

![the original Mr. Harfang](/imgs_readme/09harfang.jpg)

![Bing image creator](/imgs_readme/10imgcreator.jpg)

![Finding the app look](/imgs_readme/11appbrand.jpg)

![comping in figma](/imgs_readme/12figma.jpg)

![first generation prompts](/imgs_readme/13oldschoolprompt.jpg)

![modern prompt conversations](/imgs_readme/14newschool.jpg)

![exploring more possibilities](/imgs_readme/15moreideas.jpg)

![how this applies to enterprise](/imgs_readme/16thinkingenterprise.jpg)

