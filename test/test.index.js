/**
 * karma 测试 文件
 * @author ydr.me
 * @create 2016-05-17 12:13
 */


'use strict';

var event = require('blear.core.event');
var object = require('blear.utils.object');

var Hotkey = require('../src/index.js');

describe('Hotkey', function () {
    it('绑定：a', function (done) {
        var ht = new Hotkey();

        ht.bind('a', function (ev, shortcut) {
            expect(ev.which).toBe(65);
            expect(ev.type).toBe('keydown');
            expect(shortcut).toBe('a');
            done();
        });

        dispatchKryboardEvent(65);
    });

    it('绑定：ctrl + a', function (done) {
        var ht = new Hotkey();

        ht.bind('ctrl + a', function (ev, shortcut) {
            expect(ev.which).toBe(65);
            expect(ev.type).toBe('keydown');
            expect(shortcut).toBe('control+a');
            done();
        });

        dispatchKryboardEvent(65, {
            ctrlKey: true
        });
    });

    it('绑定：ctrl + shift + a', function (done) {
        var ht = new Hotkey();

        ht.bind('ctrl + shift + a', function (ev, shortcut) {
            expect(ev.which).toBe(65);
            expect(ev.type).toBe('keydown');
            expect(shortcut).toBe('control+shift+a');
            done();
        });

        dispatchKryboardEvent(65, {
            ctrlKey: true,
            shiftKey: true
        });
    });

    it('绑定：ctrl + shift + alt + a', function (done) {
        var ht = new Hotkey();

        ht.bind('ctrl + shift + alt + a', function (ev, shortcut) {
            expect(ev.which).toBe(65);
            expect(ev.type).toBe('keydown');
            expect(shortcut).toBe('alt+control+shift+a');
            done();
        });

        dispatchKryboardEvent(65, {
            altKey: true,
            ctrlKey: true,
            shiftKey: true
        });
    });

    it('绑定：ctrl + shift + alt + meta + a', function (done) {
        var ht = new Hotkey();

        ht.bind('ctrl + shift + alt + meta + a', function (ev, shortcut) {
            expect(ev.which).toBe(65);
            expect(ev.type).toBe('keydown');
            expect(shortcut).toBe('alt+control+meta+shift+a');
            done();
        });

        dispatchKryboardEvent(65, {
            altKey: true,
            ctrlKey: true,
            metaKey: true,
            shiftKey: true
        });
    });

    it('解绑：0 参数', function (done) {
        var ht = new Hotkey();
        var times1 = 0;
        var times2 = 0;
        var shortcut1 = 'a';
        var shortcut2 = 'b';

        var listener1 = function (ev) {
            times1++;
        };
        var listener2 = function (ev) {
            times2++;
        };
        ht.bind(shortcut1, listener1);
        ht.bind(shortcut2, listener2);

        setTimeout(function () {
            expect(times1).toBe(1);
            expect(times2).toBe(1);
            ht.unbind();
            dispatchKryboardEvent(65);
            dispatchKryboardEvent(66);
        }, 10);

        setTimeout(function () {
            expect(times1).toBe(1);
            expect(times2).toBe(1);
            done();
        }, 100);

        dispatchKryboardEvent(65);
        dispatchKryboardEvent(66);
    });

    it('解绑：1 参数', function (done) {
        var ht = new Hotkey();
        var times1 = 0;
        var times2 = 0;
        var shortcut1 = 'a';

        var listener1 = function (ev) {
            times1++;
        };
        var listener2 = function (ev) {
            times2++;
        };
        ht.bind(shortcut1, listener1);
        ht.bind(shortcut1, listener2);

        setTimeout(function () {
            expect(times1).toBe(1);
            expect(times2).toBe(1);
            ht.unbind(shortcut1);
            dispatchKryboardEvent(65);
        }, 10);

        setTimeout(function () {
            expect(times1).toBe(1);
            expect(times2).toBe(1);
            done();
        }, 100);

        dispatchKryboardEvent(65);
    });

    it('解绑：2 参数', function (done) {
        var ht = new Hotkey();
        var times1 = 0;
        var times2 = 0;
        var shortcut1 = 'a';
        var shortcut2 = 'b';

        var listener1 = function (ev) {
            times1++;
        };
        var listener2 = function (ev) {
            times2++;
        };
        ht.bind(shortcut1, listener1);
        ht.bind(shortcut2, listener2);

        setTimeout(function () {
            expect(times1).toBe(1);
            expect(times2).toBe(1);
            ht.unbind(shortcut1, listener1);
            dispatchKryboardEvent(65);
            dispatchKryboardEvent(66);
        }, 10);

        setTimeout(function () {
            expect(times1).toBe(1);
            expect(times2).toBe(2);
            done();
        }, 100);

        dispatchKryboardEvent(65);
        dispatchKryboardEvent(66);
    });

    it('事件', function (done) {
        var ht = new Hotkey();

        ht.bind('B + ctrl', function () {
            // none
        });
        ht.on('hotkey', function (ev, shortcut) {
            expect(shortcut).toBe('control+b');
            expect(ev.type).toBe('keydown');
            done();
        });

        dispatchKryboardEvent(66, {
            ctrlKey: true
        });
    });
});


/**
 * 触发一个键盘事件
 * @link https://keqingrong.github.io/2017/01/15/init-event/
 * @param which
 * @param [properties]
 */
function dispatchKryboardEvent(which, properties) {
    var ev = new KeyboardEvent('keydown');

    var rules = {
        which: {
            get: function () {
                return which;
            }
        }
    };

    object.each(properties || {}, function (key, val) {
        rules[key] = {
            get: function () {
                return val;
            }
        };
    });

    Object.defineProperties(ev, rules);
    event.emit(document, ev);
}
