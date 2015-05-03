var host = 'https://ghog.herokuapp.com'; // Bind to new search

var querycomments = '<div class="querycomments"> <div class="comment"> <p class="commentAuthor">Gordon</p><p class="commentContent">foobar hello world.</p></div><div class="comment"> <p class="commentAuthor">Gordon</p><p class="commentContent">foobar hello world.</p></div><div class="commentForm"> <input> <button>Submit</button> </div>';
/*
var featuredresults = '<div class="comment"> <p class="commentAuthor">Gordon</p><p class="commentContent">foobar hello world.</p></div><div class="comment"> <p class="commentAuthor">Gordon</p><p class="commentContent">foobar hello world.</p></div><div class="commentForm"> <input> <button>Submit</button> </div></div>';
*/
var upanddown = '<div class="up"> <img style="height: 20px;" src="https://i.imgur.com/fI5pgx8.png"> </div>  <div class="score"> 1 </div> <div class="down"> <img style="height: 20px;" src="https://i.imgur.com/Oh4jt7R.png"> </div>';
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
		$.get(host + '/api/queryComments?filter=%7B%22where%22%3A%7B%22query%22%3A%22' + query + '%22%2C%20%22url%22%20%3A%20%22%22%7D%7D', cb)
	} else { // Get commments for the query AND resulturl
		$.get(host + '/api/resultComments?filter=%7B%22where%22%3A%7B%22query%22%3A%22' + query + '%22%2C%22url%22%3A%22' + escape(resulturl) + '%22%7D%7D', cb)
	}
}

function grabVotes(query, resulturl, cb) {
	//console.log(host + '/api/results?filter=%7B%22where%22%3A%7B%22query%22%3A%22' + query + '%22%2C%22resultUrl%22%3A%22' + escape(resulturl) + '%22%7D%7D')
	$.get(host + '/api/results?filter=%7B%22where%22%3A%7B%22query%22%3A%22' + query + '%22%2C%22url%22%3A%22' + escape(resulturl) + '%22%7D%7D', cb)
		// NO comment support yet
}

function SubmitThisShit(context, thisrc, thisbox) {
	var text = $(context).siblings('input').val();
	self = this;
	//console.log($('.r a', thisrc).attr("href"))
		$.post(host + '/api/resultComments', {
			comment: text,
			vote: 0,
			query: $("#lst-ib").val(),
			timestamp: 0,
			url: $('.r a', thisrc).attr("href")
		}, function(data) {
			$('#commented').remove();
			$('.z', thisrc).remove();
			grabComments($("#lst-ib").val(), $('.r a', thisrc).attr("href"), function(comments) {
				commentBox = '<div class="z"><a href="#"><b>' + comments.length + ' Comment(s)</b></a><div class="commentsBox">'
				comments.forEach(function(comment) {
					commentBox += '<p class="commentContent">• ' + comment["comment"] + '</p>'
				})
				commentBoxEnd = commentBox + '<div class="commentForm"> <input> <button class="submitComment">Submit</button></div></div></div></div>';
				$(thisrc).append(commentBoxEnd);
				var button = $('.submitComment', thisrc);
				$('.commentsBox', thisrc).append("<div id='commented'></br>Comment Submitted</div>").slideDown(0);
				godFuckingDamnit(button, thisrc, commentBox);
			})
		});
}

function voteOnShit(thisrc, direction) {
	self = this;
	if (direction == "up") {
		directionNum = 1
	} else {
		directionNum = -1
	}
	$.post(host + '/api/results/vote', {
		direction: direction,
		query: $("#lst-ib").val(),
		url: $('.r a', thisrc).attr("href")
	}, function(data) {
		newNum = parseInt($('.score', thisrc).text()) + parseInt(directionNum)
		$('.score', thisrc).text(newNum);
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
		grabComments($("#lst-ib").val(), $('.r a', this).attr("href"), function(comments) {
			commentBox = '<div class="z"><a href="#"><b>' + comments.length + ' Comment(s)</b></a><div class="commentsBox">'
			comments.forEach(function(comment) {
				commentBox += '<p class="commentContent"><ul>• ' + comment["comment"] + '</p>'
			})
			commentBoxEnd = commentBox + '<div class="commentForm"> <input> <button class="submitComment">Submit</button></div></div></div></div>';
			$(self).append(commentBoxEnd);
			var button = $('.submitComment', self);
			godFuckingDamnit(button, self, commentBox);
		})
		grabVotes($("#lst-ib").val(), $('.r a', self).attr("href"), function(votes) {
			if (votes.length == 1) {
				$('.score', self).text(votes[0]["vote"]);
			} else {
				$('.score', self).text("0");
			}
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
	injectquerycomments()
	injectupanddown()
}

function injectquerycomments() {
	//$('#appbar').append(querycomments);
	$('#rhs_block').css("display", "none");
	grabComments($("#lst-ib").val(), null, function(comments) {
		commentBox = '<div class="z"><div class="querycomments">Query Comments Thread</br>'
		comments.forEach(function(comment) {
			commentBox += '<p class="commentContent">• ' + comment["comment"] + '</p>'
		})
		commentBoxEnd = commentBox + '<div class="commentForm"> <input> <button class="submitComment">Submit</button></div></div></div></div>';
		$('#appbar').append(commentBoxEnd);
		var button = $('#appbar .submitComment');
		godFuckingDamnit(button, button, commentBox, true);
	})
}

function injectupanddown() {
	$('.rc').append(upanddown);
	$('.down').click(function() {
		voteOnShit($(this).parent(), "down")
	});

	$('.up').click(function() {
		voteOnShit($(this).parent(), "up");
	});
}