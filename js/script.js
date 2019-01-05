$(document).ready(function () {

    $('.client-slider').owlCarousel({
        items: 1,
        loop: true,
        nav: true,
        navText: ["<span class='icon-prev-icon'></span>", "<span class='icon-next-icon'></span>"],
        responsive: {
            768: {
                items: 4
            },
            991: {
                items: 5
            },
            1199: {
                items: 6
            },
            1560: {
                items: 7
            }
        }
    })

    var menu = [['order', 30], ['steps3', 30]];
    menu.forEach(mmScrollTo);

    function mmScrollTo(item, i, arr) {
        $('a[href="#' + item[0] + '"]').click(function (e) {
            e.preventDefault();
            $('html, body').animate({
                scrollTop: $('#' + item[0]).offset().top - item[1]
            }, 750);
        });
    }


    $('input').focus(function () {
        $(this).data('placeholder', $(this).attr('placeholder'))
        $(this).attr('placeholder', '');
    });
    $('input').blur(function () {
        $(this).attr('placeholder', $(this).data('placeholder'));
    });

    $('#popup1').wiFeedBack({
        fbScript: 'blocks/wi-feedback.php',
        fbColor: 'red'
    });

    $('#popup2').wiFeedBack({
        fbScript: 'blocks/wi-feedback.php',
        fbColor: 'red'
    });

    $('#popup3').wiFeedBack({
        fbScript: 'blocks/wi-feedback.php',
        fbColor: 'red'
    });

    $('.reviews-slider').owlCarousel({
        loop: true,
        nav: true,
        items: 1,
        navText: ['', ''],
        responsive: {
            767: {
                items: 1
            },
            768: {
                items: 2
            }
        }

    });

    function echo_date(date) {
        var days = ["воскресение", "понедельник", "вторник", "среда", "четверг", "пятница", "суббота"],
            months = ["января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"];
        echo_date = function (date) {
            date = new Date(date);
            return {
                "date": date,
                "day": days[date.getDay()],
                "month": months[date.getMonth()],
                "day_num": date.getDate()
            };
        }
        return echo_date(date);
    };

    var primer = echo_date(Date.now() + 24 * 60 * 60 * 1000);
    document.getElementById('primer').innerHTML = primer.day_num + " " + primer.month;

});