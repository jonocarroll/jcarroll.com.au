---
title: SimplyStats Thanksgiving Puzzle
author: Jonathan Carroll
date: 2015-11-26 09:39:33
slug: testingyaml
categories: []
tags: [rstats]
type: ''
subtitle: ''
image: ''
---
I owe a lot to Jeff Leek and Roger Peng for their great Coursera courses, in which I learned to program in R. They (along with Rafa Irizarry) run the <a href="http://simplystatistics.org/" target="_blank">Simply Statistics</a> blog, which I highly reccomend. They posted a Thanksgiving puzzle in which a data.frame needs to be converted from one form to another, spelling out 'thanksgiving'.

<a href="http://simplystatistics.org/2015/11/25/a-thanksgiving-dplyr-rubiks-cube-puzzle-for-you/">http://simplystatistics.org/2015/11/25/a-thanksgiving-dplyr-rubiks-cube-puzzle-for-you/</a>

The puzzle: convert this

<script src="https://gist.github.com/jtleek/aae1218a8f4d1220e07d.js"></script>

into this

<script src="https://gist.github.com/jtleek/4d4b63a035973231e6d4.js"></script>

My solution, which uses Rubik's Cube rotations of rows and columns (and dplyr of course):

<script src="https://gist.github.com/JonoCarroll/f89e0aae8b6c83ac5818.js"></script>

Suggestions on how I could have done this differently (or automated solutions) most welcome!