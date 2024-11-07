/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready( function() {
  $('.tweet-form').on('submit', function(event) {
    let valid = true;
    let errorMessage;
    if ($('.tweet-form').val() === "") {
      valid = false;
      errorMessage = "Tweet cannot be empty.";
    }
    if (Number($('.counter').text()) < 0) {
      valid = false;
      errorMessage = "Your tweet is too long!";
    }
    event.preventDefault();
    const formData = $(this).serialize();
    if (!valid && errorMessage) {
      alert(errorMessage);
    } else {
      $.ajax({
        type: "POST",
        url: "/tweets",
        data: formData
      })
    }
  })

  function createTweetElement(tweet) {
    const dateCreated = tweet.created_at
    const $tweet = $(`
      <article class="tweet">
        <header>
          <div class="user">
            <img src=${tweet.user.avatars}>
            <span>${tweet.user.name}</span>
          </div>
          <span style="color:darkgrey">${tweet.user.handle}</span>
        </header>
        <p>${tweet.content.text}</p>
        <footer>
          <span>${timeago.format(dateCreated)}</span>
          <section class="tweet-icons">
            <i class="fa-solid fa-flag"></i>
            <i class="fa-sharp fa-solid fa-retweet"></i>
            <i class="fa-sharp fa-solid fa-heart"></i>
          </section>
        </footer>
      </article>
    `)
    return $tweet;
  }
  
  function renderTweets(tweets) {
    $('.tweet-library').empty();
    for (const tweet of tweets) {
      const newTweet = createTweetElement(tweet);
      $('.tweet-library').prepend(newTweet);
    }
  }

  function loadTweets() {
    $.ajax('/tweets', {
      method: 'GET'
    })
    .then(function(data) {
      renderTweets(data);
    })
  }

  loadTweets();
})