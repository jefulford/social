var user = {
	userImage: "friend-image.png",
	name: "User",
	username: "user",
	password: "123456"
}

//LOG-IN

$("#username-input").on("keypress", function(e){
	if(e.which == "13"){
		logIn();
	} else {

	}
});
$("#password-input").on("keypress", function(e){
	if(e.which == "13"){
		logIn();
	} else {

	}
});
$("#submit-log-in").on("click", function(){
	logIn();
});

function logIn(){
	if($("#username-input").val() == user.username && $("#password-input").val() == user.password){
		console.log('yay!');
		new Howl({
			urls: ['assets/sounds/wipe.mp3']
		}).play();
		$("#log-in-pane").fadeOut(500, function(){
			$(this).addClass("hidden");
			$("#content").fadeIn(500).removeClass("hidden");
			$("#username-input").val("");
			$("#external-post").fadeIn(500).removeClass("hidden");
		});

	} else {
		console.log('nope!');
		$("#username-input").val("");
		new Howl({
			urls: ['assets/sounds/splits.mp3']
		}).play();

	}
}



//when USER-IMAGE is clicked
$("#user-image").on("click", function(){
	clearAll();
	$("#user-pane").removeClass("hidden");
	$("#user-pane ul").append("<li><img src='" + user.userImage + "'> " + user.name + "</li><li>Username: " + user.username + "</li><li class='go-to-settings' onclick='settings();'>Go to Settings</li>");
});

function clearUserImage(){
	$("#user-pane ul").text("");
}

function changeTitle(text){
	$("#central-pane-title").text(text);
}

function loadFeed(){
	for(var i = 0; i < posts.length; i++){
		if(posts[i].published == false){
			if(posts[i].draft == false){
 				$("#feed-pane ul").prepend("<li class='a-post'><p style='margin: 0px;'>" + posts[i].content + "</p><span style='margin: 12px 0px' class='post-author'>" + posts[i].author + "</span></li>");
				posts[i].published = "true";
			} else {

			}
		} else {

		}
	}
}

var refreshIntervalID = null;


//when FEED is clicked
$("#feed").on("click", function(){
	clearAll();
	$("#feed-pane").removeClass("hidden");
	refreshIntervalID = setInterval(loadFeed, 100);
});

function clearAll(){
	$("#feed-pane").addClass("hidden");
	$("#friends-pane").addClass("hidden");
	$("#drafts-pane").addClass("hidden");
	$("#settings-pane").addClass("hidden");
	$("#user-pane").addClass("hidden");
	clearUserImage();
}
//when FRIENDS is clicked

var users = [{
		userImage: "friend-image.png",
		name: "John Doe",
		username: "johndoe",
		isFriend: true,
		onView: false


	},{
		userImage: "friend-image.png",
		name: "Jane Doe",
		username: "janedoe",
		isFriend: true,
		onView: false

	}
]


$("#friends").on("click", function(){
	clearAll();
	$("#friends-pane").removeClass("hidden")
	for(var k = 0; k < users.length; k++){
		if(users[k].onView == false) {
			if(users[k].isFriend == true){
				$("#friends-pane ul").prepend("<li class='friend'><img src='" + users[k].userImage + "'> " +  users[k].name + "</li>");
				users[k].onView = true;
			} else {}
		} else {}
	}
});

function clearFriends(){
	for(var l = 0; l < users.length; l++){
		users[l].onView = false;
	}
	$("#friends-pane-ul").text("");
}

//when DRAFTS is clicked
function displayDrafts(){
	for(var m = 0; m < posts.length; m++){
		if(posts[m].draftView == false){
			if(posts[m].draft == true){
				$("#drafts-pane ul").prepend("<li class='display-draft'>" + posts[m].content + "</li>");
				posts[m].draftView = true;
			} else {

			}
		} else {

		}
	}
}

$("#drafts").on("click", function(){
	clearAll();
	$("#drafts-pane").removeClass("hidden");
	setInterval(displayDrafts, 100);
});

//when SETTINGS is clicked
$("#settings").on("click", function(){
	settings();
});

function settings(){
	clearAll();
	$("#settings-pane").removeClass("hidden");
	$("#update-settings").on("click", function(){
		//user.userImage = $("#change-userImage").val();
		user.name = $("#change-name").val();
		spawnNotification("Updated settings!");
	});
}



function clearSettings(){
	$("#settings-pane").addClass("hidden");
	$("#central-pane-title").text("");
}

//when POST is clicked

var posts = [ //published and draftView supposed to be 'false'
	{title: "sample draft", content: "This is a sample draft post.", author: 'John Doe', draft: true, published: false, draftView: false},
	{title: "sample post", content: "This is a sample published post!", author: 'Jane Doe', draft: false, published: false, draftView: false}
]

$("#post").on("click", function(){
	$("#post-pop-up").fadeToggle(100);
	$(this).css("color", "var(--hover)");
});

$("#close-post-pop-up").on("click", function(){
	$("#post-pop-up").fadeOut(100);
	$("#post").css("color", "var(--accent)");
})

$("#delete-post").on("click", function(){
	console.log("clicked delete!");
	$("#post-input").val("");
	spawnNotification("Deleted draft!");
	$("#post-pop-up").fadeOut(500);
}); //DELETE A POST

$("#save-post").on("click", function(){
	savePost("draft", "user", true, "Saved draft!");
}); //SAVE A POST

function savePost(postTitle, postAuthor, isDraft, message){
	if($("#post-input").val() == ""){
		$("#post-input").css("box-shadow", "0px 0px 8px rgb(240, 20, 10");
		$("#post-input").attr("placeholder", "Need content to post!");
	} else {
		posts.push({title: postTitle, content: $("#post-input").val(), author: postAuthor, draft: isDraft, published: false, draftView: false});
		spawnNotification(message);
		$("#post-pop-up").fadeOut(500);
		$("#post-input").val("");
		$("#post-input").css("box-shadow", "none");
		$("#post-input").attr("placeholder", "Your post...");
	}
}

$("#submit-post").on("click", function(){
	savePost("publishedPost", user.name, false, "Published post!");
	$("#post-input").val("");
})


// NOTIFCATIONS

function spawnNotification(message) {
	new Howl({
			urls: ['assets/sounds/prism-2.mp3']
		}).play();
	$("#notification").append("<li class='single-notification'>" + message + "</li>").fadeIn(200, function(){
		$(this).delay(1000).fadeOut(1000, function(){
			$(".single-notification").remove();
		});
	})
}

//CHANGE COLOR SCHEME


function changeColorScheme(primary, secondary, tertiary, accent, hover){
	document.documentElement.style.setProperty('--primary', primary);
	document.documentElement.style.setProperty('--secondary', secondary);
	document.documentElement.style.setProperty('--tertiary', tertiary);
	document.documentElement.style.setProperty('--accent', accent);
	document.documentElement.style.setProperty('--hover', hover);

}

function toYellow(){
	changeColorScheme('white', '#FFF4B1', '#7F763B', '#CCC38E', '#FFED80');
}
function toBlue(){
	changeColorScheme('#E6F5F7', '#8AC4BF', '#004843', '#51BFB5', '#11625B'); //fixed color scheme
}
function toRed(){
	changeColorScheme('#CC5D4D', '#FFA497', '#7F524B', '#FF7561', '#FF4227');
}
function toPurple(){
	changeColorScheme('#B485BF', '#78597F', '#3C2C40', '#F1B1FF', '#D9A0E5');
}
function toGreen(){
	changeColorScheme('#6ABD5E', '#487F40', '#244020', '#81E572', '#90FF7F');
}
function toOrange(){
	changeColorScheme('#FFF8C1', '#EDCF90', '#AA4520', '#C77645', '#C56D3D');
}
function toNormal(){
	changeColorScheme('#FFF5F8', '#CCC4C6', '#7F7A7C', '#FF7A7C', '#FF494B'); //don't change!
}
function swatchSelected(swatch){
	$(swatch).toggleClass("border-selected");
}

$(".swatch-yellow").on("click", function(){
	removeAllSwatchSelected();
	toYellow();
	swatchSelected(".swatch-yellow");
});
$(".swatch-blue").on("click", function(){
	removeAllSwatchSelected();
	toBlue();
	swatchSelected(".swatch-blue");
});
$(".swatch-red").on("click", function(){
	removeAllSwatchSelected();
	toRed();
	swatchSelected(".swatch-red");
});
$(".swatch-purple").on("click", function(){
	removeAllSwatchSelected();
	toPurple();
	swatchSelected(".swatch-purple");
});
$(".swatch-green").on("click", function(){
	removeAllSwatchSelected();
	toGreen();
	swatchSelected(".swatch-green");
});
$(".swatch-orange").on("click", function(){
	removeAllSwatchSelected();
	toOrange();
	swatchSelected(".swatch-orange");
});
$(".swatch-normal").on("click", function(){
	removeAllSwatchSelected();
	toNormal();
	swatchSelected(".swatch-normal");
});
function removeAllSwatchSelected(){
	$(".swatch").removeClass("border-selected");
}

//changeColorScheme('#pri', '#sec', '#ter', '#acc', '#hov');

$("#external-post").on("click", function(){
	posts.push({title: "external post", content: 'This is a post by John Doe!', author: 'John Doe', draft: false, published: false, draftView: false});
	spawnNotification('New post!');
})
