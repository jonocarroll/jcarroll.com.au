---
title: "#auunconf slack users' timezone locations"
author: Jonathan Carroll
date: 2016-04-14 23:04:15
slug: testingyaml
categories: []
tags: [rstats]
type: ''
subtitle: ''
image: ''
---
I had never used <a href="https://slack.com/" target="_blank">slack</a> before, but had read a heap of <a href="http://www.gizmodo.com.au/2016/04/10-tips-to-make-you-a-slack-wizard/" target="_blank">tech articles</a> extolling its virtues. <a href="http://www.gizmodo.com.au/2015/10/malcolm-turnbull-wants-cabinet-ministers-to-use-slack/" target="_blank">Apparently this is what our current Prime Minister advocates within Cabinet</a>. The upcoming #auunconf organising team set up a channel and invited the participants, so I checked it out. Slack is pretty awesome as far as a unified workspace/messaging protocol can go. What makes it even more awesome, is that someone (@hrbrmstr, no surprise) has made an <a href="https://github.com/hrbrmstr/slackr" target="_blank">R package that talks to it</a>.

<!--more-->

After installing/loading the <code>slackr</code> package, <a href="https://api.slack.com/" target="_blank">obtaining an API key</a> (the usual drill; create an app, request key, save it somewhere and pray you don't lose it or share it) and saving it in <code>~/.slackr</code> (so I don't have to remember to delete it from shared code) it was as simple as calling <code>slackr_users()</code> to get a <code>data.frame</code> of the users and their relevant data. Neat!

The only geographical information in there was the timezone, so I figured I would merge that with <a href="http://efele.net/maps/tz/world/" target="_blank">a shapefile of such</a> and plot it. Here's the code I ended up creating

<script src="https://gist.github.com/jonocarroll/1ce3ba63171eca2de22731c2503a1f48.js"></script>

Once I had plotted the map I wished the projection was more Pacific-centered, and looked into making that happen. It appears to be trickier than I wanted to bother with for such a small project, so I ended up abandoning it. I did find a <a href="http://stackoverflow.com/questions/32591368/pacific-centric-robinson-projection-with-ggplot-in-r" target="_blank">stackoverflow answer that seemed to have all the right ingredients</a> (again, @hrbrmstr at work) but I couldn't get it to plot in any sort of reasonable time. 

[caption id="attachment_748" align="aligncenter" width="2396"]<a href="http://jcarroll.com.au/wp-content/uploads/2016/04/auunconf_slackr_users_map.png" rel="attachment wp-att-748"><img src="http://jcarroll.com.au/wp-content/uploads/2016/04/auunconf_slackr_users_map.png" alt="#auunconf slack users&#039; timezones" width="2396" height="1472" class="size-full wp-image-748" /></a> #auunconf slack users' timezones[/caption]

The unique users so far claim to come from:

<ul>
<li>Australia/Brisbane</li>
<li>Australia/Canberra</li>
<li>Asia/Ulaanbaatar</li>
<li>America/Indiana/Indianapolis</li>
<li>Australia/Adelaide</li>
<li>Europe/Amsterdam</li>
<li>Pacific/Auckland</li>
</ul>

so quite the diverse crowd.

Once all was done and plotted, uploading the image to the slack team was as easy as <code>dev_slackr("#general")</code> which sends the current graphic to the #general channel of the slack team that <code>slackr</code> was configured for. Sure enough, it worked! 

[caption id="attachment_749" align="aligncenter" width="427"]<a href="http://jcarroll.com.au/wp-content/uploads/2016/04/Screenshot-from-2016-04-14-224623.png" rel="attachment wp-att-749"><img src="http://jcarroll.com.au/wp-content/uploads/2016/04/Screenshot-from-2016-04-14-224623.png" alt="It works!" width="427" height="466" class="size-full wp-image-749" /></a> It works![/caption]

I'm not entirely sure what I'll use this for, but it was certainly a fun exercise to get working. Perhaps I can generalise it enough to submit a pull-request to make it available in slackr?