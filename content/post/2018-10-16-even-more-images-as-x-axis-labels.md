---
title: Even more images as x-axis labels
author: Jonathan Carroll
date: 2018-10-16 23:18:32
slug: testingyaml
categories: [R]
tags: [rstats]
type: ''
subtitle: ''
image: ''
---
This is the last update to this strange saga... I hope.

[caption align="center" width="680"]<img src="https://jcarroll.com.au/wp-content/uploads/2018/10/labels.jpg" />Image labels... Photo: http://www.premierpaper.com/shop/custom-labels/[/caption]

<!--more-->

Easily two of the most popular posts on my blog are <a href="https://jcarroll.com.au/2016/06/02/images-as-x-axis-labels/">this one</a> and <a href="https://jcarroll.com.au/2016/06/03/images-as-x-axis-labels-updated/">this one</a> describing a couple of ways in which I managed to hack together using an image as a category label in a ggplot. 

There are likely many people who believe one should <em>never</em> do such a thing, but given the popularity, it seems a lot of people aren't listening to that. Good on you.

<div style="width:100%;height:0;padding-bottom:54%;position:relative;"><iframe src="https://giphy.com/embed/bqalUGFYfyHzW" width="100%" height="100%" style="position:absolute" frameBorder="0" class="giphy-embed" allowFullScreen></iframe></div><p><a href="https://giphy.com/gifs/good-hang-breastfeeding-bqalUGFYfyHzW">via GIPHY</a></p>

One of these posts was recently shared again by the amazing <a href="https://twitter.com/dataandme">#rstats amplifier Mara Averick</a> (if you're not following her on Twitter, you're missing out) and <a href="https://twitter.com/baptiste_auguie">@baptiste_auguie</a> (the saviour of the previous implementation) mentioned that he had written a 'hack' to get chemical symbols as a categorical axis label using <code>tikzDevice</code>. That package leverages [latex]\LaTeX[/latex] (of which I am <i>very</i> familiar, having written my PhD thesis entirely in [latex]\LaTeX[/latex] many moons ago) to treat all of the text in an image as potential [latex]\LaTeX[/latex] commands and produce a working source code which generates the required plot.

The <a href="https://groups.google.com/forum/#!topic/ggplot2/OPhpWtVcwtY">example code</a> is straightforward enough

[code language="r" light="true"]
options(tikzLatexPackages = 
c(getOption('tikzLatexPackages'),&quot;\\usepackage{acide-amine}\n&quot;)) 

d = data.frame(x=1:10, y=1:10, f=factor(sample(letters[1:2], 10, repl=TRUE))) 

p &lt;- qplot(x,y,data=d) + theme_bw() + 
  opts(plot.margin = unit(c(1, 1, 5, 1), &quot;lines&quot;), 
       axis.text.x = theme_text(size = 12 * 
        0.8, lineheight = 0.9, vjust = 10)) + 
  scale_x_continuous(breaks = c(2, 8), labels=c(&quot;\\phe{15}&quot;, &quot;\\leu{15}&quot;)) 

tikz(&quot;annotation.tex&quot;,standAlone=T,width=4,height=4) 
print(p) 
dev.off() 
[/code]

and produces this

[caption align="center" width="680"]<img src="https://jcarroll.com.au/wp-content/uploads/2018/10/annotation.png" />annotation.png[/caption]

This got me curious, though -- if it can process <i>arbitrary</i> [latex]\LaTeX[/latex], could it process a <code>\\includegraphics</code> call?

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">Efficient! If it&#39;s arbitrary LaTeX, could the labels just be \includegraphics calls?</p>&mdash; Jonathan Carroll (@carroll_jono) <a href="https://twitter.com/carroll_jono/status/1050535371241476096?ref_src=twsrc%5Etfw">October 11, 2018</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

Yes, as it turns out. 

<div style="width:100%;height:0;padding-bottom:75%;position:relative;"><iframe src="https://giphy.com/embed/XreQmk7ETCak0" width="100%" height="100%" style="position:absolute" frameBorder="0" class="giphy-embed" allowFullScreen></iframe></div><p><a href="https://giphy.com/gifs/retro-thumbs-up-XreQmk7ETCak0">via GIPHY</a></p>

A quick test showed that it was indeed possible, which only leaves re-implementing the previous posts' images using this method.

<a href="https://gist.github.com/jonocarroll/08a1ccff36be628430d768e5b9426e54">I've done so</a>, and the code isn't particularly shorter than the other method.

[gist id="08a1ccff36be628430d768e5b9426e54"]

Producing nearly the same end result.

[caption  align="center" width="680"]<img src="https://jcarroll.com.au/wp-content/uploads/2018/10/xaxis.png" />tikzDevice result[/caption]

There are a few differences compared to the previous version(s):

 - I had a request for rotating the additional text, which I actually <a href="https://gist.github.com/jonocarroll/2f9490f1f5e7c82ef8b791a4b91fc9ca#file-images_as_xaxis_labels_updated-r">also updated recently</a>, and it seemed to fit better, so I rotated the labels within the [latex]\LaTeX[/latex] command.
 - Since all of the text has been rendered via [latex]\LaTeX[/latex], the fonts are a bit different.
 - The rankings have since changed, so I've added an 11th to keep Australia in the list.

The [latex]\LaTeX[/latex] component of this also meant that a few changes were necessary in the other labels, such as the dollar sign in the y-axis label, and the underscores throughout (these are considered special characters in [latex]\LaTeX[/latex]). Lastly, the result of running the <code>tikz</code> command is that a <code>.tex</code> ([latex]\LaTeX[/latex] source code) file is produced. This isn't quite the plot image file we want. It <i>does</i> however have the commands to generate one. The last steps in the above gist are to process this <code>.tex</code> file with [latex]\LaTeX[/latex]. Here I used the <code>tools::texi2dvi</code> function, but one <i>could</i> also use a <code>system</code> command to their [latex]\LaTeX[/latex] installation.

That still only produced a PDF. The last step was to use the <code>magick</code> package to convert this into an image.

Overall, this is a nice proof of concept, but I don't think it's a particularly tidy way of achieving the goal of image axis labels. It does however lay the groundwork for anyone else who decides this might be a useful route to take. Plus I learned a bit more about how <code>tikzDevice</code> works and got to revisit my [latex]\LaTeX[/latex] knowledge.