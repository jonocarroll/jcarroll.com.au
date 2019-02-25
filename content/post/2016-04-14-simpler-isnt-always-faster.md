---
title: "Simpler isn't always faster"
author: Jonathan Carroll
date: 2016-04-14 21:52:45
slug: simpler-isnt-always-faster
categories: [R]
tags: [rstats]
type: ''
subtitle: ''
image: ''
---
My name is Jonathan, and I have a coding obsession.

<!--more-->

I'll admit it, the <a href="http://adolfoalvarez.cl/the-hitchhikers-guide-to-the-hadleyverse/" target="_blank">Hadleyverse</a> has ruined me. I can no longer read a blog post or <a href="http://stackoverflow.com/users/4168169/jonathan-carroll" target="_blank">stackoverflow question</a> in base <code>R</code> and leave it be. There are improvements to make, and I'm somewhat sure that I know what they are. Most of them involve <code>dplyr</code>. Many involve <code>data.table</code>. Some involve <code>purrr</code>.

<a href="http://www.r-bloggers.com/how-to-sort-a-list-of-dataframes/" target="_blank">This one</a> came up on R-bloggers today (which leads back to <a href="http://www.milanor.net/blog/how-to-sort-a-list-of-dataframes-in-r/" target="_blank">MilanoR</a>) and seemed like a good opportunity. The problem raised was; given a list of <code>data.frame</code>s, can you create a list of the variables sorted into those <code>data.frame</code>s? i.e. can you turn this

[code lang="r"]
df_list_in &lt;- list (
        df_1 = data.frame(x = 1:5, y = 5:1),
        df_2 = data.frame(x = 6:10, y = 10:6),
        df_3 = data.frame(x = 11:15, y = 15:11)
    )
[/code]

into this

[code lang="r"]
df_list_out &lt;- list (
        df_x = data.frame(x_1 = 1:5, x_2 = 6:10, x_3 = 11:15),
        df_y = data.frame(y_1 = 5:1, y_2 = 10:6, y_3 = 15:11)
)
[/code]

That looks like a problem I came across recently. Let's see...

<script src="https://gist.github.com/jonocarroll/119e9db260783d7b459fd8fe4636150d.js"></script>

I managed to replace that function -- which, while fast, is a little obtuse and difficult to read -- with essentially a one-liner

[code lang="r"]
df_list_in %&gt;% purrr::transpose %&gt;% lapply(as.data.frame)
[/code]

You may now proceed to argue over which is easier/simpler/more accessible/requires less knowledge of additional packages/etc... If you ask me, it's damn-near perfect as long as you can place a cursor on <code>transpose</code> in <code>RStudio</code> and hit <code>F1</code> which will bring up the <code>purrr::transpose</code> help menu and explain exactly what is going on. Anyway, how does it compare? Here's Michy's graph (formatting updated and my function added)

<a href="http://jcarroll.com.au/wp-content/uploads/2016/04/violinplot.png" rel="attachment wp-att-718"><img src="http://jcarroll.com.au/wp-content/uploads/2016/04/violinplot.png" alt="violinplot" width="681" height="492" class="aligncenter size-full wp-image-718" /></a>

and then, just for fun (and because I wanted an excuse to try it out) here's a <code>yarrr::pirateplot</code> of the same data

<a href="http://jcarroll.com.au/wp-content/uploads/2016/04/pirateplot.png" rel="attachment wp-att-717"><img src="http://jcarroll.com.au/wp-content/uploads/2016/04/pirateplot.png" alt="pirateplot" width="681" height="492" class="aligncenter size-full wp-image-717" /></a>

My one-line function (without the <code>magrittr</code> syntactical sugar) does slightly better than the <code>arrange_col</code> function (on average), but has a lot less up-front code and is more readable (to me at least). The performance of any of these three doesn't seem like it would have trouble scaling for any practical use-case.

Scaling up the problem to a list of 100 <code>data.frame</code>s each with 1000 observations of 50 variables, the same result pans out as shown in the above <code>microbenchmark</code> and <code>pirateplot</code> below

<a href="http://jcarroll.com.au/wp-content/uploads/2016/04/bigdf_pirateplot.png" rel="attachment wp-att-728"><img src="http://jcarroll.com.au/wp-content/uploads/2016/04/bigdf_pirateplot.png" alt="bigdf_pirateplot" width="600" height="440" class="aligncenter size-medium wp-image-728" /></a>

On the giant example (100 <code>data.frame</code>s of 1000 observations of 50 variables) the difference is 20ms vs 380ms. Honestly, I don't know what I'd do with the additional 360ms, but chances are I'd just waste them. I'll take the efficient code on this one.

Can you do even better than the one-liner? Spot a potential issue? Have I made a mistake? Got comments? You know what to do.
