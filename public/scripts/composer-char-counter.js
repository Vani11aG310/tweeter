$(document).ready(function() {
  $(".new-tweet").on("input", "#tweet-text", function() {
    let remainingChars = 140;
    remainingChars -= this.value.length;
    $('.counter').text(remainingChars);

    if (remainingChars < 0) {
      $('.counter').css("color", "red");
    } else {
      $('.counter').css("color", "");
    }
  })
})