/**
 * Name : Jack Library
 * Description : Simple Javascript Library
 * Author : Jimmy Wijaya
 * Version : 1
**/


var j, a, z;
(function () {
    'use strict';


    z = function () {
        return new custom();
    };

    var custom = function () {
    };

    custom.prototype = {
        nestedAddClass: function (arr, rev) {
            var counter = 0;
            function compiledFn(anL) {
                if (rev) {
                    anL['selector'].removeClass(anL['class'])
                } else {
                    anL['selector'].addClass(anL['class'])
                }
            }
            function counterFn(anL) {
                counter = counter + anL['timeOut'];
                return counter;
            }
            arr.forEach(function (anL) {
                setTimeout(function () {
                    compiledFn(anL)
                }, counterFn(anL));
            });
        },
        nestedReverseRemoveClass: function (arr) {
            this.nestedAddClass(arr.reverse(), 1);
            arr.reverse();
        }
    }

    a = {
        get: function (url, typeGet) {
            return new ajax({
                method: 'GET',
                type: typeGet,
                url: url,
                data: null
            });
        },
        post: function (url, typeGet, data) {
            return new ajax({
                method: 'POST',
                type: typeGet,
                url: url,
                data: data
            });
        }
    }

    var ajax = function (o) {
        var _ = this;
        _.xhr = new XMLHttpRequest();
        _.xhr.open(o['method'], o['url']);
        _.setHeader(o['type']);
        _.xhr.onload = function () {
            if (this.readyState === 4) {
                if (_.parseJSON) {
                    _.content = JSON.parse(this.responseText);
                } else {
                    _.content = this.responseText;
                }
                _.done(_.content);
            }
        }
        var data = o['data'] ? JSON.stringify(o['data']) : null;
        _.xhr.send(data);
        _.done = (function (callback) {
            if (typeof callback === 'function') {
                _.callback = callback;
            } else {
                _.callback(callback);
            }
        })
        return this;
    };

    ajax.prototype = {
        setHeader: function (type) {
            if (typeof type === 'string' && type.toUpperCase() === 'JSON') {
                this.xhr.setRequestHeader('Content-Type', 'JSON');
                this.parseJSON = true;
            }
        }
    }

    jack = j = function (selector) {
        return new jack(selector);
    };

    var jack = function (selector) {
        var _ = this;
        if (typeof selector === 'string') {
            var type = selector.charAt(0);
            var sel = selector.replace(type, '');
            if (type == '#') {
                _.content = [document.getElementById(sel)];
                _.selector = sel;
                _.type = 'getElementById';
            } else if (type == '.') {
                _.content = document.getElementsByClassName(sel);
                _.selector = sel;
                _.type = 'getElementsByClassName';
            } else {
                _.content = document.getElementsByTagName(selector);
                _.selector = selector;
                _.type = 'getElementsByClassName';
            }

            this.count = _.content.length;
            return this;
        }

        return _;
    };

    jack.prototype = {
        val: function (string) {
            if (string) {
                this.content[0].value = string;
                return this;
            }
            return this.content[0].value;
        },
        hide: function () {
            this.each(function () {
                this.style.display = 'none';
            })
            return this;
        },
        show: function () {
            this.each(function () {
                this.style.display = 'block';
            })
            return this;
        },
        remove: function () {
            this.each(function () {
                this.remove();
            });
        },
        empty: function () {
            this.each(function () {
                this.innerHTML = '';
            });
        },
        emptyVal: function () {
            this.each(function () {
                this.value = '';
            });
        },
        each: function (callback) {
            for (var i = 0; i < this.count; i++) {
                callback.call(this.content[i]);
            }
            ;
            return this;
        },
        html: function (string) {
            this.each(function () {
                this.innerHTML = string;
            });
            return this;
        },
        appendAfter: function (string) {
            this.each(function () {
                this.innerHTML = this.innerHTML + string;
            });
            return this;
        },
        appendBefore: function (string) {
            this.each(function () {
                this.innerHTML = string + this.innerHTML;
            })
            return this;
        },
        on: function (event, callback) {
            this.each(function () {
                this.addEventListener(event, callback);
            });
        },
        addClass: function (string, timeOut) {
            var counter = 0;
            var timeOut = (timeOut ? timeOut : 0);
            this.removeClass(string);
            var __ = this;

            function compiledFunction(_) {
                _.classList.add(string);
            }

            function counterFn() {
                counter = counter + timeOut;
                return counter;
            }

            setTimeout(function () {
                __.each(function () {
                    var _ = this;

                    setTimeout(function () {
                        compiledFunction(_);
                    }, counterFn());
                });
            }, 100)
        },
        removeClass: function (string) {
            this.each(function () {
                var _ = this;
                if (_.classList.contains(string)) {
                    _.classList.remove(string);
                }
            })
        },
        hasClass: function (string) {
            var found = false;
            this.each(function () {
                if (this.classList.contains(string)) {
                    found = true;
                }
            });
            return found;
        }
    };

}());

