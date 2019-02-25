---
title: 'Data Munging With R Preview &#8212; Storing Values (Assigning)'
author: Jonathan Carroll
date: 2017-06-26 23:10:03
slug: testingyaml
categories: [R]
tags: [rstats]
type: ''
subtitle: ''
image: ''
---
<div class="asciidoc_entry_display"><div class="paragraph">
<p>Since about October last year, I’ve been writing an introduction to R book. It’s
been quite the experience. I’ve finally started making time to document some of
the interesting things I’ve learned (about R, about writing, about how to
bring those two together) along the way.</p>
</div>
<!--more-->
<div class="paragraph">
<p>The book is aimed at proper beginners; people with absolutely no formal coding
experience. This tends to mean people coming from Excel who need to do more than
a spreadsheet can/should.</p>
</div>

[tweet https://twitter.com/carroll_jono/status/780746085727735808]

</div>
<div class="paragraph">
<p>Most of the books I’ve looked at which claim to teach programming begin with
some strong assumptions about the reader already knowing how to program, and
teach the specific syntax of some language. That’s no good if this is your first
language, so I’m working towards teaching the concepts, the language, and the
syntax (warts and all).</p>
</div>
<div class="paragraph">
<p>The book is currently available under the Manning Early Access Program (MEAP)
which means if you buy it you get the draft of the first three chapters right
now. If you find something you still don’t understand, or you don’t like how
I’ve written some/all of it, then jump onto the forum and let me know. I make
more edits and write more chapters, and you get updated versions. Lather, rinse,
repeat until the final version and you get a polished book which (if I’m any
good) contains what you want it to.</p>
</div>
<div class="paragraph">
<p>I’m genuinely interested in getting this right; I want to help people learn R. I
contribute a bit of time on Stack Overflow answering people’s questions, and
it’s very common to see questions that shouldn’t need asking. I don’t blame the
user for not knowing something (a different answer for not searching, perhaps),
but I can help make the resource they need.</p>
</div>
<div class="paragraph">
<p>
<a href="https://www.manning.com/books/data-munging-with-r?a_aid=datamungingwithr&amp;a_bid=1dc44480" class="bare">To show that I really want people to contribute, here’s a discount code to
sweeten the deal: use <code>mlcarroll</code> for 50% off here.</a></p>
</div>
<div class="paragraph">
<p>Chapter 1 is a free download, so please check that out too! At the moment the
MEAP covers the first three chapters, but the following four aren’t too far
behind.</p>
</div>
<div class="paragraph">
<p>I’ll document some of the behind-the-scenes process shortly, but for now here’s
an excerpt from chapter 2:</p>
</div>
<div class="sect1">
<h2 id="storing-values-assigning"><a class="anchor" href="#storing-values-assigning"></a>2.2. Storing Values (Assigning)</h2>
<div class="sectionbody">
<div class="paragraph">
<p>In order to do something with our data, we will need to tell <code>R</code> what to call
it, so that we can refer to it in our code. In programming in general, we
typically have <em>variables</em> (things that may vary) and <em>values</em> (our data). We’ve
already seen that different data <em>values</em> can have different <em>types</em>, but we
haven’t told <code>R</code> to store any of them yet. Next, we’ll create some <em>variables</em>
to store our data <em>values</em>.</p>
</div>
<div class="sect2">
<h3 id="data-variables"><a class="anchor" href="#data-variables"></a>2.2.1. Data (Variables)</h3>
<div class="paragraph">
<p>If we have the values <code>4</code> and <code>8</code> and we want to do something with them, we can
use the values literally (say, add them together as <code>4 + 8</code>). You may be
familiar with this if you frequently use Excel; data values are stored in cells
(groups of which you can opt to name) and you tell the program which values you
wish to combine in some calculation by selecting the cells with the mouse or
keyboard. Alternatively, you can opt to refer to cells by their grid reference
(e.g. <code>A1</code>). Similarly to this second method, we can store values in <em>variables</em>
(things that may vary) and <em>abstract</em> away the values. In <code>R</code>, assigning of
values to variables takes the following form</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-r" data-lang="r">variable &lt;- value</code></pre>
</div>
</div>
<div class="paragraph">
<p>The <em>assignment operator</em> <code>&lt;-</code> can be thought of as storing the value/thing on
the right hand side into the name/thing on the left hand side. For example, try
typing <code>x &lt;- 4</code> into the <code>R</code> <code><strong>Console</strong></code> then press <kbd>Enter</kbd>:</p>
</div>
<div id="fig-x_eq_4" class="imageblock" style="text-align: center">
<div class="content">
<img src="https://jcarroll.com.au/wp-content/uploads/2017/06/variable_value.png" width="200">
</div>
<div class="title">Figure 2. 1. The <em>variable</em> <code>x</code> has been assigned the <em>value</em> <code>4</code>.</div>
</div><p>You could just as easily use the equals sign to achieve this; <code>x = 4</code> but I
recommend you use <code>&lt;-</code> for this for reasons that will become clear later.</p>
<p>You&#8217;ll notice that the <code><strong>Environment</strong></code> tab of the <code><strong>Workspace</strong></code> pane now lists
<code>x</code> under <code><strong>Values</strong></code> and shows the number 4 next to it, as shown in <a href="#fig-x_eq_4">[fig-x_eq_4]</a></p>
<div id="fig-x_eq_4" class="imageblock" style="text-align: center">
<div class="content">
<img src="https://jcarroll.com.au/wp-content/uploads/2017/06/fig-x_eq_4.png", width="450">
</div>
<div class="title">Figure 2. 2. The <em>variable</em> <code>x</code> has been assigned the <em>value</em> <code>4</code>.</div>
</div>
<div class="paragraph">
<p>What happened behind the scenes was that when we pressed <kbd>Enter</kbd>, <code>R</code> took
the entire expression that we entered (<code>x &lt;- 4</code>) and evaluated it. Since we
told <code>R</code> to <em>assign</em> the value <code>4</code> to the variable <code>x</code>, <code>R</code> converted the value
<code>4</code> to binary and placed that in the computer’s memory. <code>R</code> then gives us a
reference to that place in the computer’s memory and labels it <code>x</code>. A diagram of
this process is shown in <a href="#fig-assign">[fig-assign]</a> Nothing else appeared in the
<code><strong>Console</strong></code> because the action of assigning a value doesn’t <em>return</em> anything
(we’ll cover this more in our section on functions).</p>
</div>
<div id="fig-assign" class="imageblock" style="text-align: center">
<div class="content">
<img src="https://jcarroll.com.au/wp-content/uploads/2017/06/assign.png", width="450">
</div>
<div class="title">Figure 2. 3. Assigning a value to a variable. The value entered is converted to binary, then stored in memory, the reference to which is labelled by the variable.</div>
</div>
<div class="paragraph">
<p>This is overly simplified, of course. Technically speaking, in <code>R</code>, names have
objects rather than the other way around. This means that <code>R</code> can be quite
memory efficient since it doesn’t create a copy of anything it doesn’t need to.</p>
</div>
<div class="admonitionblock caution">
<table>
<tbody><tr>
<td class="icon" style="vertical-align:middle;">
<i class="fa icon-caution" title="Caution"></i>
</td>
<td class="content">
<div class="title">On <em>"hidden"</em> variables</div>
<div class="paragraph">
<p>Variables which begin with a period (e.g. <code>.length</code>) are considered
<em>hidden</em> and do not appear in the <code><strong>Environment</strong></code> tab of the <code><strong>Workspace</strong></code>. They otherwise behave exactly as any other variable; they can be printed and manipulated. An example of one of these is the <code>.Last.value</code> variable, which exists from the moment you load up <code>R</code> (with the value <code>TRUE</code>) — this contains the output value of the last statement executed (handy if you forgot to assign it to something). 
There are very few reasons you’ll want to use this feature (dot-prefixed hidden variables) on purpose at the moment, so for
now, avoid creating variable names with this pattern. The exception to the
<em>hidden</em> nature of these is again the <code>.Last.value</code> variable which you can
request to be visible in the <code><strong>Environment</strong></code> tab via
<span class="menuseq"><span class="menu">Tools</span>&nbsp;▸ <span class="submenu">Global Options…​</span>&nbsp;▸ <span class="submenu">General</span>&nbsp;▸ <span class="menuitem">Show .Last.value in environment listing</span></span>.</p>
</div>
</td>
</tr>
</tbody></table>
</div>
<div class="paragraph">
<p>We can retrieve the value assigned to the variable <code>x</code> by asking <code>R</code> to print
the value of <code>x</code></p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-r" data-lang="r">print(x = x)</code></pre>
</div>
</div>
<div class="listingblock">
<div class="content">
<pre>#&gt; [1] 4</pre>
</div>
</div>
<div class="paragraph">
<p>for which we have a useful shortcut — if your entire expression is just a
variable, <code>R</code> will assume you mean to <code>print()</code> it, so</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-r" data-lang="r">x</code></pre>
</div>
</div>
<div class="listingblock">
<div class="content">
<pre>#&gt; [1] 4</pre>
</div>
</div>
<div class="paragraph">
<p>works just the same.</p>
</div>
<div class="paragraph">
<p>Now, about that <code>[1]</code>: it’s important to know that in <code>R</code>, there’s no such thing
as a single value; every value is actually a <em>vector</em> of values (we’ll cover
these properly in the next chapter, but think of these as collections of values
of the same type).<sup class="footnote">[<a id="_footnoteref_1" class="footnote" href="#_footnote_1" title="View footnote.">1</a>]</sup>
Whenever <code>R</code> prints a value it allows for the case where the value contains more
than one number. To make this easier on the eye, it labels the first value
appearing on the line by it’s position in the collection. For collections
(vectors) with just a single value, this might appear strange, but this makes
more sense once our variables contain more values</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-r" data-lang="r"># Print the column names of the mtcars dataset
names(x = mtcars)</code></pre>
</div>
</div>
<div class="listingblock">
<div class="content">
<pre>#&gt;  [1] "mpg"  "cyl"  "disp" "hp"   "drat" "wt"   "qsec" "vs"   "am"   "gear"
#&gt; [11] "carb"</pre>
</div>
</div>
<div class="paragraph">
<p>We can assign another variable to another value</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-r" data-lang="r">y &lt;- 8</code></pre>
</div>
</div>
<div class="paragraph">
<p>There are few restrictions for what we can name our data <em>values</em>, but <code>R</code> will
complain if you try to break them. Variables should start with a letter, not a
number. Trying to create the variable <code>2b</code> will generate an error. Variables can
also start with a dot (<code>.</code>) as long as it’s not immediately followed by a
number, although you may wish to avoid doing so. The rest of the variable name
can consist of letters (upper and lower case) and numbers, but not punctuation
(except <code>.</code> or <code>_</code>) or other symbols (except the dot, though again, preferably
not).</p>
</div>
<div class="paragraph">
<p>There are also certain <em>reserved words</em> that you can’t name variables as. Some
are <em>reserved</em> for built-in functions or keywords</p>
</div>
<div class="paragraph">
<p><code>if</code>, <code>else</code>, <code>repeat</code>, <code>while</code>, <code>function</code>, <code>for</code>, <code>in</code>, <code>next</code>, and <code>break</code>.</p>
</div>
<div class="paragraph">
<p>Others are <em>reserved</em> for particular values</p>
</div>
<div class="paragraph">
<p><code>TRUE</code>, <code>FALSE</code>, <code>NULL</code>, <code>Inf</code>, <code>NaN</code>, <code>NA</code>, <code>NA_integer_</code>, <code>NA_real_</code>,
<code>NA_complex_</code>, and <code>NA_character_</code>.</p>
</div>
<div class="paragraph">
<p>We’ll come back to what each of these means, but for now you just need to know
that you can’t create a variable with one of those names.</p>
</div>
<div class="admonitionblock caution">
<table>
<tbody><tr>
<td class="icon" style="vertical-align:middle;">
<i class="fa icon-caution" title="Caution"></i>
</td>
<td class="content">
<div class="title">On overwriting names</div>
<div class="paragraph">
<p>What you <strong>can</strong> do however, which you may wish to take care with, is <em>overwrite</em>
the in-built names of variables and functions. By default, the value <code>pi</code> is
available (π = 3.141593).</p>
</div>
<div class="paragraph">
<p>If you were translating an equation into code, and wanted to enter the value
<em>p<sub>i</sub></em> you might accidentally call it <code>pi</code> and in doing so change the default
value, causing all sorts of trouble when you next go to use it or call a
function you’ve written which expects it to still be the default.</p>
</div>
<div class="paragraph">
<p>The default value can still be accessed by specifying the package in which it is
defined, separated by two colons (<code>::</code>). In the case of <code>pi</code>, this is the <code>base</code>
package.</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-r" data-lang="r">pi &lt;- 3L <b class="conum">(1)</b>
base::pi <b class="conum">(2)</b></code></pre>
</div>
</div>
<div class="listingblock">
<div class="content">
<pre>#&gt; [1] 3.141593</pre>
</div>
</div>
<div class="colist arabic">
<ol>
<li>
<p>Re-defining <code>pi</code> to be equal to exactly <code>3</code></p>
</li>
<li>
<p>The default, correct value is still available.</p>
</li>
</ol>
</div>
<div class="paragraph">
<p>This is also an issue for functions, with the same solution; specify the package
in which it is defined to use that definition. We’ll return to this in
a section on 'scope'.</p>
</div>
</td>
</tr>
</tbody></table>
</div>
<div class="paragraph">
<p>We’ll cover how to do things to our variables in more detail in the next
section, but for now let’s see what happens if we add our variables <code>x</code> and <code>y</code>
in the same way as we did for our regular numbers</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-r" data-lang="r">x + y</code></pre>
</div>
</div>
<div class="listingblock">
<div class="content">
<pre>#&gt; [1] 12</pre>
</div>
</div>
<div class="paragraph">
<p>which is what we got when we added these numbers explicitly. Note that since our
expression produces just a number (no assignment), the value is printed. We’ll
cover how to add and subtract values in more depth in our section on basic mathematics.</p>
</div>
<div class="paragraph">
<p><code>R</code> has no problems with overwriting these values, and it doesn’t mind what data
you overwrite these with.<sup class="footnote">[<a id="_footnoteref_2" class="footnote" href="#_footnote_2" title="View footnote.">2</a>]</sup></p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-r" data-lang="r">y &lt;- 'banana'
y</code></pre>
</div>
</div>
<div class="listingblock">
<div class="content">
<pre>#&gt; [1] "banana"</pre>
</div>
</div>
<div class="paragraph">
<p><code>R</code> is <em>case-sensitive</em>, which means that it treats <code>a</code> and <code>A</code> as distinct
names. You can have a variable named <code>myVariable</code> and another named <code>MYvariable</code>
and another named <code>myVARIABLE</code> and <code>R</code> will hold the value assigned to each
independently.</p>
</div>
<div class="quoteblock">
<div class="title">On variable names</div>
<blockquote>
There are only two hard things in Computer Science: cache invalidation and naming things.
</blockquote>
<div class="attribution">
— Phil Karlton<br>
<cite>Principal Curmudgeon Netscape Communications Corporation</cite>
</div>
</div>
<div class="paragraph">
<p>I said earlier that <code>R</code> won’t keep track of your units so it’s a good idea to
name your variables in a way that makes logical sense, is meaningful, and will
help you remember what it represents. Variables <code>x</code> and <code>y</code> are fine for playing
around with values, but aren’t particularly meaningful if your data represents
speeds, where you may want to use something like <code>speed_kmph</code> for speeds in
kilometers per hour. Underscores (<code>_</code>) are allowed in variable names, but
whether or not you use them is up to you. Some programmers prefer to name
variables in this way (sometimes referred to as 'snake_case'), others prefer
'CamelCase'. The use of periods (dots, <code>.</code>) to separate words is discouraged for
reasons beyond the scope of this book.<sup class="footnote">[<a id="_footnoteref_3" class="footnote" href="#_footnote_3" title="View footnote.">3</a>]</sup></p>
</div>
<div class="admonitionblock important">
<table>
<tbody><tr>
<td class="icon" style="vertical-align:middle;">
<i class="fa icon-important" title="Important"></i>
</td>
<td class="content">
<div class="title">Naming things</div>
<div class="paragraph">
<p>Be careful when naming your variables. Make them meaningful and
concise. In six months from now, will you remember what <code>data_17</code> corresponds to? Tomorrow, will you remember that <code>newdata</code> was updated twice?</p>
</div>
</td>
</tr>
</tbody></table>
</div>
</div>
<div class="sect2">
<h3 id="unchanging-data"><a class="anchor" href="#unchanging-data"></a>2.2.2. Unchanging Data</h3>
<div class="paragraph">
<p>If you’re familiar with working with data in a spreadsheet program (such as
Excel), you may expect your variables to behave in a way that they
won’t. Automatic recalculation is a very useful feature of spreadsheet programs,
but it’s not how <code>R</code> behaves.</p>
</div>
<div class="paragraph">
<p>If we assign our two variables, then add them, we can save that result to
another variable</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-r" data-lang="r">a &lt;- 4
b &lt;- 8
sum_of_a_and_b &lt;- a + b</code></pre>
</div>
</div>
<div class="paragraph">
<p>This has the value we expect</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-r" data-lang="r">print(x = sum_of_a_and_b)</code></pre>
</div>
</div>
<div class="listingblock">
<div class="content">
<pre>#&gt; [1] 12</pre>
</div>
</div>
<div class="paragraph">
<p>Now, if we <em>change</em> one of these values</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-r" data-lang="r">b &lt;- 2</code></pre>
</div>
</div>
<div class="paragraph">
<p>this has <strong>no impact</strong> on the value of the variable we created to hold the sum
earlier</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-r" data-lang="r">print(x = sum_of_a_and_b)</code></pre>
</div>
</div>
<div class="listingblock">
<div class="content">
<pre>#&gt; [1] 12</pre>
</div>
</div>
<div class="paragraph">
<p>Once the sum was calculated, and that value stored in a variable, the connection
to the original values was lost. This makes things <em>reliable</em> because you know
for sure what value a variable will have at any point in your calculation by
following the steps that lead to it, whereas a spreadsheet depends much more on
its current overall <em>state</em>.</p>
</div>
</div>
<div class="sect2">
<h3 id="assigmnent-operators-code-code-vs-code-code"><a class="anchor" href="#assigmnent-operators-code-code-vs-code-code"></a>2.2.3. Assigmnent Operators (<code>&lt;-</code> vs <code>=</code>)</h3>
<div class="paragraph">
<p>If you’ve read some <code>R</code> code already, you’ve possibly seen that both <code>&lt;-</code> and
<code>=</code> are used to assign values to objects, and this tends to cause some
confusion. Technically, <code>R</code> will accept either when assigning variables, so in
that respect it comes down to a matter of style (I still highly recommend
assigning with <code>&lt;-</code>). The big difference comes when using functions that take
<em>arguments</em> — there you should only use <code>=</code> to specify what the <em>value</em> of the
<em>argument</em>. For example, when we inspected the <code>mtcars</code> data, we could
specify a string with which to indent the output</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-r" data-lang="r">str(object = mtcars, indent.str = '&gt;&gt;  ')</code></pre>
</div>
</div>
<div class="listingblock">
<div class="content">
<pre>#&gt; 'data.frame':	32 obs. of  11 variables:
#&gt; &gt;&gt;  $ mpg : num  21 21 22.8 21.4 18.7 18.1 14.3 24.4 22.8 19.2 ...
#&gt; &gt;&gt;  $ cyl : num  6 6 4 6 8 6 8 4 4 6 ...
#&gt; &gt;&gt;  $ disp: num  160 160 108 258 360 ...
#&gt; &gt;&gt;  $ hp  : num  110 110 93 110 175 105 245 62 95 123 ...
#&gt; &gt;&gt;  $ drat: num  3.9 3.9 3.85 3.08 3.15 2.76 3.21 3.69 3.92 3.92 ...
#&gt; &gt;&gt;  $ wt  : num  2.62 2.88 2.32 3.21 3.44 ...
#&gt; &gt;&gt;  $ qsec: num  16.5 17 18.6 19.4 17 ...
#&gt; &gt;&gt;  $ vs  : num  0 0 1 1 0 1 0 1 1 1 ...
#&gt; &gt;&gt;  $ am  : num  1 1 1 0 0 0 0 0 0 0 ...
#&gt; &gt;&gt;  $ gear: num  4 4 4 3 3 3 3 4 4 4 ...
#&gt; &gt;&gt;  $ carb: num  4 4 1 1 2 1 4 2 2 4 ...</pre>
</div>
</div>
<div class="paragraph">
<p>If we had used <code>&lt;-</code> instead of <code>=</code> for either argument, then <code>R</code> would treat
that as creating a new variable <code>object</code> or <code>indent.str</code> with value <code>mtcars</code> or
<code>'&gt;&gt; '</code> respectively, which isn’t what we want.</p>
</div>
<div class="admonitionblock warning">
<table>
<tbody><tr>
<td class="icon" style="vertical-align:middle;">
<i class="fa icon-warning" title="Example"></i>
</td>
<td class="content">
<div class="title">Assigning to variables.</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-r" data-lang="r">score &lt;- 4.8
score</code></pre>
</div>
</div>
<div class="listingblock">
<div class="content">
<pre>#&gt; [1] 4.8</pre>
</div>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-r" data-lang="r">str(object = score)</code></pre>
</div>
</div>
<div class="listingblock">
<div class="content">
<pre>#&gt;  num 4.8</pre>
</div>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-r" data-lang="r">fruit &lt;- 'banana'
fruit</code></pre>
</div>
</div>
<div class="listingblock">
<div class="content">
<pre>#&gt; [1] "banana"</pre>
</div>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-r" data-lang="r">str(object = fruit)</code></pre>
</div>
</div>
<div class="listingblock">
<div class="content">
<pre>#&gt;  chr "banana"</pre>
</div>
</div>
</td>
</tr>
</tbody></table>
</div>
<div class="paragraph">
<p>Note that we didn’t need to tell <code>R</code> that one of these was a number and one was
a string, it figured that out itself. It’s good practice (and easier to read) to
make your <code>&lt;-</code> line up vertically when defining several variables:</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-r" data-lang="r">first_name &lt;- 'John'
last_name  &lt;- 'Smith'
top_points &lt;- 23</code></pre>
</div>
</div>
<div class="paragraph">
<p>but only if this can be achieved without adding too many spaces (exactly how
many is too many is up to you).</p>
</div>
<div class="admonitionblock caution">
<table>
<tbody><tr>
<td class="icon" style="vertical-align:middle;">
<i class="fa icon-caution" title="Caution"></i>
</td>
<td class="content">
<div class="paragraph">
<div class="title">Watch this space!</div>
<p>An extra space can make a big difference to the syntax. Compare:</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-r" data-lang="r">a &lt;- 3</code></pre>
</div>
</div>
<div class="paragraph">
<p>with</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-r" data-lang="r">a &lt; - 3</code></pre>
</div>
</div>
<div class="listingblock">
<div class="content">
<pre>#&gt; [1] FALSE</pre>
</div>
</div>
<div class="paragraph">
<p>In the first case we assigned the value <code>3</code> to the variable <code>a</code> (which returns
nothing). In the second case, with a wayward space, we <em>compared</em> <code>a</code> to the
value <code>-3</code> which returns <code>FALSE</code> (I’ll explain why that works at all, later).</p>
</div>
</td>
</tr>
</tbody></table>
</div>
<div class="paragraph">
<p>Now that we know how to provide some data to <code>R</code>, what if we want to explicitly
tell <code>R</code> that our data should be of a specific type, or we want to convert our
data to a different type? That’s an article for another day.</p>
</div>
<div class="paragraph">
<p><a href="https://www.manning.com/books/data-munging-with-r?a_aid=datamungingwithr&amp;a_bid=1dc44480" class="bare">If you’re interested in seeing more, and hopefully providing feedback on what
you do/don’t like about it, then use the discount code <code>mlcarroll</code> here</a>
for 50% off and get reading!</p>
</div>
</div>
</div>
</div>
<div id="footnotes">
<hr>
<div class="footnote" id="_footnote_1">
<a href="#_footnoteref_1">1</a>. In technical terms, <code>R</code> has no <em>scalar</em> types.
</div>
<div class="footnote" id="_footnote_2">
<a href="#_footnoteref_2">2</a>. This is where the distinction of <em>weakly typed</em> becomes important - in a <em>strongly typed</em> language you would not be able to arbitrarily change the type of a variable.
</div>
<div class="footnote" id="_footnote_3">
<a href="#_footnoteref_3">3</a>. This syntax is already used within <code>R</code> to denote functions acting on a specific class, such as <code>print.Date()</code>.
</div>
</div></div>

[wpghs]