$(document).ready(function() {
  $(".new-tweet").on("input", "#tweet-text", function() {
    if (140 - this.value.length <= 0) {
      $('.counter').replaceWith(`<output name="counter" class="counter" for="tweet-text" style="color: red">${140 - this.value.length}</output>`)
    } else {
      $('.counter').replaceWith(`<output name="counter" class="counter" for="tweet-text">${140 - this.value.length}</output>`)
    }
  })
})