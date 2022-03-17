document.querySelector('#hamburgerButton').onclick = function () {
  if (document.querySelector('#clique').style.display !== 'none') {
    document.querySelector('#clique').style.display = 'none'
    document.querySelector('#collapseExample').style.display = 'block'
  } else if (document.querySelector('#clique').style.display === 'none') {
    document.querySelector('#clique').style.display = 'block'
    document.querySelector('#collapseExample').style.display = 'none'
  }
}

document.querySelector('#notificationToggler').onclick = function () {
  if (document.querySelector('#links').style.display !== 'none') {
    document.querySelector('#links').style.display = 'none'
  } else if (document.querySelector('#links').style.display === 'none') {
    document.querySelector('#links').style.display = 'inline-flex'
  }
}

document.querySelector('#openMyCliques').onclick = function () {
  if (document.querySelector('#clique').style.display !== 'none') {
    document.querySelector('#clique').style.display = 'none'
  }
  if (document.querySelector('#collapseExample').style.display !== 'none') {
    document.querySelector('#collapseExample').style.display = 'none'
  }
  if (document.querySelector('#pinnedBets').style.display !== 'none') {
    document.querySelector('#pinnedBets').style.display = 'none'
  }

  document.querySelector('#myCliques').style.display = 'block'
}

document.querySelector('#closeMyCliques').onclick = function () {
  document.querySelector('#myCliques').style.display = 'none'
  document.querySelector('#clique').style.display = 'block'
}

document.querySelector('#openPinnedBets').onclick = function () {
  if (document.querySelector('#clique').style.display !== 'none') {
    document.querySelector('#clique').style.display = 'none'
  }
  if (document.querySelector('#collapseExample').style.display !== 'none') {
    document.querySelector('#collapseExample').style.display = 'none'
  }
  if (document.querySelector('#myCliques').style.display !== 'none') {
    document.querySelector('#myCliques').style.display = 'none'
  }

  document.querySelector('#pinnedBets').style.display = 'block'
}

document.querySelector('#closePinnedBets').onclick = function () {
  document.querySelector('#pinnedBets').style.display = 'none'
  document.querySelector('#clique').style.display = 'block'
}

document.querySelector('#openFeed').onclick = function () {
  if (document.querySelector('#pinnedBets').style.display !== 'none') {
    document.querySelector('#pinnedBets').style.display = 'none'
  }
  if (document.querySelector('#collapseExample').style.display !== 'none') {
    document.querySelector('#collapseExample').style.display = 'none'
  }
  if (document.querySelector('#myCliques').style.display !== 'none') {
    document.querySelector('#myCliques').style.display = 'none'
  }

  document.querySelector('#clique').style.display = 'block'
}

// var myCliqueButtons = document.querySelectorAll(".toggler3")

// for (let index = 0; index < myCliqueButtons.length; index++) {
//   myCliqueButtons[index].onclick = function(){
//     if(document.querySelector("#collapseExample").style.display !== "none") {
//       document.querySelector("#collapseExample").style.display = "none" ;
//     }
//     else if(document.querySelector("#collapseExample").style.display === "none") {
//       document.querySelector("#collapseExample").style.display = "block" ;
//     }
//   }
// }

var likes = document.querySelectorAll('.likeButton')
var dislikes = document.querySelectorAll('.dislikeButton')

for (let index = 0; index < likes.length; index++) {
  likes[index].onclick = function () {
    if (
      likes[index].innerHTML ==
        '<i class="far fa-thumbs-up" aria-hidden="true"></i>' &&
      dislikes[index].innerHTML ==
        '<i class="far fa-thumbs-down" aria-hidden="true"></i>'
    ) {
      likes[index].innerHTML =
        '<i class="fas fa-thumbs-up" aria-hidden="true"></i>'
    } else if (
      likes[index].innerHTML ==
      '<i class="fas fa-thumbs-up" aria-hidden="true"></i>'
    ) {
      likes[index].innerHTML =
        '<i class="far fa-thumbs-up" aria-hidden="true"></i>'
    }
  }
}

for (let index = 0; index < dislikes.length; index++) {
  dislikes[index].onclick = function () {
    if (
      dislikes[index].innerHTML ==
        '<i class="far fa-thumbs-down" aria-hidden="true"></i>' &&
      likes[index].innerHTML ==
        '<i class="far fa-thumbs-up" aria-hidden="true"></i>'
    ) {
      dislikes[index].innerHTML =
        '<i class="fas fa-thumbs-down" aria-hidden="true"></i>'
    } else if (
      dislikes[index].innerHTML ==
      '<i class="fas fa-thumbs-down" aria-hidden="true"></i>'
    ) {
      dislikes[index].innerHTML =
        '<i class="far fa-thumbs-down" aria-hidden="true"></i>'
    }
  }
}

//   document.querySelector("#toggleNotif").addEventListener("click", function(){
//     if(document.querySelector("#clique").style.display = "none") {
//       document.querySelector("#clique").style.display = "flex" ;
//     }
//     else {
//       document.querySelector("#clique").style.display = "none" ;
//     }
//   })
