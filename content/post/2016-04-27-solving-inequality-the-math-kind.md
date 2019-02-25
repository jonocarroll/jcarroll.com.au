---
title: Solving Inequality (the math kind)
author: Jonathan Carroll
date: 2016-04-27 22:47:55
slug: testingyaml
categories: [R]
tags: [rstats]
type: ''
subtitle: ''
image: ''
---
<a href="https://xianblog.wordpress.com/2016/04/21/an-integer-programming-riddle/" target="_blank">This neat approach</a> showed up recently as an answer to a <a href="http://fivethirtyeight.com/features/you-have-1-billion-to-win-a-space-race-go/" target="_blank">FiveThirtyEight puzzle</a> and of course I couldn't help but throw it at <code>dplyr</code> as soon as I could. Turns out that's not a terrible idea. The question posed is

<blockquote>
optimise

200a + 100b + 50c + 25d

under the constraints

400a + 400b + 150c + 50d ≤ 1000, 
b ≤ a, 
a ≤ 1, 
c ≤ 8, 
d ≤ 4,

and (a,b,c,d) all non-negative integers.
</blockquote>

Leaving aside any interpretations of wording of the original question (let's just start with trying to solve <em>this</em> system of inequalities) <a href="https://xianblog.wordpress.com/2016/04/21/an-integer-programming-riddle/" target="_blank">the solution provided used 4 nested loops</a>, which can definitely be avoided.

My approach was to create all possible combinations of the 4 variables (within the given constraints), filter out the ones that don't meet the constraint criteria, then sort by the evaluating expression to find which one does best. 

[gist id = "65315f0dc1061bd2fafa7607abbc3145" file = "inequality_1.R"]

I'm not suggesting that this is by any means always the best approach, but when the phase-space of possible solutions is so low (especially combinations of small integers) then this is pretty tidy (technically a single <code>dplyr</code> chain).

Alternatively, one could set this up as an equation and use a linear solver. In that case, we want to optimise

$latex \max(\|A x\|) $

subject to the constraints

$latex G x \ge h $

where $latex A$ and $latex x$ represent the coefficients and variables to be optimised, $latex h$ the constraint vector, and $latex G$  a matrix of coefficients for the constraints. For the system we're looking at, that matrix inequality looks like this

$latex \left[\begin{array}{cccc}400 & 400 & 150 & 50 \\1 & 0 & 0 & 0 \\0 & 1 & 0 & 0 \\0 & 0 & 1 & 0 \\0 & 0 & 0 & 1\end{array}\right] \left[\begin{array}{c}a \\ b \\ c \\ d\end{array}\right] \le \left[\begin{array}{c}1000 \\ 1 \\ 1 \\ 8 \\ 4\end{array}\right]\ . $

Of course, the constraint that $latex b \le a$ needs to be checked after the fact.

Programming this is fairly straightforward, even with the constraint that these are integer solutions. <a href="http://www.inside-r.org/packages/cran/limSolve/docs/linp" target="_blank"><code>limSolve::linp</code></a> is made for exactly these types of problems.

[gist id = "65315f0dc1061bd2fafa7607abbc3145" file = "inequality_2.R"]

which results in the same answer as our manual brute-force search.

One last thing to try is to plot the solution space and see how it looks. Sounds like a good opportunity to try out <a href="https://plot.ly/" target="_blank">plotly</a>. 

Since this is technically a 5D plot (4 variables and a value) it's a little difficult to visualise. I've reduced the dimensionality by treating each unique combination of $latex a \le 1$ and $latex b \le a$ (i.e. $latex 00,~01,~10,~11$) as a group and using colour to distinguish those. The plot below should show up as a 3D object, so click, drag, and scroll it to have a closer look. Clicking on a group will remove/add it so you can get a clearer view, and hovering over a point should bring up the values of the axes and evaluation.

<div>
    <a href="https://plot.ly/~jonocarroll/0/" target="_blank" title="00, 10, 01, 11" style="display: block; text-align: center;"><img src="https://plot.ly/~jonocarroll/0.png" alt="00, 10, 01, 11" style="max-width: 100%;width: 800px;"  width="800" onerror="this.onerror=null;this.src='https://plot.ly/404.png';" /></a>
    <script data-plotly="jonocarroll:0"  src="https://plot.ly/embed.js" async></script>
</div>

Going back to the expression that's being optimised it's pretty clear why it's broken down into 4 planes when grouped this way (substitute different values of $latex a$ and $latex b$ to see).

Do you have another way to solve this? Drop a line or a link in the comments.