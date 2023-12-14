# Privacy Sandbox  

## Setup  
1. Create .env if not exists.  
```bash
[ ! -f .env ] && cp env.template .env
```
2. Install yarn.  
```bash
# Ubuntu https://github.com/nodesource/distributions
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash - &&\
sudo apt-get install -y nodejs
corepack enable

# Mac
brew install node corepack
sudo corepack enable

# I've executed `yarn set version stable` when creating this repo, so the packag.json has a line `"packageManager": "yarn@3.6.2"`
yarn -v
# 3.6.2
```

3. Build.  
```bash
# List all workspaces
yarn workspaces list

# This will run `yarn` for all the dir anotated in `workspaces` under the root package.json.  
yarn

# Run `yarn build` for all the dir anotated in `workspaces` under the root package.json PARALLELLY. https://yarnpkg.com/cli/workspaces/foreach/
# I've executed `yarn plugin import workspace-tools` when creating this repo, so the .yarn/plugins has the corresponding cjs
FORCE_COLOR=true yarn workspaces foreach -p run build

# Run a command under a certain package
# yarn workspace <package> xxx, e.g. `yarn workspace publisher build`
```

4. Generate self-signed key
```bash
# https://github.com/FiloSottile/mkcert#installation
brew install mkcert
mkcert -install
# https://github.com/GoogleChromeLabs/protected-audience-demo#setup-https
cd dev_keys
mkcert localhost
```

5. Start nginx
```bash
./nginx.sh
```

## Steps to clear your interesting groups  
1. chrome://settings/privacySandbox  
2. Browser-based ad personalization  
3. Scroll to the bottom  
4. Disable and enable again  
5. refresh  


## Play  
Visit https://localhost:4081/advertiser/travel.html where you’ll be added to an interest group by the JavaScript managed by the demo DSP. You can verify this by visiting the Interest Group section of Chrome DevTools. Open Chrome DevTools > Application. Under Storage, you should see that your browser was added to the Interest Group “test”.  

Next, visit the Publisher page at https://localhost:4083/publisher/index.html. This will render the Demo Publisher page and an iframe that will render the ad. You should be able to observe the bid in the auction by reviewing the Interest Groups section where you saw the “test” Interest Group. You should also see the ad created in Section 4.2.  

Congratulations, you have successfully run a Protected Audience auction and rendered the ad of the winning bid!  

## References  
- https://github.com/JackJey/fledge-demo
- https://github.com/GoogleChromeLabs/protected-audience-demo
- https://vitejs.dev/guide/env-and-mode.html#html-env-replacement
