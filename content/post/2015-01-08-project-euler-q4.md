---
title: 'Project Euler Q4 :: Largest palindrome product'
author: Jonathan Carroll
date: 2015-01-08 22:24:09
slug: project-euler-q4
categories: [R]
tags: [rstats]
type: ''
subtitle: ''
image: ''
---
<a title="Project Euler" href="http://jcarroll.com.au/2015/01/code/project-euler/" target="_blank">Explanation</a>.&nbsp;Standard caveat: don't look here if you are trying to do these yourself.
<blockquote>A palindromic number reads the same both ways. The largest palindrome made from the product of two 2-digit numbers is 9009 = 91 × 99.

Find the largest palindrome made from the product of two 3-digit numbers.</blockquote>

This seems like another brute-force question. There's not that many numbers to test.

[code language="r"]
## check the worked solution
91*99 # 9009
[/code]

I'm not aware of an <code>is.palindrome</code> function, but it's easy enough to code.

[code language="r"]
is.palindrome &lt;- function(x) {
   ## convert to character and explode
   x &lt;- unlist(strsplit(as.character(x), &quot;&quot;))
   ## check if the vector is palindromic
   return(identical(x, rev(x)))
}
is.palindrome(9009) # TRUE
is.palindrome(9001) # FALSE
[/code]

Let's try it out for the two digit example and make sure we're on the right track. Multiply all two digit numbers together and test them for palindrome-ness, then find the largest of those.

[code language="r"]
twodigits &lt;- 10:99
prods &lt;- expand.grid(twodigits, twodigits)
prods$prod &lt;- prods[ ,1]*prods[ ,2]
prods.palindromes &lt;- prods$prod[sapply(prods$prod, is.palindrome)]
max(prods.palindromes) # 9009
[/code]

Great! What about three digits?

[code language="r"]
threedigits &lt;- 100:999
prods &lt;- expand.grid(threedigits, threedigits)
prods$prod &lt;- prods[ ,1]*prods[ ,2]
prods.palindromes &lt;- prods$prod[sapply(prods$prod, is.palindrome)]
largest &lt;- max(prods.palindromes)
largest # 906609

### CORRECT

[/code]

Takes a little longer, and generates a nice little 10MB, 810,000 element vector along the way.

[code language="r"]
format(object.size(prods), units=&quot;Mb&quot;) # 9.4 Mb
[/code]

The two three digit numbers?

[code language="r"]
prods[prods$prod==largest, ] # 913 993
[/code]
