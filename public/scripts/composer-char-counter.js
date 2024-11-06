$(document).ready(function() {
  $(".new-tweet").on("input", "#tweet-text", function() {
    var remainingChars = 140 - this.value.length;
    $('.counter').text(remainingChars);

    if (remainingChars < 0) {
      $('.counter').css("color", "red");
    } else {
      $('.counter').css("color", "");
    }
  })
})