var payload = '<div class="z"><a href="about:blank"><b>1 Comment</b></a></div>';

payload += '<div class="commentsBox"> <div class="comment"> <p class="commentAuthor">Gordon</p><p class="commentContent">foobar hello world.</p></div><div class="comment"> <p class="commentAuthor">Gordon</p><p class="commentContent">foobar hello world.</p></div><div class="comment"> <p class="commentAuthor">Gordon</p><p class="commentContent">foobar hello world. <span style="font-size: 200%;"> <a href="google.com"> &#8593; </p> </span> </div><div class="commentForm"> <input> <button>Submit</button> </div></div>';

var querycomments = '<div class="querycomments"> <div class="comment"> <p class="commentAuthor">Gordon</p><p class="commentContent">foobar hello world.</p></div><div class="comment"> <p class="commentAuthor">Gordon</p><p class="commentContent">foobar hello world.</p></div><div class="commentForm"> <input> <button>Submit</button> </div>';
var featuredresults = '<div class="comment"> <p class="commentAuthor">Gordon</p><p class="commentContent">foobar hello world.</p></div><div class="comment"> <p class="commentAuthor">Gordon</p><p class="commentContent">foobar hello world.</p></div><div class="commentForm"> <input> <button>Submit</button> </div></div>';

var upanddown = '<div> <div class="up"> <img style="height: 20px;" src="http://i.imgur.com/fI5pgx8.png"> <div class="down"> <br> <div class="score"> 5 </div> <img style="height: 20px;" src="http://i.imgur.com/Oh4jt7R.png"> </div> </div>';


// Bind to new search
console.log("We're loaded")
$(".lsb").on('click', function() {
	console.log("You clicked the search button")
});

$(document).keypress(function(e) {
	if (e.which == 13) {
		alert('You pressed enter!');
	}
});

$(document).ready(injectPayload);

// Add shit to each result.	
$(document).on('DOMNodeInserted', function(event) {
	if (event.target.innerHTML.indexOf('Search Results') === 23) { // Find a faster way of finding this element.
		$('.z').remove();
		injectPayload();
	}
});

function closeComments(thebox) {
	commentsOpen = 0;
	$('.commentsBox', thebox).stop(true, true).slideUp(300);
}

function injectPayload() {
	$('.rc').append(payload);
	$('.rc').on('mouseenter', function(event) {
		if (typeof commentTimeout !== "undefined") {
			closeComments(self);
			//clearTimeout(commentTimeout)
		}
		commentsOpen = 1;
		if (commentsOpen) {
			$('.commentsBox', this).stop(true, true).slideDown();
		}
	})
	$('.rc').on('mouseleave', function(event) {
		self = this;
		//commentTimeout = setTimeout(function() {
			closeComments(self)
		//}, 1000)
	})
    injectquerycomments()
    injectupanddown()
}

function injectquerycomments() {
    $('#appbar').append(querycomments+featuredresults);
    $('#rhs_block').css("display", "none");
    console.log($('#rhs_block'))
}

function injectupanddown () {
	$('.rc').append(upanddown);
}


$(function() {  
$('.down').click(function(){
    $(this).css('color', 'orange');
  });
});