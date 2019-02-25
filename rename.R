files <- dir("content/post/", pattern = ".*[.]Rmd$", full.names = TRUE)
for (file in files) {
  slug <- stringr::str_extract(file, "(?<=[[:number:]]-)[[:alpha:]].*?(?=[.]Rmd)")
  lines <- readLines(file)
  slugline <- grep("slug:", lines)
  lines[slugline] <- stringr::str_replace(lines[slugline], "testingyaml", slug)
  # print(lines[slugline])
  writeLines(lines, file)
}
