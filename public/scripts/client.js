/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {
  $('.tweet-form').on('submit', function(event) {
    const tweet = $('#tweet-text').val();
    const trimmedTweet = tweet.trim();
    const validation = isTweetValid(trimmedTweet);
    event.preventDefault();
    if (!validation.valid && validation.errorMessage) {
      $('#er').html(`<i class="fa-solid fa-triangle-exclamation"></i> ${validation.errorMessage} <i class="fa-solid fa-triangle-exclamation"></i>`);
      $('#er').slideDown("fast", function() { });
    } else {
      $('#er').slideUp("fast", function() { });
      $('#tweet-text').val(trimmedTweet);
      const formData = $(this).serialize();
      $.ajax({
        type: "POST",
        url: "/tweets",
        data: formData,
        success: function() {
          $('#tweet-text').val("");
          $('.counter').text('140');
          loadTweets();
        }
      });
    }
  });
  // validate submission before passing to GET request
  function isTweetValid(tweet) {
    let valid = true;
    let errorMessage;
    if (tweet === "") {
      valid = false;
      errorMessage = "Much wow, much empty! Tweet cannot be empty";
    }
    if (tweet.length > 140) {
      valid = false;
      errorMessage = "Your tweet is too long. Please keep it within our character limit of 140";
    }

    return { valid, errorMessage };
  }
  // create html for tweet
  function createTweetElement(tweet) {
    const dateCreated = timeago.format(escape(tweet.created_at));
    const text = escape(tweet.content.text);
    const handle = escape(tweet.user.handle);
    const name = escape(tweet.user.name);
    const avatarURL = escape(tweet.user.avatars);

    const $tweet = $(`
      <article class="tweet">
        <header>
          <div class="user">
            <img src=${avatarURL}>
            <span>${name}</span>
          </div>
          <span style="color:darkgrey">${handle}</span>
        </header>
        <p>${text}</p>
        <footer>
          <span>${dateCreated}</span>
          <section class="tweet-icons">
            <i class="fa-solid fa-flag"></i>
            <i class="fa-sharp fa-solid fa-retweet"></i>
            <i class="fa-sharp fa-solid fa-heart"></i>
          </section>
        </footer>
      </article>
    `);
    return $tweet;
  }
  // Render tweets on the page
  function renderTweets(tweets) {
    $('.tweet-library').empty();
    for (const tweet of tweets) {
      const newTweet = createTweetElement(tweet);
      $('.tweet-library').prepend(newTweet);
    }
  }
  // fetch tweets from server
  function loadTweets() {
    $.ajax('/tweets', {
      method: 'GET'
    })
      .then(function(data) {
        renderTweets(data);
      });
  }
  // protection function from cross-site scripting attacks, escaping harmful characters.
  function escape(str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

  loadTweets();
});