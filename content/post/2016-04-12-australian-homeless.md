---
title: '52vis Week 2 Challenge -- Australian Version'
author: Jonathan Carroll
date: 2016-04-12 21:18:19
slug: testingyaml
categories: [R]
tags: [rstats]
type: ''
subtitle: ''
image: ''
---
I <a href="http://jcarroll.com.au/2016/04/10/52vis-week-2-challenge/">mapped out the USA homelessness rate</a> in my last post as a challenge and noted at the end that it would be interesting to do the same for Australia. That was the first comment I received in person, too. "Let's do it!" I said. What I found may shock you (click-bait title; check).

<!--more-->

Most of the code carried over. Of course, lacking <a href="https://github.com/hrbrmstr/albersusa">hrbrmstr's neat <code>albersusa</code></a> equivalent I had to obtain and process the shapefile myself. Thankfully, the <a href="http://www.abs.gov.au/ausstats/abs@.nsf/mf/1259.0.30.001?OpenDocument">ABS have me covered</a>. Here's the whole script;

<script src="https://gist.github.com/jonocarroll/3f5e6cb61d9fb6c6a8f6afa85b8c6cfb.js"></script>

For starters, I compared the Australian statistics on the same scale as the USA (median 1.63&permil;, capped at 3x that value) and was shocked

<a href="http://jcarroll.com.au/wp-content/uploads/2016/04/HomelessPopulation_AUSversion_USscale.gif" rel="attachment wp-att-698"><img src="http://jcarroll.com.au/wp-content/uploads/2016/04/HomelessPopulation_optim_AUSversion_USscale.gif" alt="HomelessPopulation_optim_AUSversion_USscale" width="1600" height="1200" class="aligncenter size-full wp-image-698" /></a>

Yep, it appears we're worse than the USA for homelessness. That sucks. What if we put it back on our own scale, how do our states do relatively? Well, for starters, the median goes up to 3.5&permil; (I've again capped at 3x that value) but a lot of that seems to be coming from NT. Looking at the data itself, our lowest value is indeed higher than the USA median, so we've nothing to be proud of. That said, some states are doing better than our own median. TAS looks to be nicely below, while SA seems to be sitting around the median.

<a href="http://jcarroll.com.au/wp-content/uploads/2016/04/HomelessPopulation_AUSversion_AUSscale.gif" rel="attachment wp-att-701"><img src="http://jcarroll.com.au/wp-content/uploads/2016/04/HomelessPopulation_optim_AUSversion_AUSscale.gif" alt="HomelessPopulation_optim_AUSversion_AUSscale" width="1600" height="1200" class="aligncenter size-full wp-image-701" /></a>

If we drill down to the data itself, we can see what the actual figures look like. I've had a go at <a href="https://rud.is/b/2016/04/07/geom_lollipop-by-the-chartettes/" target="_blank">hrbrmstr's <code>geom_lollipop</code></a> (from the <a href="https://github.com/hrbrmstr/ggalt" target="_blank">dev version of <code>ggalt</code></a>) and it works nicely, as expected. I've left NT off this first graph so that the others stand a fighting chance at the scale.

<a href="https://s3-ap-southeast-2.amazonaws.com/jcarroll1/2016-14/HomelessPopulation_AUSbyStateNONT.png"><img src="https://s3-ap-southeast-2.amazonaws.com/jcarroll1/2016-14/HomelessPopulation_AUSbyStateNONT_optim.png" width="4200" height="4200" class="aligncenter" /></a>

And here's what happens if you include the Northern Territory

<a href="https://s3-ap-southeast-2.amazonaws.com/jcarroll1/2016-14/HomelessPopulation_AUSbyState.png"><img src="https://s3-ap-southeast-2.amazonaws.com/jcarroll1/2016-14/HomelessPopulation_AUSbyState_optim.png" width="4200" height="4200" class="aligncenter" /></a>

Ouch. It looks odd, but it's correct. <a href="http://blog.id.com.au/2012/population/australian-population/australian-2011-census-based-population-estimates/" target="_blank">The number of  people in the NT in 2011 was around 231,331</a> but the <a href="http://abs.gov.au/AUSSTATS/abs@.nsf/DetailsPage/2049.02011?OpenDocument" target="_blank">census-estimated homeless population was 15,479</a>, which means that 6.7% of the population (<i>i.e.</i> 67&permil;) were homeless. What? Have I made a mistake? <a href="http://www.abc.net.au/news/2012-11-12/nt-homelessness-rate-highest-in-nation/4367228" target="_blank">No, it's just horrifyingly true</a>. 

Aw, man. I came here for data analysis, not feels. Clearly this is a national shame, and something needs to be done about it.