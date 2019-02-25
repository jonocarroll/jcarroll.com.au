---
title: Constricted development with reticulate
author: Jonathan Carroll
date: 2018-04-04 23:38:05
slug: reticulate
categories: [R]
tags: [rstats]
type: ''
subtitle: ''
image: ''
---
I've been using the <a href="https://github.com/rstudio/reticulate" rel="noopener" target="_blank">reticulate</a> package occasionally for a while now, so I was surprised to see that it had only just been officially released. 

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">reticulate: R interface to Python <a href="https://t.co/qVWmwoMQAP">https://t.co/qVWmwoMQAP</a>. Comprehensive set of interoperability tools including R Markdown Python engine <a href="https://twitter.com/hashtag/rstats?src=hash&amp;ref_src=twsrc%5Etfw">#rstats</a> <a href="https://twitter.com/hashtag/pydata?src=hash&amp;ref_src=twsrc%5Etfw">#pydata</a> <a href="https://t.co/SuWM6Y3Pk0">pic.twitter.com/SuWM6Y3Pk0</a></p>&mdash; RStudio (@rstudio) <a href="https://twitter.com/rstudio/status/978293244390985728?ref_src=twsrc%5Etfw">March 26, 2018</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

<!--more-->

It's a brilliant piece of work, allowing python and R to coexist in the same workflow. 

Another opportunity came up today to use it so I thought it might be nice to do a very quick blog post to show just how easy it is to take external python code and have it callable directly from R. In this case, <a href="https://twitter.com/coolbutuseless" rel="noopener" target="_blank">@coolbutuseless</a> posed a challenge on Twitter to write a fast 'needle in a haystack' search of a small vector inside a larger one. I looked over the existing candidates and figured some sort of <a href="https://en.wikipedia.org/wiki/Sieve_of_Eratosthenes" rel="noopener" target="_blank">Sieve of Eratosthenes</a>-esque algorithm might have a chance (though the name eluded me entirely at the time). 

My proposal was to search for the first digit using <code>which()</code>, and use this reduced vector of possible-matches in additional tests on the remaining parts of the 'needle'. <a href="https://twitter.com/coolbutuseless" rel="noopener" target="_blank">@coolbutuseless</a> refactored my attempt allowing for arbitrary length needles and found it to <a href="https://coolbutuseless.bitbucket.io/2018/04/03/finding-a-length-n-needle-in-a-haystack/" rel="noopener" target="_blank">do quite well against the current offerings</a>. What he still wanted though was a <a href="https://en.wikipedia.org/wiki/Boyer%E2%80%93Moore_string_search_algorithm" rel="noopener" target="_blank">Boyer–Moore string search algorithm</a> implementation. This is apparently what <a href="https://lists.freebsd.org/pipermail/freebsd-current/2010-August/019310.html" rel="noopener" target="_blank">GNU <code>grep</code> uses</a>, so it's probably pretty okay.

That algorithm is pretty clever about how it goes about the search, starting in a similar way to what I did (the sieve approach was apparently the leading string match method prior to Boyer-Moore). It's much more complicated though, so I wasn't about to write one of those myself in R. Nowadays, people think of C/C++ when there's functionality they want to grab from elsewhere. There's a C implementation on the Wikipedia site, so that seems like a nice place to start. I <a href="https://gist.github.com/jonocarroll/d658b5ccf33aaef150b6b36f055d2d6d#file-boyermoore-c">saved the text</a> to a new <code>boyermoore.c</code> file and ran 

<code>R CMD SHLIB boyermoore.c</code>

from a terminal to compile it into <code>boyermore.so</code>. This could then be loaded into R with <code>dyn.load("boyermore.so")</code> and in theory called with <code>.C("boyer_moore", &lt;something&gt;, &lt;something&gt;)</code>. I tried a couple of <code>&lt;something&gt;</code>s (which weren't pointers) and promptly crashed RStudio.

The python implementation is also listed on Wikipedia, so I figured that's another route to try. I <a href="https://gist.github.com/jonocarroll/d658b5ccf33aaef150b6b36f055d2d6d#file-boyermoor-py">saved the text</a> to a new <code>boyermoor.py</code> file (also embedded below) and started about loading the functions from R. This is actually much simpler than for C:

[code language="r"]
library(reticulate)
bm &lt;- py_run_file(&quot;boyermoor.py&quot;)
[/code]

This executes the python file and creates a new named list with each exported python function as an element. How easy is that!?! Calling the function would be as easy as

[code language="r"]
bm$string_search(needle, haystack)
[/code]

Not <em>quite</em> that easy of course... The implementation assumes that both the 'needle' and the 'haystack' are text, not numbers. To solve this, I converted my numbers (in the range 0 to 12) to letters using the built-in <code>LETTERS</code> vector. After testing that it worked as expected, a benchmark test showed that it was nowhere near as fast as my R approach. I can't say this is due to the algorithm itself, which should be fairly fast, but probably has more to do with the fact that I'm using two different languages.

The entire call from R looks pretty neat and tidy

[gist id="d658b5ccf33aaef150b6b36f055d2d6d" file="testBMpy.R"]

despite a lot of python code in the background

https://gist.github.com/jonocarroll/d658b5ccf33aaef150b6b36f055d2d6d#file-boyermoor-py

I'd certainly recommend having <code>reticulate</code> functions in your arsenal next time you need to attack a problem using python from within R. There's a whole heap of useful ways to interact between R and python with this including importing python modules and calling python scripts, etc...

As a side-note: keep an eye on the <a href="https://github.com/rstats-go" rel="noopener" target="_blank">ergo project</a> to connect the go language in just as easily.
