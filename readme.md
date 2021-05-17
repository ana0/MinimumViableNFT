# Deploying an NFT (or how the shovel is built)

1. install text editor if you don't have one. I use Sublime Text, and like that it works the same way on all major operating systems: https://www.sublimetext.com/3, but any of them will work. In a pinch, you can get by with the defaults for your operating system, which are notepad (Windows), nano (Linux) and textedit (osx).

2. verify that everything is installed - you can do this by opening a terminal and typing `node -v` and `git --version`. It should print the version number in both cases

3. from a terminal in some convenient place, clone the example code repo: `git clone https://github.com/ana0/MinimumViableNFT.git`

4. move into the folder you just cloned `cd MinimumViableNFT`

5. install the dependencies: `npm ci` (this might take awhile)

6. make a .env file with `cp .env.example .env`. On windows, use `copy .env.example .env` instead. Open this file in your text editor, and put the 12 word seed phrase from your metamask in there. Be careful with this step! If you're working inside this repo, the .env file is in the .gitignore, and won't get committed - but if you move this project or any code snippets elsewhere, be sure to check! If your 12 word seed is committed to github, any funds/assets in that account will likely be stolen

7. make an account on pinata (https://pinata.cloud)

8. upload an image to pinata (please use one you own), and be sure to check the box to "preserve filename"

9. again using your text editor, edit the file metadata.json to include the link to your image. You can also change the name and description to be anything you want

10. upload the metadata to pinata, again being sure to check the box to "preserve filename", and get the CID

11. using your text editor, change the CID in the file migrations/02_deploy_main_contract.js

12. from your terminal open in the MinimumViableNFT folder, run: `npm run deploy`

13. go to opensea and create an account, this will ask you to sign a message with metamask. you should see your NFT in your wallet

