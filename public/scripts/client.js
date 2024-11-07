/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready( function() {
  createTweetElement = function(tweet) {
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
  
  renderTweets = function(tweets) {
    for (const tweet of tweets) {
      const newTweet = createTweetElement(tweet);
      $('.tweet-library').prepend(newTweet);
    }
  }

  loadTweets = function() {
    $.get('/tweets', function(data) {
      renderTweets(data)
    })
  }

  loadTweets();
})