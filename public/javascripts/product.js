

$(document).ready(function() {
    $('.thumbnail').hover(function() {
      var src = $(this).attr('src');
      $('.main-image').attr('src', src);
    });

    let first_src = $('.thumbnail').attr('src');
    $('.main-image').attr('src',first_src)
  });

  Fancybox.bind('[data-fancybox="gallery"]', {
    caption: function (fancybox, carousel, slide) {
      return (
        `${slide.index + 1} / ${carousel.slides.length} <br />` + slide.caption
      );
    },
  });

  
  