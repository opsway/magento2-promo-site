/* share42.com | 23.09.2014 | (c) Dimox */
(function ($) {
    $(function () {
        $('div.share42init').each(function (idx) {
            var el = $(this),
                u = el.attr('data-url'),
                t = el.attr('data-title'),
                i = el.attr('data-image'),
                d = el.attr('data-description'),
                f = el.attr('data-path'),
                fn = el.attr('data-icons-file'),
                z = el.attr('data-zero-counter'),
                m1 = el.attr('data-top1'),
                m2 = el.attr('data-top2') * 1,
                m3 = el.attr('data-margin');

            if (!u) {
                u = location.href;
            }

            if (!z) {
                z = 0;
            }

            function changeCount(prefix, shares) {
                if (shares > 0 || z == 1) {
                    el
                      .find('a[data-count="' + prefix + '"]')
                      .addClass('social-icon_w-count')
                      .find('.social-icon__counter').html(shares);
                }
            }

            function fb_count(url) {
                var shares;
                $.getJSON('//graph.facebook.com/?callback=?&ids=' + url, function(data) {
                    shares = data[url].shares || 0;
                    changeCount('fb', shares);
                });
            }
            fb_count(u);

            function gplus_count(url) {
                if (!window.services) {
                    window.services = {};
                    window.services.gplus = {}
                }
                window.services.gplus.cb = function(number) {
                    window.gplusShares = number
                };

                $.getScript('//share.yandex.ru/gpp.xml?url=' + url, function() {
                    var shares = window.gplusShares;
                    changeCount('gplus', shares);
                });
            }

            gplus_count(u);

            function lnkd_count(url) {
                var shares;
                $.getJSON('//www.linkedin.com/countserv/count/share?callback=?&url=' + url, function(data) {
                    shares = data.count;
                    changeCount('lnkd', shares);
                });
            }

            lnkd_count(u);

            function twi_count(url) {
                var shares;
                $.getJSON('//urls.api.twitter.com/1/urls/count.json?callback=?&url=' + url, function(data) {
                    shares = data.count;
                    changeCount('twi', shares);
                });
            }
            twi_count(u);

            if (!f) {
                function path(name) {
                    var sc = document.getElementsByTagName('script')
                      , sr = new RegExp('^(.*/|)(' + name + ')([#?]|$)');
                    for (var p = 0, scL = sc.length; p < scL; p++) {
                        var m = String(sc[p].src).match(sr);
                        if (m) {
                            if (m[1].match(/^((https?|file)\:\/{2,}|\w:[\/\\])/))
                                return m[1];
                            if (m[1].indexOf('/') == 0)
                                return m[1];
                            b = document.getElementsByTagName('base');
                            if (b[0] && b[0].href)
                                return b[0].href + m[1];
                            else
                                return document.location.pathname.match(/(.*[\/\\])/)[0] + m[1];
                        }
                    }
                    return null ;
                }
                f = path('share42.js');
            }
            if (!t)
                t = document.title;
            if (!d) {
                var meta = $('meta[name="description"]').attr('content');
                if (meta !== undefined)
                    d = meta;
                else
                    d = '';
            }
            if (!m1)
                m1 = 150;
            if (!m2)
                m2 = 20;
            if (!m3)
                m3 = 0;
            u = encodeURIComponent(u);
            t = encodeURIComponent(t);
            t = t.replace(/\'/g, '%27');
            i = encodeURIComponent(i);
            d = encodeURIComponent(d);
            d = d.replace(/\'/g, '%27');
            var fbQuery = 'u=' + u;
            if (i != 'null' && i != '')
                fbQuery = 's=100&p[url]=' + u + '&p[title]=' + t + '&p[summary]=' + d + '&p[images][0]=' + i;
            var s = {
                fb: '"#" data-count="fb" onclick="window.open(\'//www.facebook.com/sharer.php?m2w&' + fbQuery + '\', \'_blank\', \'scrollbars=0, resizable=1, menubar=0, left=100, top=100, width=550, height=440, toolbar=0, status=0\');return false" title="Share to Facebook"',
                lk: '"#" data-count="lnkd" onclick="window.open(\'//www.linkedin.com/shareArticle?mini=true&url=' + u + '&title=' + t + '\', \'_blank\', \'scrollbars=0, resizable=1, menubar=0, left=100, top=100, width=600, height=400, toolbar=0, status=0\');return false" title="Share to Linkedin"',
                tw: '"#" data-count="twi" onclick="window.open(\'//twitter.com/intent/tweet?text=' + t + '&url=' + u + '\', \'_blank\', \'scrollbars=0, resizable=1, menubar=0, left=100, top=100, width=550, height=440, toolbar=0, status=0\');return false" title="Share to Twitter"',
                gp: '"#" data-count="gplus" onclick="window.open(\'//plus.google.com/share?url=' + u + '\', \'_blank\', \'scrollbars=0, resizable=1, menubar=0, left=100, top=100, width=550, height=440, toolbar=0, status=0\');return false" title="Share to Google+"'
            };
            var l = '';
            for(key in s) {
                var s42s = '';
                l += '<a class="social-icon social-icon_' + key + '" rel="nofollow" href=' + s[key] + ' target="_blank"><span class="social-icon__icon icon_' + key + '"></span><span class="social-icon__counter"></span></a>' + s42s;
            }
            el.html('<span id="share42" style="position:fixed;z-index:9997;margin-left:' + m3 + 'px">' + l + '</span>');
            var p = $('#share42');
            function m() {
                var top = $(window).scrollTop();
                if (top + m2 < m1) {
                    p.css({
                        top: m1 - top
                    });
                } else {
                    p.css({
                        top: m2
                    });
                }
            }
            m();
            $(window).scroll(function() {
                m();
            }
            )
        }
        );
    }
    )
}
)(jQuery);
