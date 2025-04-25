---
title: Function Generators vs Partial Application in R
author: Jonathan Carroll
date: '2025-04-25'
slug: function-generators-vs-partial-application-in-r
categories:
  - rstats
  - haskell
tags:
  - rstats
  - haskell
type: ''
subtitle: ''
image: ''
---

In which I confront the way I read code in different languages, and end up 
wishing that R had a feature that it doesn't.

<!--more-->

This is a bit of a thought-dump as I consider some code - please don't take it
as a criticism of any design choices; the tidyverse team have written magnitudes
more code that I have and have certainly considered their approach more than I
will. I believe it's useful to challenge our own assumptions and dig in to how
we react to reading code.

[The blog post]( https://www.tidyverse.org/blog/2025/04/scales-1-4-0/ )
describing the latest updates to the tidyverse {scales} package neatly
demonstrates the usage of the new functionality, but because the examples are
written outside of actual plotting code, one feature stuck out to me in
particular...

```r
label_glue("The {x} penguin")(c("Gentoo", "Chinstrap", "Adelie"))
# The Gentoo penguin
# The Chinstrap penguin
# The Adelie penguin
```

Here, `label_glue` is a function that takes a {glue} string as an argument and
returns a 'labelling" function'. _That_ function is then passed the vector of
penguin species, which is used in the {glue} string to produce the output.

(aside) for those coming to this post from a python background, {glue} is R's
answer to f-strings, and is used in almost the exact same way for simple cases:

```r
name <- "Jonathan"
glue::glue("My name is {name}")
# My name is Jonathan
```

```python
>>> name = 'Jonathan'
>>> f"My name is {name}"
# 'My name is Jonathan'
```

There's nothing magic going on with the `label_glue()()` call - functions are
being applied to arguments - but it's always useful to interrogate surprise when
reading some code.

Spelling out an example might be a bit clearer. A simplified version of
`label_glue` might look like this

```r
tmp_label_glue <- function(pattern = "{x}") {
  function(x) {
    glue::glue_data(list(x = x), pattern)
  }
}
```

This returns a function which takes one argument, so if we evaluate it we get

```r
tmp_label_glue("The {x} penguin")
# function(x) {
#   glue::glue_data(list(x = x), pattern)
# }
# <environment: 0x1137a72a8>
```

This has the benefit that we can store this result as a new named function

```r
penguin_label <- tmp_label_glue("The {x} penguin")
penguin_label
# function(x) {
#    glue::glue_data(list(x = x), pattern)
# }
# <bytecode: 0x113914e48>
# <environment: 0x113ed4000>

penguin_label(c("Gentoo", "Chinstrap", "Adelie"))
# The Gentoo penguin
# The Chinstrap penguin
# The Adelie penguin
```

This is versatile, because different {glue} strings can produce different
functions - it's a function generator. That's neat if you _want_ different
functions, but if you're only working with that one pattern, it can seem odd to
call it inline without naming it, as the earlier example

```r
label_glue("The {x} penguin")(c("Gentoo", "Chinstrap", "Adelie"))
```

It _looks like_ we should be able to have all of these arguments in the same
function

```r
label_glue("The {x} penguin", c("Gentoo", "Chinstrap", "Adelie"))
```

but apart from the fact that `label_glue` doesn't take the labels as an
argument, that doesn't return a function, and the place where this will be used
_takes a function_ as the argument.

So, why do the functions from {scales} take functions as arguments? The reason
would seem to be that this enables them to work _lazilly_ - we don't necessarily
know the values we want to pass to the generated function at the call site;
maybe those are computed as part of the plotting process.

We also don't want to have to extract these labels out ourselves and compute on
them; it's convenient to let the `scale_*` function do that for us, if we just
provide a function for it to use when the time is right.

But what _is_ passed to that generated function? That depends on where it's
used... if I used it in `scale_y_discrete` then it might look like this

```r
library(ggplot2)
library(palmerpenguins)

p <- ggplot(penguins[complete.cases(penguins), ]) + 
  aes(bill_length_mm, species) + 
  geom_point() 

p + scale_y_discrete(labels = penguin_label)
```

since the `labels` argument takes a function, and `penguin_label` is a function
created above.

I could equivalently write that as

```r
p + scale_y_discrete(labels = label_glue("The {x} penguin"))
```

and not need the "temporary" function variable.

So what gets passed in here? That's a bit hard to dig out of the source, but one
could reasonably expect that at some point the supplied function will be called
with the available labels as an argument.

I have a suspicion that the "external" use of this function, as

```r
label_glue("The {x} penguin")(c("Gentoo", "Chinstrap", "Adelie"))
```

is clashing with my (much more recent) understanding of Haskell and the way that
partial application works. In Haskell, _all_ functions take exactly 1 argument,
even if they look like they take more. This function

```haskell
ghci> do_thing x y z = x + y + z
```

_looks like_ it takes 3 arguments, and it _looks like_ you can use it that way

```haskell
ghci> do_thing 2 3 4
9
```

but _really_, each "layer" of arguments is a function with 1 argument, i.e. an
honest R equivalent would be

```r
do_thing <- function(x) {
  function(y) {
    function(z) {
      x + y + z
    }
  }
}
do_thing(2)(3)(4)
# [1] 9
```

What's important here is that we can "peel off" some of the layers, and we get
back a function that takes the remaining argument(s)

```r
do_thing(2)(3)
# function(z) {
#    x + y + z
# }
# <bytecode: 0x116b72ba0>
# <environment: 0x116ab2778>

partial <- do_thing(2)(3)
partial(4)
# [1] 9
```

In Haskell, that looks like this

```haskell
ghci> partial = do_thing 2 3
ghci> partial 4
9
```

Requesting the type signature of this function shows 

```haskell
ghci> :type do_thing
do_thing :: Num a => a -> a -> a -> a
```

so it's a function that takes some value of type `a` (which needs to be a `Num`
because we're using `+` for addition; this is inferred by the compiler) and then
we have

```
a -> a -> a -> a
```

This can be read as "a function that takes 3 values of a type `a` and returns 1
value of that same type" but equivalently (literally; this is all just syntactic
sugar) we can write it as

```
a -> (a -> (a -> a))
```

which is "takes a value of type `a` and returns a function that takes a value of
type `a`, which itself returns a function that takes a value of type `a` and
returns a value of type `a`". With a bit of ASCII art...

```
a -> (a -> (a -> a))
|     |     |    |
|     |     |_z__|
|     |_y________|
|_x______________|     
```

If we ask for the type signature when _some of_ the arguments are provided

```haskell
ghci> :type do_thing 2 3
do_thing 2 3 :: Num a => a -> a
```

we see that now it is a function of a single variable (`a -> a`).

With that in mind, the labelling functions look like a great candidate for
partially applied functions! If we had

```r
label_glue(pattern, labels)
```

then 

```r
label_glue(pattern)
```

would be a function "waiting" for a `labels` argument. Isn't that the same as
what we have? Almost, but not quite. `label_glue` doesn't take a `labels`
argument, it returns a function which will use them, so the lack of the `labels`
argument isn't a signal for this. `label_glue(pattern)` still returns a
function, but that's not obvious, especially when used inline as

```r
scale_y_discrete(labels = label_glue("The {x} penguin"))
```

When I read R code like that I see the parentheses at the end of `label_glue`
and read it as "this is a function invocation; the return value will be used
here". That's correct, but in this case the return value is another function.
There's nothing here that says "this will return a function". There's no
convention in R for signalling this (and being dynamically typed, all one can do
is read the documentation) but one could imagine one, e.g. `label_glue_F` in a
similar fashion to how Julia uses an exclamation mark to signify an in-place
mutating function; `sort!` vs `sort`.

Passing around functions is all the rage in functional programming, and it's how
you can do things like this

```r
sapply(mtcars[, 1:4], mean)
#      mpg       cyl      disp        hp 
# 20.09062   6.18750 230.72188 146.68750 
```

Here I'm passing a list (the first four columns of the `mtcars` dataset) and a
_function_ (`mean`, by name) to `sapply` which essentially does a `map(l, f)`
and produces the mean of each of these columns, returning a named vector of the
means.

That becomes very powerful where partial application is allowed, enabling things
like

```haskell
ghci> add_5 = (+5)
ghci> map [1..10] add_5
[6,7,8,9,10,11,12,13,14,15]
```

In R, we would need to create a new function more explicitly, i.e. referring to
an arbitrary argument

```r
add_5 <- \(x) x + 5
sapply(1:10, add_5)
# [1]  6  7  8  9 10 11 12 13 14 15
```

Maybe my pattern-recognition has become a bit too overfitted on the idea that in
R "no parentheses = function, not result; parentheses = result".

This reads weirdly to me

```r
calc_mean <- function() {
  function(x) {
    mean(x)
  }
}
sapply(mtcars[, 1:4], calc_mean())
```

but it's exactly the same as the earlier example, since `calc_mean()`
essentially returns a `mean` function

```r
calc_mean()(1:10)
[1] 5.5
```

For that reason, I like the idea of naming the labelling function, since I read
this

```r
p + scale_y_discrete(labels = penguin_label)
```

as passing a _function_. The parentheses get used in the right place - where the
function has been called.

Now, having to define that variable just to use it in the `scale_y_discrete`
call is probably a bit much, so yeah, inlining it makes sense, with the caveat
that _you have to know it's a function_.

None of this was meant to say that the {scales} approach is wrong in any way - I
just wanted to address my own perceptions of the `arg = fun()` design. It _does_
make sense, but it looks different. Am I alone on this?

Let me know on [Mastodon](https://fosstodon.org/@jonocarroll) and/or the comment
section below.

<br />
<details>
  <summary>
    <tt>devtools::session_info()</tt>
  </summary>
```{r sessionInfo, echo = FALSE}
devtools::session_info()
```
</details>
<br />
