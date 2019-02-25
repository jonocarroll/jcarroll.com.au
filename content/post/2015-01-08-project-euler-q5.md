---
title: 'Project Euler Q5 :: Smallest multiple'
author: Jonathan Carroll
date: 2015-01-08 23:25:58
slug: testingyaml
categories: []
tags: [rstats]
type: ''
subtitle: ''
image: ''
---
<a title="Project Euler" href="http://jcarroll.com.au/2015/01/code/project-euler/" target="_blank">Explanation</a>.&nbsp;Standard caveat: don't look here if you are trying to do these yourself.
<blockquote>2520 is the smallest number that can be divided by each of the numbers from 1 to 10 without any remainder.

What is the smallest positive number that is <dfn title="divisible with no remainder">evenly divisible</dfn> by all of the numbers from 1 to 20?</blockquote>

I'm getting the feeling that brute-force is going to be quite the useful tool for these questions. Thankfully <code>R</code> can churn through numbers really fast.

So, we're after a number divisible by <code>1, 2, 3, ..., 10</code>. Let's vectorise that and check the stated answer

[code language="r"]
all(2520 %% 1:10 == 0) # TRUE
[/code]

Easy enough. The solution value must be divisible by 20, so we can just test multiples of 20 for the above property

[code language="r"]
i &lt;- 20
y &lt;- FALSE
while(!y) {
  i &lt;- i + 20
  y &lt;- all(i %% 1:20 == 0)
}
i # 232792560

### CORRECT
[/code]

Wrapping a <code>system.time()</code> call around that assures us that this is still done in under a minute, as per the guidelines

[code language="r"]
   user  system elapsed 
 26.150   0.000  26.192 
[/code]