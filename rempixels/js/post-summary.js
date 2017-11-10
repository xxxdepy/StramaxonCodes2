
var psum = {
	'chars': 250,
	'continueText': 'Read'
};

function postSummarize() {

$('.post').each(function() {

	/* Content */
	var content = $(this).children('.post-body').text();
	var finalcontent = "";
	var postUrl = $(this).find('.post-title').children('a').attr('href');
	var postTitle = $(this).find('.post-title').text();


	// Get the video
	var video;

	// Check for HTTPS first
	if ($(this).find("iframe[src*='https://www.youtube.com']").length > 0) {
		video = $(this).find("iframe[src*='https://www.youtube.com']")[0];
		test1 = video;
	}

	else if ($(this).find("iframe[src*='http://www.youtube.com']").length > 0) {
		video = $(this).find("iframe[src*='http://www.youtube.com']")[0];
	}

	else if ($(this).find("iframe[src*='https://player.vimeo.com']").length > 0) {
		video = $(this).find("iframe[src*='https://player.vimeo.com']")[0];
	}



	var allowBr = false;

	for (i = 0; i < psum.chars; i++) {

		if (content[i] !== "\n") {
			allowBr = true;
		}

		if (psum.chars <= content.length) {
		    if (content[i] === "\n") {
		    	if (allowBr) {
		    	    if (content[i-2] !== "\n") {
			            finalcontent += "<br>";
			        }
			    }
		    }
		    else {
			    finalcontent += content[i];
			    if (i === psum.chars - 1) {
			        finalcontent += "<span class='ellipsis-text'>...</span>";
		        }

		    }
	    }

	    else if (psum.chars >= content.length) {
	    	if (content[i] === "\n") {
		    	if (allowBr) {
		    	    if (content[i-2] !== "\n") {
			            finalcontent += "<br>";
			        }
			    }
		    }
		    else {
			    if (content[i] !== undefined) {
			    	finalcontent += content[i];
			    }

			    if (content.length === i) {
			        finalcontent += "<span class='ellipsis-text'>...</span>";
			        break;
		        }
		    }
	    }
	}
    
    /* Image */
    var imgNotAvailable;
    var imgUrl;
    var imgArr = $(this).children('.post-body').find('img');

    if (imgArr.length > 0 ) {
    	imgUrl = imgArr[0].src;
    	imgNotAvailable = 0;
    }
    else {
    	imgUrl = psum.defaultImg;
    	imgNotAvailable = 1;
    }


    // Append the stuff now!
    if (video !== undefined) {
    	console.log((($(video)[0]).outerHTML));
    	var pstStuff = "<div class='post-summary'> <div class='video-preview'>"+ (($(video)[0]).outerHTML) +"</div>  <div class='post-excerpt'><div class='post-excerpt-content'>"+finalcontent+"</div><div class='read-more-link'><a href='"+postUrl+"' title='Continue reading: "+postTitle+"'>"+psum.continueText+"  <i class='fa fa-fw fa-long-arrow-right'></i> </a></div></div><div class='clear'></div></div>";
    }

    else if (imgNotAvailable) {
    	var pstStuff = "<div class='post-summary'><div class='post-excerpt'><div class='post-excerpt-content'>"+finalcontent+"</div><div class='read-more-link'><a href='"+postUrl+"' title='Continue reading: "+postTitle+"'>"+psum.continueText+"  <i class='fa fa-fw fa-long-arrow-right'></i> </a></div></div><div class='clear'></div></div>";
    }

    else {
        if ($(imgArr[0]).width() > 703 ) {
            var pstStuff = "<div class='post-summary with-thumbnail'><div class='image-thumbnail w703'><a href='"+postUrl+"'><img src='"+imgUrl+"'/></a></div><div class='post-excerpt'><div class='post-excerpt-content'>"+finalcontent+"</div><div class='read-more-link'><a href='"+postUrl+"' title='Continue reading: "+postTitle+"'>"+psum.continueText+"  <i class='fa fa-fw fa-long-arrow-right'></i> </a></div></div><div class='clear'></div></div>";
        }
        else if ($(imgArr[0]).width() < 703 ) {
            var pstStuff = "<div class='post-summary with-thumbnail'><div class='image-thumbnail wLess fl'><a href='"+postUrl+"'><img src='"+imgUrl+"'/></a></div><div class='post-excerpt'><div class='post-excerpt-content'>"+finalcontent+"</div><div class='read-more-link'><a href='"+postUrl+"' title='Continue reading: "+postTitle+"'>"+psum.continueText+" <i class='fa fa-fw fa-long-arrow-right'></i> </a></div></div><div class='clear'></div></div>";
        }
    }

    $(this).children('.post-body').addClass('summarized_post').html(pstStuff);

});
}


/*

Default thumbnails based on topic of the blog post.

*/



$(document).ready(function(){
    postSummarize();
    
});



