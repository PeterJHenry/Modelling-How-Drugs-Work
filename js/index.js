function popup(url) {
  newwindow=window.open(url,'-log Ki Reference Table','height=auto,width=498');
  if (window.focus) {newwindow.focus()}
  return false;
}

$(document).ready(function () {
    $('section').fadeIn();
    $('.loading').fadeOut();
    $('[data-toggle="tooltip"]').tooltip();
});

$("ul.list-inline").find("a").click(function (e) {
    e.preventDefault();
    var section = $(this).attr("href");
    $("html, body").animate({
        scrollTop: $(section).offset().top
    });
});

var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].onclick = function() {
    this.classList.toggle("active");
    var panel = this.nextElementSibling;
    if (panel.style.maxHeight){
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    }
  }
}
