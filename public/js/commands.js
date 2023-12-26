$(".category-title").click(function () {
    const $this = $(this);
    $(".category-title").removeClass("commands-active-category").css("transform", "scale(1)");

    $this.addClass("commands-active-category").css({
        "transform": "scale(0.98)",
        "transition": "transform 0.3s ease"
    });

    const category = $this.data("category");
    $(".command").hide();
    if(category === "all") $(".command").show();
    else $(".command[data-category='" + $this.data("category") + "']").show();

    $('#commands-search').attr('placeholder', `Suche aus ${$('.command:visible').length} Befehlen 🔎`);

    setTimeout(() => $this.css("transform", "scale(1)"), 250);
});


$(".command").on("click", function (event) {
    if (!$(event.target).hasClass('command-title')) return;

    const body = $(this).find(".command-body");
    $(".command-body").not(body).slideUp();
    body.slideToggle();
});


$('#commands-search').on('input', function () {
    const searchText = $(this).val().toLowerCase().trim();
    const currentCategory = $('.commands-active-category').data('category');

    $('.command').each(function () {
        const $command = $(this);
        const commandCategory = $command.data('category');
        const commandTitle = $command.find('.command-title').text().toLowerCase();
        const isMatchingCategory = commandCategory === currentCategory || currentCategory === 'all';
        const isMatchingSearch = commandTitle.includes(searchText);
        $command.toggle(isMatchingCategory && isMatchingSearch);
    });
});


$(function () {
    const $firstCategoryTitle = $(".category-title").first();

    $firstCategoryTitle.addClass("commands-active-category").css({
        "transform": "scale(0.98)",
        "transition": "transform 0.3s ease"
    });

    setTimeout(() => {
        $firstCategoryTitle.css({
            "transform": "scale(1)"
        });
    }, 250);
});