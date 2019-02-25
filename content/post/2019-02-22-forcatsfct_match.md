---
title: forcats::fct_match
author: Jonathan Carroll
date: 2019-02-22 23:57:25
slug: forcatsfct_match
categories: []
tags: [rstats]
type: ''
subtitle: ''
image: ''
---

This journey started almost exactly a year ago, but it's finally been sufficiently worked through and merged! Yay, I've officially contributed to the <a href="https://www.tidyverse.org/">tidyverse</a> (minor as it may be).

<div style="display:table-cell; vertical-align:middle; text-align:center"><img src="https://jcarroll.com.au/wp-content/uploads/2019/02/zoidberg_helping.jpeg" alt="" class="wp-image-1243"/></div>

<!--more-->

It began with <a href="https://twitter.com/carroll_jono/status/971093803099541504?ref_src=twsrc%5Etfw">a tweet</a>, recalling a surprise I encountered that day during some routine data processing

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">Source of today&#39;s mild heart-attack: I have categories W, X_Y, and Z in some data. Intending to keep only the second two:<br><br>data %&gt;% filter(g %in% c(&quot;X Y&quot;, &quot;Z&quot;)<br><br>Did you spot that I used a space instead of an underscore? I sure as heck didn&#39;t, and filtered excessively to just Z.&mdash; Jonathan Carroll (@carroll_jono) <a href="https://twitter.com/carroll_jono/status/971093803099541504?ref_src=twsrc%5Etfw">March 6, 2018</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

For those of you not so comfortable with pipes and <code>dplyr</code>, I was trying to subset a <code>data.frame</code> '<code>data</code>' (with a column <code>g</code> having values <code>"W"</code>, <code>"X_Y"</code> and <code>"Z"</code>) to only those rows for which the column <code>g</code> had the value <code>"X_Y"</code> or <code>"Z"</code> (not the actual values, of course, but that's the idea). Without <code>dplyr</code> this might simply be

[code language="r" light="true"]data[data$g %in% c(&quot;X Y&quot;, &quot;Z&quot;), ][/code]

To make that more concrete, let's actually show it in action

[code language="r" light="true"]
data &lt;- data.frame(a = 1:5, g = c(&quot;X_Y&quot;, &quot;W&quot;, &quot;Z&quot;, &quot;Z&quot;, &quot;W&quot;))
data
#&gt;   a   g
#&gt; 1 1 X_Y
#&gt; 2 2   W
#&gt; 3 3   Z
#&gt; 4 4   Z
#&gt; 5 5   W

data %&gt;% 
   filter(g %in% c(&quot;X Y&quot;, &quot;Z&quot;))
#&gt;   a g
#&gt; 1 3 Z
#&gt; 2 4 Z
[/code]

<code>filter</code> isn't at fault here -- the same issue would arise with <code>[</code> -- I have mis-specified the values I wish to match, so I am returned only the matching values. <code>%in%</code> is also performing its job - it returns a logical vector; the result of comparing the values in the column <code>g</code> to the vector <code>c("X Y", "Z")</code>. Both of these functions are behaving as they should, but the logic of what I was trying to achieve (subset to only these values) was lost.

Now, in some instances, that is exactly the behaviour you want -- subset this vector to <em>any</em> of these values... where those values may not be present in the vector to begin with

[code language="r" light="true"]
data %&gt;% 
   filter(values %in% all_known_values)
[/code]

The problem, for me, is that there isn't a way to say "all of these should be there". The lack of matching happens silently. If you make a typo, you don't get that level, and you aren't told that it's been skipped

[code language="r" light="true"]
simpsons_characters %&gt;% 
   filter(first_name %in% c(&quot;Homer&quot;, &quot;Marge&quot;, &quot;Bert&quot;, &quot;Lisa&quot;, &quot;Maggie&quot;)
[/code]

Technically this is a double-post because I also want to sidenote this with something I am amazed I have not known about yet (I was approximately today years old when I learned about this)... I've used <code>regex</code>matching for a while, and have been surprised at <a href="https://twitter.com/carroll_jono/status/908186714350403584">how well I've been able to make it work</a> occasionally. I'm familiar with counting patterns (<code>(A){2}</code>&nbsp;to match two occurrences of <code>A</code>) and ranges of counts (<code>(A){2,4}</code>&nbsp;to match between two and four occurrences of <code>A</code>) but I was not aware that you can specify a number of <em><strong>mistakes</strong></em> that can be included to still make a match...&nbsp;

[code language="r" light="true"]
grep(&quot;Bart&quot;, c(&quot;Bart&quot;, &quot;Bort&quot;, &quot;Brat&quot;), value = TRUE)
#&gt; [1] &quot;Bart&quot;

grep(&quot;(Bart){~1}&quot;, c(&quot;Bart&quot;, &quot;Bort&quot;, &quot;Brat&quot;), value = TRUE)
#&gt; [1] &quot;Bart&quot; &quot;Bort&quot;
[/code]

("Are you matching to me?"... "No, my regex <em>also</em> matches to 'Bort'")

Use <code>(pattern){~n}</code>to allow up to <code>n</code>substitutions in the pattern matching. Refer <a href="https://twitter.com/klmr/status/1098238987968438273?s=20">here</a> and <a href="https://laurikari.net/tre/documentation/regex-syntax/">here</a>.

Back to the original problem -- <code>filter</code>and <code>%in%</code>are doing their jobs, but we aren't getting the result we want because we made a typo, and we aren't told that we've done so.

Enter a <a href="https://github.com/tidyverse/forcats/pull/127">new PR</a> to <code>forcats</code>(originally to <code>dplyr</code>, but <code>forcats</code>does make more sense) which implements <code>fct_match(f, lvls)</code>. This checks that all of the values in <code>lvls</code>are actually present in <code>f</code>before returning the logical vector of which entries they correspond to. With this, the pattern becomes (after loading the development version of <code>forcats</code>from <a href="https://github.com/tidyverse/forcats">github</a>)

[code light="true" language="r"]
data %&gt;% 
   filter(fct_match(g, c(&quot;X Y&quot;, &quot;Z&quot;)))
#&gt; Error in filter_impl(.data, quo): Evaluation error: Levels not present in factor: &quot;X Y&quot;.
[/code]

Yay! We're notified that we've made an error. <code>"X Y"</code>isn't actually in our column <code>g</code>. If we don't make the error, we get the result we actually wanted in the first place. We can now use this successfully

[code language="r" light="true"]
data %&gt;% 
   filter(fct_match(g, c(&quot;X_Y&quot;, &quot;Z&quot;)))
#&gt;   a   g
#&gt; 1 1 X_Y
#&gt; 2 3   Z
#&gt; 3 4   Z
[/code]

It took a while for the PR to be addressed (the tidyverse crew have plenty of backlog, no doubt) but after some minor requested changes and a very neat cleanup by Hadley himself, it's been merged.

My original version had a few bells and whistles that the current implementation has put aside. The first was inverting the matching with&nbsp;<code>fct_exclude</code>to make it easier to negate the matching without having to create a new anonymous function, i.e. <code>~!fct_match(.x)</code>. I find this particularly useful since a pipe expects a call/named function, not a lambda/anonymous function, which is actually quite painful to construct

[code language="r" light="true"]
data %&gt;%
   pull(g) %&gt;%
   (function(x) !fct_match(x, c(&quot;X_Y&quot;, &quot;Z&quot;)))
#&gt; [1] FALSE  TRUE FALSE FALSE  TRUE
[/code]

whereas if we defined

[code language="r" light="true"]
fct_exclude &lt;- function(f, lvls, ...) !fct_match(f, lvls, ...)
[/code]

we can use

[code language="r" light="true"]
data %&gt;%
   pull(g) %&gt;%
   fct_exclude(c(&quot;X_Y&quot;, &quot;Z&quot;))
#&gt; [1] FALSE  TRUE FALSE FALSE  TRUE
[/code]

The other was specifying whether or not to include missing levels when considering if <code>lvls</code> is a valid value in <code>f</code> since <code>unique(f)</code> and <code>levels(f)</code> can return different answers.

The cleanup really made me think about how much 'fluff' some of my code can have. Sure, it's nice to encapsulate some logic in a small additional function, but sometimes you can actually replace all of that with a one-liner and not need all that. If you're ever in the mood to see how compact internal code can really be, check out the source of <code>forcats</code>.

Hopefully this pattern of <code>filter(fct_match(f, lvls))</code> is useful to others. It's certainly going to save me overlooking some typos.
