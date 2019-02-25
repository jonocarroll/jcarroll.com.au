---
title: Adding strings in R
author: Jonathan Carroll
date: 2018-10-06 00:09:15
slug: adding-strings-in-r
categories: [R]
tags: [rstats]
type: ''
subtitle: ''
image: ''
---
This started out as a <i>"hey, I wonder..."</i> sort of thing, but as usual, they tend to end up as interesting voyages into the deepest depths of code, so I thought I'd write it up and share. Shoutout to <a href="https://twitter.com/coolbutuseless">@coolbutuseless</a> for proving that a little curiosity can go a long way and inspiring me to keep digging into interesting topics.

[caption align="center" width="680"]<img src="https://jcarroll.com.au/wp-content/uploads/2018/10/stringeastereggs.jpg" width="680" height="451" alt="This is what you get if you &quot;glue&quot; &quot;strings&quot;. Photo: https://craftwhack.com/cool-craft-string-easter-eggs/" /> This is what you get if you &quot;glue&quot; &quot;strings&quot;. Photo: https://craftwhack.com/cool-craft-string-easter-eggs/[/caption]

<!--more-->

<a href="http://www.happylittlescripts.com/2018/09/make-your-r-code-nicer-with-roperators.html">This post</a> came across my feed last week, referring to the <a href="https://cran.r-project.org/package=roperators">roperators package on CRAN</a>. In that post, the author introduces an infix operator from that package which 'adds' (concatenates/pastes) strings

[code language="r" light="true"]
&quot;using infix (%) operators&quot; %+% &quot;R can do simple string addition&quot;
#&gt; [1] &quot;using infix (%) operators R can do simple string addition&quot;
[/code]

This might be familiar if you use python

[code language="python" light="true"]
&gt;&gt;&gt; &quot;python &quot; + &quot;adds &quot; + &quot;strings&quot;
'python adds strings'
[/code] 

or javascript

[code language="javascript" light="true"]
&quot;javascript &quot; + &quot;also adds &quot; + &quot;strings&quot;
&quot;javascript also adds strings&quot;
[/code] 

or perhaps even go

[code light="true"]
package main

import &quot;fmt&quot;

func main() {
  fmt.Println(&quot;go &quot; + &quot;even adds &quot; + &quot;strings&quot;)
}
&gt; &quot;go even adds strings&quot;
[/code]

but this is not something natively available in R

[code language="r" light="true"]
&quot;this doesn't&quot; + &quot;work&quot;
#&gt; Error in &quot;this doesn't&quot; + &quot;work&quot; : 
#&gt;  non-numeric argument to binary operator
[/code]

<img src="https://jcarroll.com.au/wp-content/uploads/2018/10/nazi-240x300.jpg" width="240" height="300" />

Could we make it work, though? That got me wondering. My first guess was to just create a new <code>+</code> function which <i>does</i> allow for this. The normal addition operator is

[code language="r" light="true"]
`+`
#&gt; function (e1, e2)  .Primitive(&quot;+&quot;)
[/code]

so a first attempt might be

[code language="r" light="true"]
`+` &lt;- function(e1, e2) {
  if (is.character(e1) | is.character(e2)) {
    paste0(e1, e2)
  } else {
    base::`+`(e1, e2)
  }
}
[/code]

This checks to see if the left or right side of the operator is a character-classed object, and if either is, it pastes the two together. Otherwise it just uses the 'regular' addition operator between the two arguments. This works for simple cases, e.g.

[code language="r" light="true"]
&quot;a&quot; + &quot;b&quot;
#&gt; [1] &quot;ab&quot;

&quot;a&quot; + 2
#&gt; [1] &quot;a2&quot;

2 + 2
#&gt; [1] 4

2 + &quot;a&quot;
#&gt; [1] &quot;2a&quot;
[/code]

But we hit an important snag if we try to add to character-represented numbers

[code language="r" light="true"]
&quot;200&quot; + &quot;200&quot;
#&gt; [1] &quot;200200&quot;
[/code]

That's probably going to be an issue if we read in unformatted data (e.g. from a CSV) as characters and try to treat it like numbers. Normally this would throw the above error about not being numeric, but now we get a silent weird number-character. That's no good.

An extension to this checks whether or not we have the number-as-a-character situation and falls back to the correct interpretation in that case

[code language="r" light="true"]
`+` &lt;- function(e1, e2) {
  ## unary
  if (missing(e2)) return(e1)
  if (!is.na(suppressWarnings(as.numeric(e1))) &amp; !is.na(suppressWarnings(as.numeric(e2)))) {
    ## both arguments numeric-like but characters
    return(base::`+`(as.numeric(e1), as.numeric(e2)))
  } else if ((is.character(e1) &amp; is.na(suppressWarnings(as.numeric(e1)))) | 
             (is.character(e2) &amp; is.na(suppressWarnings(as.numeric(e2))))) {
    ## at least one true character 
    return(paste0(e1, e2))
  } else {
    ## both numeric
    return(base::`+`(e1, e2))
  }
}

&quot;a&quot; + &quot;b&quot;
#&gt; [1] &quot;ab&quot;

&quot;a&quot; + 2
#&gt; [1] &quot;a2&quot;

2 + 2
#&gt; [1] 4

2 + &quot;a&quot;
#&gt; [1] &quot;2a&quot;

&quot;2&quot; + &quot;2&quot;
#&gt; [1] 4

2 + &quot;edgy&quot; + 4 + &quot;me&quot;
#&gt; [1] &quot;2edgy4me&quot;
[/code]

So, that's one option for string addition in R. Is it the right one? The idea of actually dispatching on a character class is inviting. Can we just add a <code>+.character</code> method (since there doesn't seem to already be one)? Normally when we have S3 dispatch we need a generic function, which calls <code>UseMethod("class")</code>, but we don't have that in this case. <code>+</code> is an internal generic, which is probably the first sign that we're going to have trouble. If we try to define the method

[code language="r" light="true"]
`+.character` &lt;- function(e1, e2) {
  paste0(e1, e2)
}
&quot;a&quot; + &quot;b&quot;
#&gt; Error in &quot;a&quot; + &quot;b&quot; : non-numeric argument to binary operator
[/code]

It seems to fail. What went wrong? Is dispatch not working? 

<iframe src="https://giphy.com/embed/dbtDDSvWErdf2" width="480" height="261" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/richard-ayoade-it-crowd-maurice-moss-dbtDDSvWErdf2">via GIPHY</a></p>

We want to dispatch on "character" -- is that what we have?

[code language="r" light="true"]
class(&quot;a&quot;)
#&gt; [1] &quot;character&quot;
[/code]

What if we explicitly create an object with that class?

[code language="r" light="true"]
structure(&quot;a&quot;, class = &quot;character&quot;) + 2
#&gt; [1] &quot;a2
2 + structure(&quot;a&quot;, class = &quot;character&quot;)
#&gt; [1] &quot;2a&quot;
[/code]

What if we try to dispatch on some new class?

[code language="r" light="true"]
`+.foo` &lt;- function(e1, e2) {
  paste0(e1, e2)
}
structure(&quot;a&quot;, class = &quot;foo&quot;) + 2
#&gt; [1] &quot;a2
[/code]

but no dice for just a regular atomic character object. Time to revisit the help pages.

In R, addition is limited to particular classes of objects, defined by the Ops group (there are also Math, Summary, and Complex groups). The methods for the Ops group members describe which classes can be involved in operations involving any of the Ops group members:
<code> 
"+", "-", "*", "/", "^", "%%", "%/%"
"&", "|", "!"
"==", "!=", "<", "<=", ">=", ">"
</code> 

These methods are:

[code language="r" light="true"]
methods(&quot;Ops&quot;)
 [1] Ops,array,array-method              
 [2] Ops,array,structure-method          
 [3] Ops,nonStructure,nonStructure-method
 [4] Ops,nonStructure,vector-method      
 [5] Ops,structure,array-method          
 [6] Ops,structure,structure-method      
 [7] Ops,structure,vector-method         
 [8] Ops,vector,nonStructure-method      
 [9] Ops,vector,structure-method         
[10] Ops.data.frame                      
[11] Ops.data.table*                     
[12] Ops.Date                            
[13] Ops.difftime                        
[14] Ops.factor                          
[15] Ops.numeric_version                 
[16] Ops.ordered                         
[17] Ops.POSIXt                          
[18] Ops.raster*                         
[19] Ops.roman*                          
[20] Ops.ts*                             
[21] Ops.unit*             
[/code]

What's missing from this list, in order for us to be able to just use "string" + "string" is a character method. What's perhaps even more surprising is that there <i>is</i> a <code>roman</code> method! Whaaaat?

[code language="r" light="true"]
as.roman(&quot;1&quot;) + as.roman(&quot;5&quot;)
#&gt; [1] VI
as.roman(&quot;2000&quot;) + as.roman(&quot;18&quot;)
#&gt; [1] MMXVIII
[/code]

<img src='https://jcarroll.com.au/wp-content/uploads/2018/10/groove_small.gif' width="500" />

Since the operations need to be defined for all the members of the Ops group, we would also need to define what to do with, say, <code>*</code> between strings. When one side is a string and the other is a number, a reasonable approach might be that which was taken in the original post (using a new infix <code>%s*%</code>)

[code language="r" light="true"]
&quot;a&quot; %s*% 3
#&gt; [1] &quot;aaa&quot; 
[/code]

There is, of course, a function to do this already

[code language="r" light="true"]
strrep(&quot;a&quot;, 3)
#&gt; [1] &quot;aaa&quot; 
[/code]

but I could see creating <code>"a" * 3</code> as a shortcut to this. I don't know what one would expect <code>"a" * "b"</code> to produce.

The problem with where this is heading is that we aren't allowed to create the method for an atomic class, as <a href="https://twitter.com/JorisMeys">Joris Meys</a> and <a href="https://twitter.com/BrodieGaslam">Brodie Gaslam</a> point out on Twitter

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">Yes, you&#39;re right.  Below is what I remembered, which suggested that if it were not sealed, it could be defined, but that isn&#39;t true b/c `do_arith` only dispatches on objects (as you point out), although in theory it could dispatch on atomics, but probably doesn&#39;t for speed. <a href="https://t.co/UXk6Tdm3lW">pic.twitter.com/UXk6Tdm3lW</a></p>&mdash; BrodieG (@BrodieGaslam) <a href="https://twitter.com/BrodieGaslam/status/1047838113052155904?ref_src=twsrc%5Etfw">October 4, 2018</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

[code language="r" light="true"]
setMethod(&quot;+&quot;, c(&quot;character&quot;, &quot;character&quot;), function(e1, e2) paste0(e1, e2))
#&gt; Error in setMethod(&quot;+&quot;, c(&quot;character&quot;, &quot;character&quot;), function(e1, e2) paste0(e1,  : 
#&gt;   the method for function ‘+’ and signature e1=&quot;character&quot;, e2=&quot;character&quot; is sealed and cannot be re-defined
[/code]

so no luck there. Brodie also links to <a href="https://stackoverflow.com/questions/1319698/why-doesnt-operate-on-characters-in-r/1321491#1321491">a Stack Overflow discussion</a> on this very topic where it is pointed out by <a href="https://twitter.com/MMaechler">Martin Mächler</a> that this has been discussed on <a href="https://stat.ethz.ch/pipermail/r-devel/2006-August/038991.html">r-devel</a> -- that makes for some interesting historical weigh-ins on why this isn't a thing in R. Incidentally, the small-world effect comes into play regarding that Stack Overflow post as one of the three answers happens to be a former work colleague of mine.

So, in the end, it seems the best we can do is the rather long-winded overwrite of <code>+</code> which checks if the arguments really are characters. I don't mind this, and would probably use it if it was in base R or a package. The biggest issue that people seem to have with this is that it 'looks like' addition, but it's not commutative. If that word is new to you, it just means that <code>x + y</code> should give the same answer as <code>y + x</code>. For numbers, the regular </code>+</code> satisfies this:

[code language="r" light="true"]
2 + 3
#&gt; [1] 5
3 + 2
#&gt; [1] 5
[/code]

but when we try to do this with strings... not so much

[code language="r" light="true"]
&quot;a&quot; + &quot;b&quot;
#&gt; [1] &quot;ab&quot;
&quot;b&quot; + &quot;a&quot;
#&gt; [1] &quot;ba&quot;
[/code]

This doesn't particularly bother me, because I'm okay with this not actually being 'mathematical addition'. The fun turn this then took was the suggestion from <a href="https://twitter.com/JorisMeys">Joris Meys</a> that <a href="https://docs.julialang.org/en/stable/manual/mathematical-operations/#Operator-Precedence-and-Associativity-1">Julia's non-associative operators</a> is a strength of the language. There, the way that <a href="https://docs.julialang.org/en/stable/manual/mathematical-operations/#footnote-2">you group values matters</a>

<blockquote>a + b + c is parsed as +(a, b, c) not +(+(a, b), c).</blockquote>

<img src="https://jcarroll.com.au/wp-content/uploads/2018/10/wack.gif" width="250", height="188" />

I'll eventually get around to learning more Julia, but this is already hurting my brain.

That distinction may be of interest, however, to <a href="https://twitter.com/MilesMcBain/">Miles McBain</a>, whose concern was more about repeated applications of <code>+</code> being a bottleneck

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">I hate + for string concatenation. &quot;a&quot; + &quot;b&quot; + &quot;c&quot; is paste(&quot;a&quot;, paste(&quot;b&quot;,&quot;c&quot;)). So you end up copying the data in &quot;b&quot; and &quot;c&quot; twice due to the data being immutable. That can really add up fast with more +&#39;s if you are careless. Like I was in my first programming job.</p>&mdash; Miles McBain (@MilesMcBain) <a href="https://twitter.com/MilesMcBain/status/1047743465562431489?ref_src=twsrc%5Etfw">October 4, 2018</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

In that case, parsing as <code>+("a", "b", "c")</code> is exactly what would be desired.

So, what's the conclusion of all of this? I've learned (and re-learned) a heap more about how the Ops group works, I've played a lot with dispatch, and I've thought deeply about edge-cases for adding strings. I've also been exposed to a bit more Julia. All in all, a worthwhile dive into something potentially silly, but a lot of fun. If you have some thoughts on the matter, leave a comment here or reply on Twitter -- I'd love to hear about another angle to this story.
