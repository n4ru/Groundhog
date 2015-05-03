var payload = '<div class="z"><a href="about:blank"><b>1 Comment</b></a></div>';

payload += '<div class="commentsBox"> <div class="comment"> <p class="commentAuthor">Gordon</p><p class="commentContent">foobar hello world.</p></div><div class="comment"> <p class="commentAuthor">Gordon</p><p class="commentContent">foobar hello world.</p></div><div class="comment"> <p class="commentAuthor">Gordon</p><p class="commentContent">foobar hello world.</p></div><div class="commentForm"> <input> <button class="submitComment">Submit</button> </div></div>';

var host = 'https://ghog.herokuapp.com';

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
			$('.commentsBox', this).stop(true, true).slideDown(300);
		}
	})
	$('.rc').on('mouseleave', function(event) {
		self = this;
		//commentTimeout = setTimeout(function() {
			closeComments(self)
		//}, 1000)
	})

  $('.submitComment').click(function(e) {
    var text = $(this).siblings('input').val();
    
    $.post(host + '/api/comments', {
      text: text,
      vote: 0,
      authorName: 'gordon',
      query: $("#lst-ib").val(),
      resultUrl: $(this).parents('.rc').find('.r > a').attr('href')

    }, function(data) {
      console.dir(data);
    });
  });
}