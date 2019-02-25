---
title: Bad Neighbours (no, not the movie)
author: Jonathan Carroll
date: 2016-04-30 01:06:29
slug: bad-neighbours
categories: [R]
tags: [rstats]
type: ''
subtitle: ''
image: ''
---
Another day, another compulsion to see if I can do any better than someone's solution. <!--more-->

This one also comes from the <a href="http://fivethirtyeight.com/features/can-you-solve-the-puzzle-of-your-misanthropic-neighbors/" target="_blank">FiveThiryEight Puzzler challenge</a> courtesy of <a href="https://xianblog.wordpress.com/2016/04/29/gap-frequencies/" target="_blank">Xi'an</a>

The original challenge this time was

<blockquote>The misanthropes are coming. Suppose there is a row of some number, N, of houses in a new, initially empty development. Misanthropes are moving into the development one at a time and selecting a house at random from those that have nobody in them and nobody living next door. They keep on coming until no acceptable houses remain. At most, one out of two houses will be occupied; at least one out of three houses will be. But what’s the expected fraction of occupied houses as the development gets larger, that is, as N goes to infinity?</blockquote>

which seems straightforward enough. Xi'an has a nice writeup of the analytical solution (which looks pretty well thought out) but that's not what caught my attention. The (probably not intentionally provocative) statements

<blockquote>A riddle from The Riddler where brute-force simulation does not pay:</blockquote>

<blockquote>Hence this limits the realisation of simulation to, say, N=10⁴</blockquote>

however, are like a red flag to a bull for me. The code provided for Xi'an's solution isn't optimised, and doesn't take advantage of some potential speed-ups. 10,000 iterations seems like it should be quick. There's also a typo in the <code>microbenchmark</code> code there; <code>time</code> should be <code>times</code> otherwise it's passed as a lambda function evaluating <code>time=10</code>. Anyway, improvements to the code can be made.

I took a slightly different approach; I assigned a vector of 'houses' being either occupied or available, identified as such by a boolean (<code>TRUE</code>/<code>FALSE</code>). For the purposes of this question, available means that there is a) no occupant; b) no occupant on either side. The function I ended up with was

[code language="r"]
misanthropist &lt;- function(N) {
  
  occupied   &lt;- rep(FALSE, N)
  acceptable &lt;- rep(TRUE, N)
  
  while(any(acceptable)) {
    possible &lt;- .Internal(which(acceptable))
    occupied[movedin &lt;- possible[.Internal(sample(length(possible), 1, FALSE, NULL))]] &lt;- TRUE
    acceptable[c(movedin-1, movedin, movedin+1)] &lt;- FALSE
  }
  
  return(mean(occupied))
}

library(compiler)
misanthropist_c &lt;- cmpfun(misanthropist)
[/code]

There are a heap of tricks employed here to speed evaluation up, and a few that aren't because it turns out they didn't perform better.

<ul>
	<li> the <code>acceptable</code> vector is populated independently of the <code>occupied</code> vector; <code>acceptable = ! occupied</code> seemed like it was a contender but ended up being slower.</li>
	<li> <code>any(acceptable)</code> works faster than <code>sum(acceptable)>0</code> in the <code>while</code> loop, presumably because of short-circuiting (we only need to know that one is <code>TRUE</code>, at which point we don't need to keep testing).</li>
	<li> I've used <code>.Internal</code> calls where possible (<code>which</code>, <code>sample</code>); this removes a tiny bit of overhead.</li>
	<li> the switching of <code>acceptable</code> to <code>FALSE</code> for the newly occupied house and those on either side can be done in a single step via a <code>c()</code> subsetting. Originally I had coded around the potential issues of trying to set <code>acceptable[0]</code> or <code>acceptable[N+1]</code> when their neighbours moved in, but as it turns out, R is happy to silently assign beyond the bounds of that vector and move on, so no more checks needed.</li>
	<li> the proportion of occupied houses is easily calculated at the end given that <code>as.integer(TRUE)==1</code> and <code>as.integer(FALSE)==0</code>, so the mean of the boolean vector is the proportion of <code>TRUE</code> values.</li>
	<li> finally, I've byte-compiled the function with <code>compiler::cmpfun</code>. Built-in functions in <code>base</code> are already byte-compiled, and this helps just a little bit more.</li>
</ul>

Back to the original question; how many iterations can we do? First, let's compare what we've got so far with a reasonable number of iterations

[code language="r"]
&gt; microbenchmark(frqns(1000L), misanthropist_c(1000L), times=3, unit=&quot;ms&quot;)
Unit: milliseconds
                   expr         min          lq        mean      median          uq         max neval
           frqns(1000L) 3600.981381 3601.460353 3655.512618 3601.939325 3682.778237 3763.617149     3
 misanthropist_c(1000L)    3.447858    3.470277    3.512251    3.492697    3.544448    3.596199     3
[/code]

Uh, yep. That's, just a little bit faster. Smidgen. 3.5ms/1000 iterations. What about a few more iterations on my optimised function? How about that 10,000 limit?

[code language="r"]
&gt; microbenchmark(misanthropist_c(10000L), times=3, unit=&quot;ms&quot;)
Unit: milliseconds
                    expr      min       lq     mean   median       uq      max neval
 misanthropist_c(10000L) 194.0501 194.8379 198.7545 195.6258 201.1066 206.5875     3
[/code]

Maybe we shouldn't get too cocky. 10 times as many iterations takes 56 times longer.

[code language="r"]
&gt; microbenchmark(misanthropist_c(100000L), times=3, unit=&quot;ms&quot;)
Unit: milliseconds
                     expr      min       lq    mean  median       uq      max neval
 misanthropist_c(100000L) 18260.85 18355.87 18422.4 18450.9 18503.18 18555.47     3
[/code]

That brings us up to 184ms/1000 iterations. 10 times as many iterations again takes 92 times longer. It's definitely slowing down.

[caption id="attachment_805" align="aligncenter" width="688"]<a href="http://jcarroll.com.au/wp-content/uploads/2016/04/log10log10.png"><img src="http://jcarroll.com.au/wp-content/uploads/2016/04/log10log10.png" alt="logging both axes shows the power-law relation between these" width="688" height="428" class="size-full wp-image-805" /></a> logging both axes shows the power-law relation between these[/caption]

On a log-log plot of time against iterations with a slope of 2, it's clearer that the problem scales as $latex \mathcal{O}(n^2)$. That suggests that we should be able to complete the 1,000,000 iteration evaluation in about 20 minutes. 2,000,000 iterations in around 1 hour 20 minutes. 3,000,000 in 3 hours. Where am I going with this you ask? Xi'an requested help from <a href="http://math.stackexchange.com/questions/1758065/limit-of-recursive-sequence-n2q-n-1n-12q-n-12n-2q-n-2" target="_blank">stackexchange</a> (a great move which paid off well) to get the analytical solution to the problem. If you check the timestamps, you'll notice 

[code]
# asked    Apr 25 at 14:04
# answered Apr 25 at 16:25
[/code]

So, let's say that stackexchange was offline when you were impatiently working on a solution, you coded perfectly and knew how to optimise your functions. How close to the right answer can you get in this amount of time (2.5 hours). We can probably do at most 2,000,000 iterations. Does that reach a close-enough solution? Rather than making my code run for that long, let's see if Xi'an's recursive equation gets the same answer (obviously faster).

[code language="r"]
xian &lt;- function(N) {
  a=b=1
  for (n in 3:N){ C=(1+2*a+(n-1)*b)/n;a=b;b=C}
  return(C/N)
}

xian1e5 &lt;- xian(1e5L)
mine1e5 &lt;- misanthropist_c(1e5L)
format(2*100*(xian1e5 - mine1e5)/(xian1e5 + mine1e5), digits=3)
# 0.0683
[/code]

so off by 0.07% at that stage, presumably getting closer with more iterations. Let's use the recursive equation for this next bit then, knowing that in the above scenario we would be using the full iterative approach. The recursive expression itself can also be optimised. I did re-write it in C (<code>xian_c</code>) to see if that helped, but <code>compiler:cmpfun</code> (as <code>xian_c2</code>) does just as good a job (as one might expect)

[code language="r"]
microbenchmark(xian(1e7), xian_c(1e7), xian_c2(1e7), times=5, unit=&quot;ms&quot;)
Unit: milliseconds
           expr        min         lq       mean     median         uq        max neval
 xian(1e+07)    16881.8007 16920.1492 16935.2306 16931.9014 16963.9973 16978.3044     5
 xian_c(1e+07)    114.8676   115.0287   115.0771   115.0948   115.1507   115.2438     5
 xian_c2(1e+07)   114.8645   114.9419   116.2547   114.9835   117.2379   119.2454     5
[/code]

so clearly some improvements can be made. This one scales much better with iterations, to the point that I can just max it out

[code language="r"]
.Machine$integer.max
# 2147483647
format(xian_c(.Machine$integer.max), digits=20)
                  # 0.43233235833753796973
0.5*(1-exp(-2))   # 0.43233235838169364884
[/code]

So now we have an upper limit on precision. We'll be able to get at best within 0.0000000102% of the exact answer.

If I repeatedly use the <code>xian_c</code> function with different numbers of iterations, we can see how well we should expect to do

[caption id="attachment_812" align="aligncenter" width="688"]<a href="http://jcarroll.com.au/wp-content/uploads/2016/04/pcerror-1.png"><img src="http://jcarroll.com.au/wp-content/uploads/2016/04/pcerror-1.png" alt="is 2e-5% close enough for a couple of hours work?" width="688" height="428" class="size-full wp-image-812" /></a> is 2e-5% close enough for a couple of hours work?[/caption]

And there we have it. If we'd been stuck with the non-recursive method and needed to get as close to the right answer as possible in a comparable time to obtaining the analytic solution and coding/running it, we could get pretty darn close. I'd say the brute-force method lives to see another day! ... provided you do a bit of optimising and don't mind worrying about the <a href="https://en.wikipedia.org/wiki/Halting_problem" target="_blank">Halting problem</a>.

Did I miss an important optimisation? Know a better approach? Hit the comments and let me know!

Title image © Copyright <a title="View profile" href="http://www.geograph.org.uk/profile/39302" xmlns:cc="http://creativecommons.org/ns#" property="cc:attributionName" rel="cc:attributionURL dct:creator">Jaggery</a> and licensed for <a href="http://www.geograph.org.uk/reuse.php?id=3025760">reuse</a> under this <a rel="license" href="http://creativecommons.org/licenses/by-sa/2.0/" class="nowrap" about="http://s0.geograph.org.uk/geophotos/03/02/57/3025760_8ad38adb.jpg" title="Creative Commons Attribution-Share Alike 2.0 Licence">Creative Commons Licence</a>.
