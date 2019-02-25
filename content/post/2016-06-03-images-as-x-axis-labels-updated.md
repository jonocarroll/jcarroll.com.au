---
title: Images as x-axis labels (updated)
author: Jonathan Carroll
date: 2016-06-03 08:18:26
slug: testingyaml
categories: [R]
tags: [rstats]
type: ''
subtitle: ''
image: ''
---
They say "<i>if you want to find an answer on the internet, just present a wrong one as fact. Then wait.</i>"

<!--more-->

It didn't take long, actually. Despite my searches while trying to get <a href="http://jcarroll.com.au/2016/06/02/images-as-x-axis-labels/" target="_blank">images into x-axis labels</a> it seems I overlooked a working, <a href="http://stackoverflow.com/questions/14070953/photo-alignment-with-graph-in-r/14078391" target="_blank">significantly less hacky implementation</a>. My Google-fu had in fact let me down.

Baptiste Auguié (<a href="https://twitter.com/tpab" target="_blank">@tpab</a> / <a href="https://github.com/baptiste" target="_blank">@baptiste</a>) had this working a while ago (seemingly before the <code>ggplot2</code> update that broke other methods), and in a definitively less hacky way. I've added a <a href="https://gist.github.com/jonocarroll/2f9490f1f5e7c82ef8b791a4b91fc9ca" target="_blank">new gist</a> (if you're reading this on R-bloggers, the gist isn't embedded, so either follow the link or view on my site) which implements it on the same graph as earlier, and I like this significantly more.

[gist id="2f9490f1f5e7c82ef8b791a4b91fc9ca"]

This method gets around the <code>element_text()</code> validation and updates the grobs in a way that's above my pay grade/understanding of <code>ggplot2</code> internals, and is a much more consistent way to go about it. This also:
<ul>
	<li> places the factor labels on the graph along with the picture, covering some concerns about people not knowing which maps are for which country,</li>
	<li> leaves room for the <code>caption</code> to go back in, which I wanted,</li>
	<li> automatically scales the grob better,</li>
	<li> doesn't involve creating an external <code>grob</code> and thus turning off clipping; using <code>axis.text.x</code> is exactly what I was hoping for.</li>
</ul>

[caption id="attachment_953" align="alignnone" width="680"]<a href="http://jcarroll.com.au/wp-content/uploads/2016/06/GDP_updated.png"><img src="http://jcarroll.com.au/wp-content/uploads/2016/06/GDP_updated-1024x640.png" alt="Updated version using @baptiste&#039;s method; much better." width="680" height="425" class="size-large wp-image-953" /></a> Updated version using @baptiste's method; much better.[/caption]

My version worked (sort of) but only because it used options that were bad practice (not doubting that for a moment). I'd like to see this method make it into <code>ggplot2</code> properly; Baptiste had an <a href="https://github.com/hadley/ggplot2/issues/1240" target="_blank">open GitHub issue</a> involving it a while ago but it has since been closed, presumably without the feature being incorporated.

I started the previous post by saying how awesome open-source software is (e.g. <code>R</code>). You know what else is awesome? The #rstats community. Thank you to every one of you.