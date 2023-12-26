/* Category click event */
$(".category").click(function () {
    const $this = $(this);
    /* remove active class from all category titles */
    $(".category").removeClass("active").css("transform", "scale(1)");

    /* add active class to the clicked category, scale it down for pressing effect */
    $this.addClass("active").css({
        "transform": "scale(0.98)",
        "transition": "transform 0.3s ease"
    });

    /* hide all commands */
    const category = $this.data("category");
    $(".command").hide();

    /* show all commands from the selected category */
    if(category === "all") $(".command").show();
    else $(".command[data-category='" + $this.data("category") + "']").show();

    /* update search input placeholder */
    $('#commands-search').attr('placeholder', `Suche aus ${$('.command:visible').length} Befehlen... 🔎`);

    /* scale the category title back up */
    setTimeout(() => $this.css("transform", "scale(1)"), 250);
});


/* Command click event */
$(".command").on("click", function (event) {
    /* Check if card header was clicked */
    if (!$(event.target).hasClass('title')) return;

    /* Close all other command bodies */
    const body = $(this).find(".body");
    $(".body").not(body).slideUp(function () {
        $(this).closest(".command").find(".title").css("box-shadow", "none");
    });

    /* Toggle the clicked command body */
    body.slideToggle(function () {
        if ($(this).is(":visible")) {
            /* Add box shadow to the card header */
            $(this).closest(".command").find(".title").css("box-shadow", "0px 5px 7px rgba(0, 0, 0, 0.6)");
        } else {
            /* Remove box shadow from the card header */
            $(this).closest(".command").find(".title").css("box-shadow", "none");
        }
    });
});


/* Search input event */
$('#commands-search').on('input', function () {
    /* get the trimmed search text and the current category */
    const searchText = $(this).val().toLowerCase().trim();
    const currentCategory = $('.category.active').data('category');

    /* search for matching commands */
    $('.command').each(function () {
        /* get the command category and title */
        const $command = $(this);
        const commandCategory = $command.data('category');
        const commandTitle = $command.find('.title').text().toLowerCase();

        /* check if the command matches the search text and the current category */
        const isMatchingCategory = commandCategory === currentCategory || currentCategory === 'all';
        const isMatchingSearch = commandTitle.includes(searchText);

        /* toggle command visibility */
        $command.toggle(isMatchingCategory && isMatchingSearch);
    });
});


/* Initial category selection */
$(function () {
    /* get first category */
    const $firstCategoryTitle = $(".category").first();

    /* add active class to the first category, scale it down for pressing effect */
    $firstCategoryTitle.addClass("active").css({
        "transform": "scale(0.98)",
        "transition": "transform 0.3s ease"
    });

    /* scale the category title back up */
    setTimeout(() => {
        $firstCategoryTitle.css({
            "transform": "scale(1)"
        });
    }, 250);
});