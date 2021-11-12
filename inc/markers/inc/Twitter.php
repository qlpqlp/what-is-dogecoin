<?php
/**
*   File: Twitter
*   Author: https://twitter.com/inevitable360 and all #Dogecoin friends and familly helped will try to find a way to put all names eheh!
*   Description: Real use case of the dogecoin.com CORE Wallet connected by RCP Calls using Old School PHP Coding with easy to learn steps (I hope lol)
*   License: Well, do what you want with this, be creative, you have the wheel, just reenvent and do it better! Do Only Good Everyday
*/

// We include the Twitter API
require_once('inc/vendors/TwitterAPIExchange.php');

/** Set access tokens here - see: https://dev.twitter.com/apps/ **/
$TwitterSettings = array(
    'oauth_access_token' => $TwitterAccessToken,
    'oauth_access_token_secret' => $TwitterAccessTokenSecret,
    'consumer_key' => $TwitterConsumerKey,
    'consumer_secret' => $TwitterConsumerSecret
);
$twitter = new TwitterAPIExchange($TwitterSettings);
$tweet = json_decode($twitter->setGetfield('q='.$TwitterWordFinder.'&result_type=mixed')->buildOauth('https://api.twitter.com/1.1/search/tweets.json', 'GET')->performRequest());

?>
<div class="col-12">
    <div class="btn btn-primary" role="alert">
      <a href="https://twitter.com/<?php echo $tweet->statuses[0]->user->screen_name; ?>/status/<?php echo $tweet->statuses[0]->id; ?>" target="_blank" style="color: rgba(255, 255, 255, 1); text-decoration: none">Use the hashtag #<?php echo $TwitterWordFinder; ?> on <i class="fa fa-twitter-square" aria-hidden="true"></i> to show here <i class="fa fa-angle-right" aria-hidden="true"></i> <span class="bg-light" style="color: #000000">@<?php echo $tweet->statuses[0]->user->screen_name; ?></span> <?php echo $tweet->statuses[0]->text;?></a>
    </div>
</div>
</div>