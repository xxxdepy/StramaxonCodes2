/************************************************
Couch Mode Plugin developed by Deepak Kamat.

http://stramaxon.com
************************************************/

/* Couch Mode -- PREMIUM */
var couchModefontLoaded = false;
var couch_anim = {
  show: 'fadeInUp',
  hide: 'fadeOutDown'
};

// Load CouchMode automatically
$(document).ready(function(){
  var couchModeInHash = window.location.hash == "#couch";

  if (couchModeInHash) {
    couchMode();
  }
  else {
    // Nothing to do!
  }

});

function removeCouch() {
	// Remove any existing couch box.
	$('#couchBox').removeClass(couch_anim.show).addClass(couch_anim.hide);
  
  setTimeout(function() {
    $('#couchBox').hide();
  }, 400);

  // Remove Scroll Class
  scrollClass(false);

  window.location.hash = "";
}

function showCouch() {
  $('#couchBox').removeClass(couch_anim.hide).addClass(couch_anim.show);

  setTimeout(function() {
    $('#couchBox').show();
  }, 400);

  // Add Scroll Class
  scrollClass(true);

  // Add hash #couch to address
  window.location.hash = "couch";
}

function couchMode() {

	// Load Font
	loadCouchFont();

  // Remove on escp
  $(document).on('keydown', function(e){
    if (e.which == 27 && $('#couchBox').length > 0) {
      removeCouch();
    }
  });


	if ($('#couchBox').length > 0) {
	    showCouch();
      return true; 
  }


	if ($('.post-outer').length > 1 || $('.post-outer').length < 1) {
		if ($('.post-outer').length > 1) {
			console.warn('Couch mode can not be accessed on pages without at least one post.');
		}
		else if ($('.post-outer').length > 1) {
			console.warn('Couch mode can not be accessed on pages with more than one post.');
		}

		return false;
	}

	var $currentPost = $('.item--single');
	var post = {
		title: $currentPost.find('.post-title').text().trim(),
		url: $('link[rel=canonical]').attr('href'),
		date: $('.date-header').text().trim(),
		content: $currentPost.find('.post-body').html().trim(),
		author: {
			name: $currentPost.find('.author-name').text().trim(),
			url: $currentPost.find('.author-name').find('a').attr('href')
		}
	};


	var finalContent = "";

	// Now put the content
	var couchModeMarkup = 
	'<section class="couch-container animated '+ couch_anim.show +'" id="couchBox">' +
        '<div class="couch-inner"> <div class="close-btn"><a href="javascript:removeCouch();"><i class="fa fa-times fa-2x"></i></a></div>' +
          '<div class="couch-content">' +
            '<h2 class="entry-title"><a href="'+ post.url +'">'+ post.title +'</a></h2>' +
            '<p class="big-text hidden"></p>' +
            '<div class="entry-details">' +
                '<span class="author">by <a href="'+ post.author.url +'">'+ post.author.name +'</a></span>' +
                '<span class="date">on '+ post.date +'</span></div>' +
            '<div class="entry-content">' +
             post.content
          + '</div>' +
          '</div>' +
        '</div>' +
    '</section>';

    // Add hash #couch to address
    window.location.hash = "couch";

    // Add no_mouse_scroll class to body
    scrollClass(true);

    // Now Add it in the markup
    $('body').prepend(couchModeMarkup);
    return true;
}

function loadCouchFont() {
	if (!couchModefontLoaded) {
         WebFontConfig = {
           google: { families: [ 'Droid+Serif:400,700:latin' ] }
         };
         (function() {
           var wf = document.createElement('script');
           wf.src = ('https:' == document.location.protocol ? 'https' : 'http') +
             '://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
           wf.type = 'text/javascript';
           wf.async = 'true';
           var s = document.getElementsByTagName('script')[0];
           s.parentNode.insertBefore(wf, s);
         })(); 
    }
  couchModefontLoaded = true;
}

function removeHash() {
  var loc = window.location.href,
  index = loc.indexOf('#');

  if (index > 0) {
    window.location = loc.substring(0, index);
  }
}

function scrollClass(cmd) {
  if (cmd) {
    $('body').addClass('no_mouse_scroll');
  }

  else {
    $('body').removeClass('no_mouse_scroll');
  }
}

