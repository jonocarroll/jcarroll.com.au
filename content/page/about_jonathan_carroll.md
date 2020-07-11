---
comments: false
subtitle: Bio
title: Dr Jonathan Carroll, PhD
---

<link rel="stylesheet" href="/css/R.css"/>

<table class="help" width="100%" summary="page for jonocarroll {jonocarroll}"><tr><td>jonocarroll {jonocarroll}</td><td style="text-align: right;">R Documentation</td></tr></table>

<h1 class="help">Jonathan Carroll</h2>

<h3 class="help">Description</h3>

<p class="help"><code class="help">jonocarroll()</code> is a theoretical physicist turned R developer. He builds
nonsense packages to help him learn new skills and tools.
</p>


<h3 class="help">Usage</h3>

<pre class="help">
jonocarroll(.data = universe(), process = "R", output = "knowledge", ...)

## S3 method for class 'tabular.data'
jonocarroll(
   .data,
   process = c("R", "Julia"),
   output = "knowledge",
   ...
)

## S3 method for class 'coffee'
jonocarroll(
   .data = "espresso",
   process = "snobby",
   output = "code",
   ...
)
</pre>


<h3 class="help">Arguments (common)</h3>

<table class="help" summary="R argblock">
<tr valign="top"><td><code class="help">.data</code></td><td>&nbsp;&nbsp;&nbsp;</td>
<td>
<p class="help">We are yet to identify a data type which is not suitable. See <a href="https://jcarroll.com.au">https://jcarroll.com.au</a> for
more details.</p>
</td></tr>
<tr valign="top"><td><code class="help">process</code></td><td></td>
<td>
<p class="help">Typically works with <code class="help">R</code> but is currently being extended to <code class="help">Julia</code>.</p>
</td></tr>

<tr valign="top"><td><code class="help">...</code></td><td></td>
<td>
<p class="help">He is always open to new opportunities, so this argument is able to interact with most arguments (trolling excepted).
</p>
</td></tr>
<tr valign="top"><td><code class="help">output</code></td><td></td>
<td>
<p class="help">Regardless of the often tricial appearance of the processing, the output is almost always new knowledge, or at least is intended to be.</p>
</td></tr>
</table>

<h3 class="help">Location</h3>

<p class="help"><code class="help">jonocarroll()</code> lives in <a href="https://goo.gl/maps/QrmU9bo9G7N46wXt8">Adelaide, South Australia</a> with his partner function. Together they have spawned two child processes.</p>

<h3 class="help">See Also</h3>

<p class="help">Other ways to connect with <code>jonocarroll()</code>:
<code class="help"><a href="https://jcarroll.com.au">blog</a>()</code>,
<code class="help"><a href="https://twitter.com/carroll_jono">twitter</a>()</code>,
<code class="help"><a href="https://github.com/jonocarroll">github</a>()</code>
</p>


<h3 class="help">Examples</h3>

<pre class="help">
library(ggplot2)
library(ggeasy)

# rotate x axis labels
ggplot(mtcars, aes(hp, mpg)) +
    geom_point() +
    easy_rotate_x_labels()
</pre>

<hr /><div style="text-align: center;">[Package <em>jonocarroll</em> version 0.9.99.9999 <a href="https://github.com/jonocarroll">Index</a>]</div>

## GitHub Contributions

<!-- Prepare a container for your calendar. -->
<!-- Credit to IonicaBizau/github-calendar for the original -->
<script
  src="https://cdn.rawgit.com/jonocarroll/github-calendar/gh-pages/dist/github-calendar.min.js"
>
</script>

<!-- Optionally, include the theme (if you don't want to struggle to write the CSS) -->
<link
  rel="stylesheet"
  href="https://cdn.rawgit.com/jonocarroll/github-calendar/gh-pages/dist/github-calendar.css"
/>

<!-- Prepare a container for your calendar. -->
<div class="calendar">
    <!-- Loading stuff -->
    Loading the data just for you.
</div>

<script>
    new GitHubCalendar(".calendar", "jonocarroll", { responsive: true });
</script>
