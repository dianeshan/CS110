let t; //variable for the interval
let tweets = []; //array of tweets
let tweetIDs = []; //master list of tweetIDs that have been fetched

window.addEventListener("load", (event) => {
    console.log("page fully loaded");

    checkPause();
    document.getElementById("pauseBox").addEventListener("click", () => checkPause());

});

/**
 * Checks whether or not we should keep fetching from the server every 5 seconds
 *
 * @param {none}, just checking to see if box is checked or not
 * @returns {boolean}, returns true if checkbox is checked and false otherwise
 */
function checkPause() {
    if (document.getElementById("pauseBox").checked) {
        clearInterval(t);
    }
    else {
        t = setInterval(getTweets, 5000);
    }
}

/**
 * Fetches tweets from the server
 *
 * @param None, fetches from the server
 * @returns None, pushes tweets into tweets array
 */
function getTweets() {
    const url = "http://ec2-18-209-247-77.compute-1.amazonaws.com:3000/feed/random?q=weather"

    fetch(url)
        .then(res => res.json()).then(data => {
            // do something with data
            console.log(data);
            for (let i = 0; i < Object.keys(data.statuses).length; i++) {
                //check for duplicates here
                if (!tweetIDs.includes(data.statuses[i].id)) {
                    tweetIDs.push(data.statuses[i].id);
                    tweets.push(data.statuses[i]);
                }
            }
            console.log(tweets);
            refreshTweets(tweets);
        })
        .catch(err => {
            // error catching
            console.log(err)
        })

}

let searchString = "" // here we use a global variable

const handleSearch = event => {
    searchString = event.target.value.trim().toLowerCase();
    //constantly updates displayed tweets when searching
    refreshTweets(tweets);
}

document.getElementById("searchBar").addEventListener("input", handleSearch);

const tweetContainer = document.getElementById('tweet-container');

/**
 * Removes all existing tweets from tweetList and then append all tweets back in
 *
 * @param {Array<Object>} tweets - A list of tweets
 * @returns None, the tweets will be renewed
 */
function refreshTweets(tweets) {
    // feel free to use a more complicated heuristics like in-place-patch, for simplicity, we will clear all tweets and append all tweets back
    // {@link https://stackoverflow.com/questions/3955229/remove-all-child-elements-of-a-dom-node-in-javascript}
    while (tweetContainer.firstChild) {
        tweetContainer.removeChild(tweetContainer.firstChild);
    }

    // create an unordered list to hold the tweets
    // {@link https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement}
    const tweetList = document.createElement("ul");
    // append the tweetList to the tweetContainer
    // {@link https://developer.mozilla.org/en-US/docs/Web/API/Node/appendChild}
    tweetContainer.appendChild(tweetList);

    // all tweet objects (no duplicates) stored in tweets variable
    // filter on search text
    // {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter}
    const filteredResult = tweets.filter(tweets => tweets.text.toLowerCase().search(searchString) != -1);

    // sort by date
    // {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort}
    const sortedResult = filteredResult.sort((function compareFn(a, b) { return new Date(b.created_at) - new Date(a.created_at);}));

    // execute the arrow function for each tweet
    // {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach}
    sortedResult.forEach(tweetObject => {
        // create a container for individual tweet
        const tweet = document.createElement("div");
        tweet.classList.add("tweets");

        // e.g. create a div holding tweet content
        const tweetContent = document.createElement("div");
        tweetContent.classList.add("row", "container");

        //create a column to put the profile picture
        const pictureContainer = document.createElement("div");
        pictureContainer.classList.add("col-1");

        //create an element that contains the user's profile picture
        const tweetProfilePicture = document.createElement('img');
        tweetProfilePicture.src = tweetObject.user.profile_image_url;
        tweetProfilePicture.classList.add("pfp-small");
        pictureContainer.appendChild(tweetProfilePicture);

        //append picture container to tweet content
        tweetContent.appendChild(pictureContainer);

        //content container created for styling
        const contentContainer = document.createElement("div");
        contentContainer.classList.add("col-11", "px-4");
        
        //namespan created to style the name of each author
        const nameSpan = document.createElement("span");
        nameSpan.classList.add("bold-text");

        //create a text node that contains the author's real name
        const tweetName = document.createTextNode(tweetObject.user.name);
        nameSpan.appendChild(tweetName);

        //append the namespan to content container
        contentContainer.appendChild(nameSpan);

        //screenname span created to style the screen name of each author
        const screenNameSpan = document.createElement("span");
        screenNameSpan.classList.add("grey-text");

        //create a text node that contains the author's screen name
        const tweetScreenName = document.createTextNode(" @" + tweetObject.user.screen_name);
        screenNameSpan.appendChild(tweetScreenName);
        
        //append the screenname span to content container
        contentContainer.appendChild(screenNameSpan);

        //create a text node that contains the text content of the tweet
        const textContent = document.createElement("p");
        const tweetText = document.createTextNode(tweetObject.text);
        textContent.appendChild(tweetText);
        
        //append text content to content container
        contentContainer.appendChild(textContent);

        //create a text node that contains the time the tweet was published
        const dateContent = document.createElement("p");
        date = new Date(tweetObject.created_at);
        const tweetTime = document.createTextNode(date.toLocaleString());
        dateContent.appendChild(tweetTime);

        //append date to content container
        contentContainer.appendChild(dateContent);

        //append the content container to tweet content
        tweetContent.appendChild(contentContainer);

        //append the tweet content to the tweet
        tweet.appendChild(tweetContent);

        // finally append your tweet into the tweet list
        tweetList.appendChild(tweet);
    });
}

