/* Initialize all functions */
var someColors = ["", "", "", "", "", "", "", "", "", "", "", ""];


$(document).ready(function(){


	
});



/* Social Sharing Custom by Deepak Kamat */
$(document).ready(function(){

  $('.share-btns-custom').each(function(){

    var title, url, media;

    // Get the title
    if ( $(this).parent().parent('.post').find('.post-title').length > 0 ) {
      title = $(this).parent().parent('.post').find('.post-title').text().trim();
    }

    else {
      title = document.title;
    }


    // Get the URL
    if ( $(this).parent().parent('.post').find('.post-title').children('a').length > 0 ) {
      url = $(this).parent().parent('.post').find('.post-title').children('a').attr('href');
    }

    else if ( $('link[rel=canonical]').attr('href') ) {
      url = $('link[rel=canonical]').attr('href');
    }

    else {
      url = window.location.href;
    }
    

    // Get the image
    if ( $(this).parent().parent('.post').find('.image-thumbnail a img').length > 0 ) {
      media = $(this).parent().parent('.post').find('.image-thumbnail a img').attr('src');
    }

    else if ( $(this).parent().parent('.post').find('.post-body').find('img') ) {
      media = $(this).parent().parent('.post').find('.post-body').find('img');
      media = $(media[0]).attr('src');
    }

    else {
      media = undefined;
    }


    // Now build the links
    var fbLink = "http://www.facebook.com/share.php?u=" + url + "&title=" + encodeURIComponent(title) + "";
    var twLink = "http://twitter.com/home?status=" + encodeURIComponent(title) + "+" + url + "";
    var gpLink = "https://plus.google.com/share?url=" + url + "";
    var pnLink = "http://pinterest.com/pin/create/bookmarklet/?media=" + media + "&url="+ url +"&is_video=false&description=" + encodeURIComponent(title) + "";

    console.log(fbLink);

    $(this).find('.sc-pill.fb-pill a').attr('href', fbLink);
    $(this).find('.sc-pill.tw-pill a').attr('href', twLink);
    $(this).find('.sc-pill.gp-pill a').attr('href', gpLink);
    $(this).find('.sc-pill.pn-pill a').attr('href', pnLink);

  });

  $('.share-btns-custom .sc-pill a').on('click', function(e){
      var oTop = Math.round((($(this).offset().top - window.pageYOffset) / 2));
      var oLeft = Math.round((($(this).offset().left - window.pageXOffset) / 2));

        window.open(
            $(this).attr('href'),
            "_blank",
            "toolbar=yes, scrollbars=yes, resizable=yes, top="+ oTop +", left="+ oLeft +", width=600, height=380"
        );

      e.preventDefault();
  });

  // If a search page then fill the search box's query field with the query
    if (QueryString.q !== undefined) {
      var qString = urlplustoplus(QueryString.q);
      $('.search-query-input').val(qString);

      // Add the Search Form Below The Status Message
      var search_Form_html = '<form class="search-box" action="/search" id="search_in_page" method="get"><input class="search-query-input" name="q" placeholder="Search the blog.." value="'+ qString +'" type="text"><button type="submit" class="submit-btn-form">Search</button></form>'
      $('.status-msg-wrap').before(search_Form_html);

      // Number of posts found
      var postsFoundCount = $('.post').length;
      var postFoundMessage = "";
    }

});


/* Smooth Scrolling */
$(function() {
  $('a[href*=#]:not([href=#])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html,body').animate({
          scrollTop: target.offset().top
        }, 1000);
        return false;
      }
    }
  });
});


// Random integer
function randInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


// Object Size
Object.size = function(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    
    return size;
};


// Retrieve the URL Parameters
var QueryString = function () {
  var query_string = {};
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i=0;i<vars.length;i++) {
    var pair = vars[i].split("=");
        // If first entry with this name
    if (typeof query_string[pair[0]] === "undefined") {
      query_string[pair[0]] = pair[1];
        // If second entry with this name
    } else if (typeof query_string[pair[0]] === "string") {
      var arr = [ query_string[pair[0]], pair[1] ];
      query_string[pair[0]] = arr;
        // If third or later entry with this name
    } else {
      query_string[pair[0]].push(pair[1]);
    }
  } 
    return query_string;
} ();

function urlplustoplus(str) {
  var newStr = str.replace('+', ' ');;
  newStr = decodeURIComponent(newStr);
  return newStr;
}




