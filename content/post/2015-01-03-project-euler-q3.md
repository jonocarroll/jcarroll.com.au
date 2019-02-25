---
title: 'Project Euler Q3 :: Largest prime factor'
author: Jonathan Carroll
date: 2015-01-03 00:52:07
slug: testingyaml
categories: []
tags: [rstats]
type: ''
subtitle: ''
image: ''
---
<a title="Project Euler" href="http://jcarroll.com.au/2015/01/code/project-euler/" target="_blank">Explanation</a>. Standard caveat: don't look here if you are trying to do these yourself.
<blockquote>The prime factors of 13195 are 5, 7, 13 and 29.

What is the largest prime factor of the number 600851475143 ?</blockquote>
It seems so simple at first glance, until of course you look at how big that last number is. I started off by making sure I understood the issue.

[code language="r"]
## check the worked solution
5*7*13*29 # 13195
[/code]

so far so good. At this point I realised that there isn't an inbuilt <code>is.prime</code> so I stole one from <a title="rlist examples" href="http://cran.r-project.org/web/packages/rlist/vignettes/Examples.html" target="_blank">this site.</a>

[code language="r"]
is.prime &lt;- function(num) {
 if (num == 2L) {
 TRUE
 } else if (any(num %% 2L:(num-1L) == 0L)) {
 FALSE
 } else {
 TRUE
 }
}
[/code]

Testing the example works pretty well...

[code language="r"]
## let's loop up to n and list the prime factors
prime.factors &lt;- function(n) {
 primes &lt;- c()
 for(i in 1:n) {
 ## take advantage of lazy logical evaluation
 ## and short-cut to only the factors
 if(n %% i == 0 &amp; is.prime(i)) primes &lt;- c(primes, i)
 }
 return(primes)
}
prime.factors(13195) # 5 7 13 29
[/code]

but I hit a snag when I tried to do the same for the problem value.

[code language="r"]
w &lt;- as.integer(600851475143) ## NAs introduced by coercion 
prime.factors(600851475143) ## Error: cannot allocate vector of size 4476.7 Gb
[/code]

Sure enough, that's bigger than the machine precision integer allows

[code language="r"]
as.numeric(&quot;600851475143&quot;) &gt; .Machine$integer.max # TRUE
[/code]

so, I abandoned the pre-filled list of values and went again with the brute force. For the sake of speeding it up, I delayed testing for primes until later, as I can do that over the generated list with an <code>apply</code> and only bothered testing the values below <code>sqrt(n)</code> and <code>n/f</code> where <code>f</code> is the largest found prime so far.

[code language="r"]
## lists are too big. Find the primes by brute force
## using floating point representations
z &lt;- as.numeric(&quot;600851475143&quot;)
i &lt;- 2
factors &lt;- 1
## loop through values of i that are
## less than sqrt(z) and
## less than z/the largest found factor
while(i &lt; sqrt(z) &amp; i &lt; z/max(factors)) {
 ## skip the prime test for now
 if(z %% i == 0) factors &lt;- c(factors, i)
 i &lt;- i + 1
}
factors
factors.prime &lt;- sapply(factors, is.prime)
primes &lt;- factors[factors.prime] # 71 839 1471 6857
z == prod(primes) # TRUE

max(primes) # 6857

### CORRECT
[/code]