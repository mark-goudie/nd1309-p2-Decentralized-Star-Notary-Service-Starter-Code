## Project 5 Instructions

# Task 1

Your Project is to Modify the StarNotary version 2 contract code to achieve the following:

Add a name and a symbol for your starNotary tokens. Resource [Complete]
Add a function lookUptokenIdToStarInfo, that looks up the stars using the Token ID, and then returns the name of the star. [Complete] - StarNotary.sol
Add a function called exchangeStars, so 2 users can exchange their star tokens...Do not worry about the price, just write code to exchange stars between users. [Complete] - StarNotary.sol
Write a function to Transfer a Star. The function should transfer a star from the address of the caller. The function should accept 2 arguments, the address to transfer the star to, and the token ID of the star. [Complete] - StarNotary.sol

# Task 2

Add supporting unit tests, to test the following:
The token name and token symbol are added properly. [Complete] - TestStarNotary.js
2 users can exchange their stars. [Complete] - TestStarNotary.js
Stars Tokens can be transferred from one address to another. [Complete] - TestStarNotary.js

# Task 3

Deploy your Contract to Public Testnet
Edit the truffle.config file to add settings to deploy your contract to the Goerli or Sepolia Public Network. [Complete] - truffle-config.js rinkeby network

# Helper Points:

Command used to deploy to Rinkeby truffle migrate --reset --network rinkeby
You will need to have your Metamask’s seed and Infura setup.
This was shown to you in detail in the lesson on Solidity, while creating ERC-20 tokens on Rinkeby.

# Task 4

Modify the front end of the DAPP to achieve the following:
Lookup a star by ID using tokenIdToStarInfo() (you will have to add code for this in your index.html and index.js files) [Complete]

# Project Submission Instructions:

Inside your project folder, create a Readme.md file. The readme.md file should include the following:
Specify the Truffle version and OpenZeppelin version used in the project.
Your ERC-721 Token Name
Your ERC-721 Token Symbol
Your “Token Address” on the Rinkeby Network
Upload your folder to GitHub.
Submit your GitHub Repository Link.
Evaluation
Your project will be evaluated by a Udacity reviewer according to the Project Rubric. Be sure to review it thoroughly before you submit. All criteria must "meet specifications" in order to pass.

What's next?
Once your project is submitted it will be picked up by one of our project reviewers. They will provide detailed feedback based on your submission and get back to you within 24 hours. Once your feedback is complete, you will receive an email with details about your project review.

Project Submission Checklist
Before submitting your project, please review and confirm the following items.

I am confident all rubric items have been met and my project will pass as submitted. (If not, I will discuss with my mentor prior to submitting.)

Project builds correctly without errors and runs.

All required functionality exists and my project behaves as expected per the project's specifications.
