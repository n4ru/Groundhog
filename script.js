var host = 'https://ghog.herokuapp.com'; // Bind to new search
/*
var querycomments = '<div class="querycomments"> <div class="comment"> <p class="commentAuthor">Gordon</p><p class="commentContent">foobar hello world.</p></div><div class="comment"> <p class="commentAuthor">Gordon</p><p class="commentContent">foobar hello world.</p></div><div class="commentForm"> <input> <button>Submit</button> </div>';
var featuredresults = '<div class="comment"> <p class="commentAuthor">Gordon</p><p class="commentContent">foobar hello world.</p></div><div class="comment"> <p class="commentAuthor">Gordon</p><p class="commentContent">foobar hello world.</p></div><div class="commentForm"> <input> <button>Submit</button> </div></div>';
*/
var upanddown = '<div> <div class="up"> <img style="height: 20px;" src="http://i.imgur.com/fI5pgx8.png"> <div class="down"> <br> <img style="height: 20px;" src="http://i.imgur.com/Oh4jt7R.png"> </div> </div>';


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
		$.get(host + '/api/comments?filter=%7B%22where%22%3A%7B%22query%22%3A%22' + query + '%22%2C%20%22resulturl%22%20%3A%20%22%22%7D%7D', cb)
	} else { // Get commments for the query AND resulturl
		$.get(host + '/api/comments?filter=%7B%22where%22%3A%7B%22query%22%3A%22' + query + '%22%2C%22resultUrl%22%3A%22' + resulturl + '%22%7D%7D', cb)
	}
}

function SubmitThisShit(context, thisrc, thisbox) {
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
		$('.z', thisrc).remove();
		grabComments($("#lst-ib").val(), $('._Rm', thisrc).text(), function(comments) {
			commentBox = '<div class="z"><a href="#"><b>' + comments.length + ' Comment(s)</b></a><div class="commentsBox">'
			comments.forEach(function(comment) {
				commentBox += '<p class="commentContent">' + comment["text"] + '</p>'
			})
			commentBoxEnd = commentBox + '<div class="commentForm"> <input> <button class="submitComment">Submit</button></div></div></div></div>';
			$(thisrc).append(commentBoxEnd);
			var button = $('.submitComment', thisrc);
			$('.commentsBox', thisrc).append("<div id='commented'></br>Comment Submitted</div>").slideDown(0);
			godFuckingDamnit(button, thisrc, commentBox);
		})
	});
}

function godFuckingDamnit(context, thisrc, thisbox) {
	$(context).click(function(e) {
		SubmitThisShit(context, thisrc, thisbox);
	})

	$(document).keyup(function(e) {
		if ($(context).siblings("input:focus").length === 1 && (e.keyCode === 13)) {
			SubmitThisShit(context, thisrc, thisbox);
		}
	})

}

function injectPayload() {
	len = $('.rc').length;
	$('.rc').each(function(i, e) {
		var self = this;
		grabComments($("#lst-ib").val(), $('._Rm', this).text(), function(comments) {
			commentBox = '<div class="z"><a href="#"><b>' + comments.length + ' Comment(s)</b></a><div class="commentsBox">'
			comments.forEach(function(comment) {
				commentBox += '<p class="commentContent">' + comment["text"] + '</p>'
			})
			commentBoxEnd = commentBox + '<div class="commentForm"> <input> <button class="submitComment">Submit</button></div></div></div></div>';
			$(self).append(commentBoxEnd);
			var button = $('.submitComment', self);
			godFuckingDamnit(button, self, commentBox);
		})
	});
	$('.rc').on('mouseenter', function(event) {
		if (typeof commentTimeout !== "undefined") {
			closeComments(self);
		}
		commentsOpen = 1;
		if (commentsOpen) {
			$('.commentsBox', this).stop(true, true).slideDown();
		}
	});

	$('.rc').on('mouseleave', function(event) {
			self = this;
			closeComments(self)
		})
		//injectquerycomments()
	injectupanddown()
}

function injectquerycomments() {
	$('#appbar').append(querycomments + featuredresults);
	$('#rhs_block').css("display", "none");
	console.log($('#rhs_block'))
}

function injectupanddown() {
	$('.rc').append(upanddown);
}


$('.down').click(function() {
	$(this).css('color', 'orange');
});