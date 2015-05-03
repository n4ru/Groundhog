var comments_skeleton = '<div class="z"><a href="about:blank"><b>1 Comment</b></a></div>';

comments_skeleton += '<div class="commentsBox"> <div class="comment"><p class="commentContent">foobar hello world.</p></div><div class="comment"> <p class="commentContent">foobar hello world.</p></div><div class="comment"><p class="commentContent">foobar hello world.</p></div></div>';

comments_submit = '<div class="commentForm"> <input> <button class="submitComment">Submit</button></div>'

var querycomments = '<div class="querycomments"> <div class="comment"> <p class="commentAuthor">Gordon</p><p class="commentContent">foobar hello world.</p></div><div class="comment"> <p class="commentAuthor">Gordon</p><p class="commentContent">foobar hello world.</p></div><div class="commentForm"> <input> <button>Submit</button> </div>';
var featuredresults = '<div class="comment"> <p class="commentAuthor">Gordon</p><p class="commentContent">foobar hello world.</p></div><div class="comment"> <p class="commentAuthor">Gordon</p><p class="commentContent">foobar hello world.</p></div><div class="commentForm"> <input> <button>Submit</button> </div></div>';

var host = 'https://ghog.herokuapp.com'; // Bind to new search
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

function grabComments(query, resulturl, cb) {
	if (!resulturl) { // Get comments for the query
		console.log("Made a request without a URL")
		$.get(host + '/api/comments?filter=%7B%22where%22%3A%7B%22query%22%3A%22' + query + '%22%2C%20%22resulturl%22%20%3A%20%22%22%7D%7D', cb)
	} else { // Get commments for the query AND resulturl
		console.log("Made a request with a URL")
		console.log(host + '/api/comments?filter=%7B%22where%22%3A%7B%22query%22%3A%22' + query + '%22%2C%20%22' + resulturl + '%22%20%3A%20%22%22%7D%7D')
		$.get(host + '/api/comments?filter=%7B%22where%22%3A%7B%22query%22%3A%22' + query + '%22%2C%22resultUrl%22%3A%22' + resulturl + '%22%7D%7D', cb)
	}
}

function godFuckingDamnit(context, thisrc) {
	$(context).click(function(e) {
		var text = $(context).siblings('input').val();
		self = this;
		$.post(host + '/api/comments', {
			text: text,
			vote: 0,
			authorName: 'gordon',
			query: $("#lst-ib").val(),
			resultUrl: $('._Rm', thisrc).text()
		}, function(data) {
			$('#commented').remove();
			$(self).parent('.commentForm').append("<div id='commented'></br>Comment Submitted</div>")
		});
	})
}

function injectPayload() {
	len = $('.rc').length;
	$('.rc').each(function(i, e) {
		var self = this;
		grabComments($("#lst-ib").val(), $('._Rm', this).text(), function(comments) {
			console.log(comments)
			commentBox = '<div class="z"><a href="about:blank"><b>1 Comment</b></a></div><div class="commentsBox">'
			comments.forEach(function(comment) {
				commentBox += '<p class="commentContent">' + comment["text"] + '</p>'
			})
			commentBox += '<div class="commentForm"> <input> <button class="submitComment">Submit</button></div></div></div>'
			$(self).append(commentBox);
			var button = $('.submitComment', self);
			godFuckingDamnit(button, self);
		})
	});
	$('.rc').on('mouseenter', function(event) {
		if (typeof commentTimeout !== "undefined") {
			closeComments(self);
		}
		commentsOpen = 1;
		if (commentsOpen) {
			$('.commentsBox', this).stop(true, true).slideDown(300);
		}
	});

	$('.rc').on('mouseleave', function(event) {
		self = this;
<<<<<<< HEAD
		closeComments(self)
	})

}
=======
		//commentTimeout = setTimeout(function() {
		closeComments(self);
			//}, 1000)
	});

	$('.submitComment').click(function(e) {
		var text = $(this).siblings('input').val();
		self = this;

		$.post(host + '/api/comments', {
			text: text,
			vote: 0,
			authorName: 'gordon',
			query: $("#lst-ib").val(),
			resultUrl: $(this).parents('.rc').find('.r > a').attr('href')
		}, function(data) {
			$('#commented').remove();
			$(self).parent('.commentForm').append("<div id='commented'></br>Comment Submitted</div>");
			console.dir(data);
		});
  });
};
>>>>>>> origin/master

function injectquerycomments() {
	//$('#appbar').append(querycomments);
}