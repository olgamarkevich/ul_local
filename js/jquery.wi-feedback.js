(function ($) {
    $(document).ready(function () {

        $.fn.wiFeedBack = function (options) {

            // Параметры

            var fb = this,
                fbID = Math.floor(Math.random() * (899999) + 100000),
                fbOpt = $.extend({
                    fbScript: '/wi-feedback.php',
                    fbLink: '.wi-fb-link',
                    fbDelegate: false,
                    fbBeforeOpen: null,
                    fbBeforeClose: null,
                    fbColor: '#00aff0',
                    fbTheme: true
                }, options),
                fbFieldInfo;


            // CSS

            if (fbOpt.fbColor) {
                $('head').append('<style wi-fb-id="' + fbID + '">.wi-fb-' + fbID + ' .wi-fb-msg-sending,.wi-fb-' + fbID + ' .wi-fb-msg-sent,.wi-fb-' + fbID + ' .wi-fb-title h2{color:' + fbOpt.fbColor + '}.wi-fb-' + fbID + ' .wi-fb-btn button{background:' + fbOpt.fbColor + '}</style>');
            }

            // Элементы

            fb.addClass('wi-fb wi-fb-' + fbID).attr('wi-fb-id', fbID);

            if (fbOpt.fbTheme) {
                fb.find('h2').wrap('<div class="wi-fb-title"></div>');
                fb.find('h3').wrap('<div class="wi-fb-text"></div>');
                fb.find('input, select, textarea').wrap('<div class="wi-fb-line"></div>');
                fb.find('input, select, textarea').each(function () {
                    var label = $(this).attr('data-wi-fb-label');
                    if (label != '' && typeof (label) != 'undefined') {
                        $(this).parent().prepend('<label>' + label + '</label>');
                        if ($(this).prop('required')) $(this).parent().find('label').append('<span> *</span>');
                    }
                });
                fb.find('button').wrap('<div class="wi-fb-btn"></div>');
            }

            if (/ru/i.test($('html').attr('lang'))) {
                fb.append('<div class="wi-fb-spinner"></div><div class="wi-fb-msg-invalid">Отмеченные поля заполнены некорректно</div><div class="wi-fb-msg-sending">Идет отправка данных...</div><div class="wi-fb-msg-sent">Ваша заявка принята!</div><div class="wi-fb-msg-notsent">При отправке данных произошла ошибка</div>');
            } else {
                fb.append('<div class="wi-fb-spinner"></div><div class="wi-fb-msg-invalid">Marked fields are required</div><div class="wi-fb-msg-sending">Sending data...</div><div class="wi-fb-msg-sent">Your request is sent!</div><div class="wi-fb-msg-notsent">An error occurred while sending data</div>');
            }



            // Отправка данных

            fb.find('.wi-fb-btn button, .wi-fb-send').on('click', function () {

                fb.removeClass('invalid sent notsent');

                if (fbValidate()) {

                    var data = {},
                        fields = [];

                    fb.find('input, select, textarea').each(function () {
                        fields.push({
                            name: $(this).attr('data-wi-fb-caption') || $(this).attr('wi-fb-caption') || $(this).attr('name'),
                            value: $(this).val()
                        });
                    });

                    if (fbFieldInfo) {
                        fields.push({
                            name: 'Дополнительная информация',
                            value: fbFieldInfo
                        });
                    }

                    fields.push({
                        name: 'Кнопка',
                        value: $(this).text()
                    });

                    fields.push({
                        name: 'Адрес страницы',
                        value: window.location.href
                    });

                    data.action = 'feedback';
                    data.fields = fields;

                    fb.addClass('sending');

                    $.ajax({
                        url: fbOpt.fbScript,
                        type: 'POST',
                        data: data,
                        cache: false,
                        success: function (response) {
                            if (response == '1') {
                                fb.removeClass('sending');
                                fb.addClass('sent');
                                fbClear();
                                // Вывод popup
                                $.magnificPopup.open({
                                    items: {
                                        src: '#modal1',
                                        type: 'inline'
                                    }
                                });
                            } else {
                                fb.removeClass('sending');
                                fb.addClass('notsent');
                            }
                        },
                        error: function () {
                            fb.removeClass('sending');
                            fb.addClass('notsent');
                        }
                    });
                } else {

                    fb.addClass('invalid');
                }
            });


            // Ссылки

            if (fbOpt.fbLink) {

                // Подключение popup

                fb.addClass('wi-fb-modal');

                var mfpOpt = {};

                if (fbOpt.fbDelegate) mfpOpt.delegate = fbOpt.fbLink;
                mfpOpt.type = 'inline';
                mfpOpt.callbacks = {};
                mfpOpt.fixedContentPos = true;
                mfpOpt.mainClass = 'mfp-fade';
                mfpOpt.removalDelay = 300;

                if (typeof (fbOpt.fbBeforeOpen) == 'function') mfpOpt.callbacks.open = fbOpt.fbBeforeOpen;
                if (typeof (fbOpt.fbBeforeClose) == 'function') mfpOpt.callbacks.close = fbOpt.fbBeforeClose;

                if (fbOpt.fbDelegate) $('body').magnificPopup(mfpOpt);
                else $(fbOpt.fbLink).magnificPopup(mfpOpt);

                // Дополнительные атрибуты сслок

                $('body').on('click', fbOpt.fbLink, function () {
                    fb.removeClass('sent notsent');
                    fbFieldInfo = $(this).attr('data-wi-fb-info') || $(this).attr('wi-fb-info') || '';
                });
            }


            // Валидация

            function fbValidate() {

                var invalidNum = 0;

                fb.find('input, select, textarea').each(function () {
                    if (!$(this).get(0).checkValidity()) invalidNum++;
                });

                if (invalidNum == 0) return true;
                else return false;
            }

            // Очистка

            function fbClear() {

                fb.find('input, select, textarea').each(function () {
                    $(this).val('');
                });
            }

            // Возврат

            return fbID;

        }

    });
})(jQuery);