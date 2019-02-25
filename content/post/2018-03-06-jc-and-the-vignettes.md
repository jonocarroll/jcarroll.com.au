---
title: JC and the Vignettes
author: Jonathan Carroll
date: 2018-03-06 15:55:31
slug: testingyaml
categories: [R]
tags: [rstats]
type: ''
subtitle: ''
image: ''
---
If that's not a great 1960's band name then I don't know what is (hint: I don't know what is).

<a href="https://www.billboard.com/music/the-marvelettes"><img src="https://jcarroll.com.au/wp-content/uploads/2018/03/marvelettes-300x199.jpg", width="300", height="199", alt="The Marvelettes: https://www.billboard.com/music/the-marvelettes", link="https://jcarroll.com.au/wp-content/uploads/2018/03/marvelettes.jpg", align="none"></img></a>

<!--more-->

At the start of the year I set out my 'goals for 2018' just like many of us do; an overly ambitious list of things we'd like to do to better ourselves. My list includes improving my French to better interact with a colleague I cohabitate and work with while onsite (my 48 day streak on Duolingo was interrupted by travel... <em>c'est un bon début</em>); reading more books (two a month, so far so good); writing more blog posts (one a month, this one included); interacting more with the R community; and using a bullet journal (all of these are currently tracked in said bullet journal). 

My original plan for the increased interaction was to pick an R package a month. I'd pick a package which didn't already have a vignette, learn the package, write a vignette, submit it as a PR, and blog about the experience. This seemed straightforward enough. There's a long-standing feeling that too many R packages lack vignettes (note: <a href="https://juliasilge.com/blog/mining-cran-description/">https://juliasilge.com/blog/mining-cran-description/</a> -- an analysis I intend to reproduce/update). I looked through my backlog of interesting packages I meant to look at more closely and checked to see if they already had vignettes... all of them did (womp womp).

For those not familiar, vignettes in R packages are long-form documentation. Not just a listing of each function, but a good solid walkthrough of background, a use-case, examples, motivations, pitfalls, comparisons, performance metrics, and so on. Function documentation rarely provides sufficient detail like this, so vignettes are a convenient way to include some longer discussions about your package. The problem is that people either neglect to, forget to, or aren't aware that they can (and should!) write vignettes for their packages. 

Rather than admit defeat and throw another resolution on the ever-growing pile of failures (I'm looking your way, dusty calligraphy set) I decided to take a different approach. I sent out an offer on Twitter: <em>suggest a package which needs a vignette</em>. It seemed to be popular enough

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">The old argument was that <a href="https://twitter.com/hashtag/rstats?src=hash&amp;ref_src=twsrc%5Etfw">#rstats</a> packages generally lack vignettes. Someone scraped CRAN and found &#39;most&#39; (lots of?) packages don&#39;t have them.<br><br>With my book now with the copyeditors, I finally have some time to get/give back to this awesome community...</p>&mdash; Jonathan Carroll (@carroll_jono) <a href="https://twitter.com/carroll_jono/status/961139524901527552?ref_src=twsrc%5Etfw">February 7, 2018</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">So, my offer: point me towards a new(ish) package on GitHub that (a) does something cool, and (b) doesn&#39;t have a vignette. I&#39;ll learn the package inside-out, write a vignette, submit it as a PR, and blog about it. Your package, someone else&#39;s which you use, I don&#39;t mind...</p>&mdash; Jonathan Carroll (@carroll_jono) <a href="https://twitter.com/carroll_jono/status/961139533701054464?ref_src=twsrc%5Etfw">February 7, 2018</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

Thus began the 'Volunteer Vignettes' program. I got to work on the first one almost immediately, and doing so has already uncovered bugs, inconsistencies, and insights to the author (I do plan to start a conversation with original authors before beginning any actual work). I'll be writing each one up once I'm 'done' with it, sharing the insights discovered along the way, plus some new ideas about how vignettes might evolve.

If you're new to vignettes, at this point you may be asking "How does one go about making one? What tools are required? How do I include one in my package?", and I'm glad you asked. Over the next few months I'll be blogging about vignettes; how they're currently used, how they might be more useful, and how we might be able to get people to use them more. I'm also scheduled to present the eventual conclusion of this project at <a href="https://user2018.r-project.org/">userR 2018</a>, so I'd better get it done!

For now, stay tuned!

P.S. for those interested in a very old-school jam:

<iframe width="560" height="315" src="https://www.youtube.com/embed/425GpjTSlS4?rel=0" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>