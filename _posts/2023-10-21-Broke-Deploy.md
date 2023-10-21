---
layout: post
author: Malladi Pradyumna
tags: [update, miscellaneous]
---

# It happened.

Broke my website deploy. I knew I shouldn't have copied the workflow without understanding. The updates I made locally would show in the `jekyll serve` but it wouldn't when built and deployed to pages using the workflow.

Fortunately there is a very simple temporary solution for this. I changed the deploy mechanism to deploy from a branch and am moving the static files to /docs before pushing updates. Now I have to add learning workflows to my long list of things I am never gonna get done.