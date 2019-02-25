---
title: 'Project Euler Q1 :: Multiples of 3 and 5'
author: Jonathan Carroll
date: 2015-01-02 22:45:10
slug: project-euler-q1
categories: [R]
tags: [rstats]
type: ''
subtitle: ''
image: ''
---
<a title="Project Euler" href="http://jcarroll.com.au/2015/01/code/project-euler/" target="_blank">Explanation</a>. Standard caveat: don't look here if you are trying to do these yourself.
<blockquote>If we list all the natural numbers below 10 that are multiples of 3 or 5, we get 3, 5, 6 and 9. The sum of these multiples is 23.

Find the sum of all the multiples of 3 or 5 below 1000.</blockquote>
This one's pretty straight forward, really, as one might hope being the first question. R's built-in subsetting mechanism handles the extraction fairly nicely. I perhaps would have liked a way to do this without first defining <code>x</code>; though I suppose it could just be repeated in the last line.

[code language="r"]
## check the worked solution
sum(c(3,5,6,9)) # 23

## values &lt; 1000
x &lt;- 1:999

## sum of x % 3 or x % 5
sum(x[x %% 3 == 0 | x %% 5 == 0]) # 233168

### CORRECT
[/code]
