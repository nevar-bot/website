$(".category-title").click(function () {
    $(".category-title").removeClass("commands-active-category");
    $(this).addClass("commands-active-category");
    const category = $(this).data("category");
    $(".command").hide();
    if (category === "all") {
        $(".command").show();
    } else {
        $(".command[data-category='" + $(this).data("category") + "']").show();
    }

    const visibleCommands = $('.command:visible').length;
    $('#commands-search').attr('placeholder', `Suche aus ${visibleCommands} Befehlen 🔎`);
});

$(".command").click(function (event) {
    if (!$(event.target).hasClass('command-title')) return;
    const body = $(this).find(".command-body");
    $(".command-body").not(body).slideUp();
    body.slideToggle();
});

$('#commands-search').on('input', function () {
    const searchText = $(this).val().toLowerCase();
    const currentCategory = $('.commands-active-category').data('category');
    $('.command').each(function () {
        const commandCategory = $(this).data('category');
        const commandTitle = $(this).find('.command-title').text().toLowerCase();
        const isMatchingCategory = commandCategory === currentCategory || currentCategory === 'all';
        const isMatchingSearch = commandTitle.includes(searchText.trim());
        $(this).toggle(isMatchingCategory && isMatchingSearch);
    });
});

$(function () {
    $(".category-title").first().addClass("commands-active-category");
})