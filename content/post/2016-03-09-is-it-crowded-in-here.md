---
title: Is it crowded in here?
author: Jonathan Carroll
date: 2016-03-09 22:31:13
slug: testingyaml
categories: [R]
tags: [rstats]
type: ''
subtitle: ''
image: ''
---
<a href="http://i.imgur.com/5sYruU9.jpg">This was a neat graphic that someone made</a>. It shows the population at a given latitude or longitude as a bar chart, overlayed on a map of the world itself. It shows where people live; the bigger the bar, the more people living at that latitude/longitude.

<!--more-->

"<i>I can do that.</i>" I said. In R of course. So here it is;

<script src="https://gist.github.com/JonoCarroll/d7e23d8e4460acbcddd8.js"></script>

I love that such a small amount of code can produce something so interesting. Click the images below to view them in all their full-size glory.

<a href="http://jcarroll.com.au/wp-content/uploads/2016/03/popByLat.png" rel="attachment wp-att-639"><img src="http://jcarroll.com.au/wp-content/uploads/2016/03/popByLat-1024x801.png" alt="popByLat" width="680" height="532" class="aligncenter size-large wp-image-639" /></a>

<a href="http://jcarroll.com.au/wp-content/uploads/2016/03/popByLon.png" rel="attachment wp-att-640"><img src="http://jcarroll.com.au/wp-content/uploads/2016/03/popByLon-1024x801.png" alt="popByLon" width="680" height="532" class="aligncenter size-large wp-image-640" /></a>

How is this useful? Well... okay, it's not. It's pretty. That's what it is. An a neat exercise in data manipulation and plotting.

UPDATE: As per a comment on my reddit thread, I've updated this to include a logarithmic colour-scale for population. The populations follow a nice logit curve if you arrange them in order:

<a href="http://jcarroll.com.au/wp-content/uploads/2016/03/logPopulation.png" rel="attachment wp-att-652"><img src="http://jcarroll.com.au/wp-content/uploads/2016/03/logPopulation-300x235.png" alt="logPopulation" width="300" height="235" class="aligncenter size-medium wp-image-652" /></a>

Here's the updated graphics:

<a href="http://jcarroll.com.au/wp-content/uploads/2016/03/popByLat_popCol.png" rel="attachment wp-att-650"><img src="http://jcarroll.com.au/wp-content/uploads/2016/03/popByLat_popCol-1024x801.png" alt="popByLat_popCol" width="680" height="532" class="aligncenter size-large wp-image-650" /></a>

<a href="http://jcarroll.com.au/wp-content/uploads/2016/03/popByLon_popCol.png" rel="attachment wp-att-649"><img src="http://jcarroll.com.au/wp-content/uploads/2016/03/popByLon_popCol-1024x801.png" alt="popByLon_popCol" width="680" height="532" class="aligncenter size-large wp-image-649" /></a>