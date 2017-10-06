$(document).ready(function () {
    $('[data-toggle="tooltip"]').tooltip();
});

$("ul.list-inline").find("a").click(function (e) {
    e.preventDefault();
    var section = $(this).attr("href");
    $("html, body").animate({
        scrollTop: $(section).offset().top
    });
});