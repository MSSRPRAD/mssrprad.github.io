#!/bin/bash
git clone https://github.com/mssrprad/obsidian-export
cd quartz;
npm i;
rm -rf content/*;
obsidian-export ~/Desktop/Obsidian-Vault/Pradu/ ./content --frontmatter=always --no-recursive-embeds;
npx quartz build --serve