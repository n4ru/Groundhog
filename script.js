var payload = '<div class="z"><a href="about:blank"><b>1 Comment</b></a></div>';

payload += '<div class="commentsBox"> <div class="comment"> <p class="commentAuthor">Gordon</p><p class="commentContent">foobar hello world.</p></div><div class="comment"> <p class="commentAuthor">Gordon</p><p class="commentContent">foobar hello world.</p></div><div class="comment"> <p class="commentAuthor">Gordon</p><p class="commentContent">foobar hello world.</p></div><div class="commentForm"> <input> <button>Submit</button> </div></div>';

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

function injectPayload() {
	$('.rc').on('mouseenter', function(event) {
	})
	$('.rc').on('mouseleave', function(event) {
	})

}