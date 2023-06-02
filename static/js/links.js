$(document).ready(function() {
  $('.blog-post a').not('.share a').each(function() {
      if (this.hostname != window.location.hostname) {
          this.hostname && $(this).after(' <span class="link-annot">('+this.hostname+')</span>');
      }
  });
});
