#!/bin/bash
rm -rf obsidian-export
rm -rf quartz
git clone https://github.com/mssrprad/obsidian-export
git clone https://github.com/mssrprad/quartz
cd quartz;
npm i;
rm -rf content/*;
obsidian-export ~/Desktop/Obsidian-Vault/Pradu/ ./content --frontmatter=always --no-recursive-embeds;
npx quartz build
mv content/* ../new_website/
mv public/* ../new_website/dist
npx quartz build --serve