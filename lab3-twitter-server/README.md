# Lab 3 - Twitter Server

## Implementation Details

* Reused the code from Lab 1 as the index.html and index.css base

* To implement fetching from the server, we created a `getTweets()` function that fetched tweets from the server and added each tweet to our tweets array, while also checking for duplicates through the tweet id's

* Within the `getTweets()` function we also call the `refreshTweets(tweets)` function which takes in the tweets array and filters it by the search string if applicable, sorts the array, and then displays it on the page which is styled with css classes

* We also implemented a `checkPause()` function to check for whether or not the checkbox to pause the feed is checked. If it is checked then we would stop fetching from the server.

## External Libraries 

* Bootstrap - used bootstrap for some basic styling 
