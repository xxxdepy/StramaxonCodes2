
/*

Current Post
http://rempixels.blogspot.com/feeds/posts/summary/6817122913899451808?alt=json

POST BY CATEGORY
http://rempixels.blogspot.com/feeds/posts/summary/-/code?max-results=0&alt=json

*/


// Store the Post ID
var _postId = $('meta[itemprop="postId"]').attr('content').trim();
var _labels = [];
var numberOfLinks = 6;

var related_posts = {};
var __n = 0;


// First Get the blog post's labels
$('.entry-label').each(function(e){
	_labels.push($(this).text().trim());
});


var forEachLabel = 0;
if (_labels.length >= 3) {
	forEachLabel = numberOfLinks / 3;
}

else {
	forEachLabel = numberOfLinks / _labels.length;
} 


// Now make the Request
$.ajax({
    url:"http://rempixels.blogspot.com/feeds/posts/summary?max-results=20&alt=json",  
    dataType:"jsonp",
    success:function(data) {
      getRelatedPosts(data);
    }
});


function outputRelatedPosts(postList, outputId) {
	var listItems = "";
	for (var i = 0; i < Object.size(related_posts); i++) {
		listItems += "<li class='related-post-item'><a href='" + related_posts[i].url + "' title='" + related_posts[i].title + "'>" + related_posts[i].title + "</a></li>";
	}
	
	$(outputId).html(listItems);
}

function getRelatedPosts(data) {
	var _inc = 0;
	var num_entries = data.feed.entry.length;

	// If Feed has more post than we need
    if (num_entries > numberOfLinks) {
		for ( i = 0; i < numberOfLinks ; i++ ) {
			var checkLabel = randInt(1, _labels.length) - 1;
			if ( postHasLabel(data.feed.entry[i]), _labels[checkLabel] ) {

				var thisPostId = data.feed.entry[i].id.$t.split('-'); thisPostId = thisPostId[thisPostId.length - 1];

				if ( thisPostId !== _postId ) { // if isn't the same post
				  related_posts[_inc] = relatedPostObject( data.feed.entry[i] );
				  _inc += 1;
				}

				else {
					continue;
				}
			}

			else {
				continue;
			}
		}
	}

	else if (num_entries < numberOfLinks) {
		for ( i = 0; i < num_entries ; i++ ) {
			
			var thisPostId = data.feed.entry[i].id.$t.split('-'); thisPostId = thisPostId[thisPostId.length - 1];

		    if ( thisPostId !== _postId ) { // if isn't the same post
			  related_posts[_inc] = relatedPostObject( data.feed.entry[i] );
			  _inc += 1;
	     	}

	     	else {
	     		continue;
	     	}

		}
	}

	// Now finally output it
	$("#relatedPost01").parent('.related-posts-container').fadeIn();
	outputRelatedPosts(related_posts, "#relatedPost01");
}


function postHasLabel(feedEntry, searchValue) {
	for ( var i = 0; i < feedEntry.category.length; i++ ) {
		if (feedEntry.category[i].term == searchValue) {
			return true;
		}
	}

	return false;
}
function relatedPostObject(feedEntry) {

	// Check if image is available 
	var img = "not-available";
	if (feedEntry.media$thumbnail !== undefined) {
		img = feedEntry.media$thumbnail.url;
	}

	var __obj = {
		'title': feedEntry.title.$t,
		'summary': feedEntry.summary.$t,
		'url': feedEntry.link[4].href,
		'thumbnail' : img
	};

	return __obj;
}



