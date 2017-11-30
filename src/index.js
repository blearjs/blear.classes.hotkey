/**
 * blear.classes.hotkey
 * @author ydr.me
 * @create 2016年06月04日14:09:36
 */

'use strict';

var selector = require('blear.core.selector');
var event = require('blear.core.event');
var Events = require('blear.classes.events');
var object = require('blear.utils.object');
var array = require('blear.utils.array');
var access = require('blear.utils.access');

var keyConnector = '+';
var assistKeyMap = {
    16: "shift",
    17: "control",
    18: "alt",
    91: "meta",
    93: "meta"
};
var keyNameMap = {
    8: "backspace",
    9: "tab",
    13: "enter",
    19: "pause",
    20: "capslock",
    27: "esc",
    32: "spacebar",
    33: "pageup",
    34: "pagedown",
    35: "end",
    36: "home",
    37: "left",
    38: "up",
    39: "right",
    40: "down",
    45: "insert",
    46: "del",
    48: "0",
    49: "1",
    50: "2",
    51: "3",
    52: "4",
    53: "5",
    54: "6",
    55: "7",
    56: "8",
    57: "9",
    65: "a",
    66: "b",
    67: "c",
    68: "d",
    69: "e",
    70: "f",
    71: "g",
    72: "h",
    73: "i",
    74: "j",
    75: "k",
    76: "l",
    77: "m",
    78: "n",
    79: "o",
    80: "p",
    81: "q",
    82: "r",
    83: "s",
    84: "t",
    85: "u",
    86: "v",
    87: "w",
    88: "x",
    89: "y",
    90: "z",
    96: "0",
    97: "1",
    98: "2",
    99: "3",
    100: "4",
    101: "5",
    102: "6",
    103: "7",
    104: "8",
    105: "9",
    106: "multiply",
    107: "add",
    109: "subtract",
    110: "decimal",
    111: "divide",
    112: "f1",
    113: "f2",
    114: "f3",
    115: "f4",
    116: "f5",
    117: "f6",
    118: "f7",
    119: "f8",
    120: "f9",
    121: "f10",
    122: "f11",
    123: "f12",
    124: "f13",
    125: "f14",
    126: "f15",
    127: "f16",
    128: "f17",
    129: "f18",
    130: "f19",
    131: "f20",
    132: "f21",
    133: "f22",
    134: "f23",
    135: "f24",
    59: ";",
    61: "=",
    186: ";",
    187: "=",
    188: ",",
    190: ".",
    191: "/",
    192: "`",
    219: "[",
    220: "\\",
    221: "]",
    222: "'"
};
var aliases = {
    "escape": "esc",
    "delete": "del",
    "return": "enter",
    "ctrl": "control",
    "space": "spacebar",
    "ins": "insert",
    "cmd": "meta",
    "command": "meta",
    "wins": "meta",
    "windows": "meta"
};
var defaults = {
    el: document,
    keyEvent: 'keydown'
};

var Hotkey = Events.extend({
    constructor: function (options) {
        var the = this;

        Hotkey.parent(the);
        options = the[_options] = object.assign({}, defaults, options);
        the[_handleMap] = {};
        the[_handleEl] = selector.query(options.el)[0];
        the[_initEvent]();
    },

    /**
     * 绑定热键
     * @param shortcut {String} 使用“+”连接多键组合
     * @param listener {Function} 回调
     */
    bind: function (shortcut, listener) {
        var the = this;
        shortcut = normalize(shortcut);
        the[_handleMap][shortcut] = the[_handleMap][shortcut] || [];
        the[_handleMap][shortcut].push(listener);
        return the;
    },

    /**
     * 解除绑定
     * @param [shortcut] {String} 使用“+”连接多键组合
     * @param [listener] {Function} 回调
     */
    unbind: function (shortcut, listener) {
        var the = this;
        var args = access.args(arguments);

        switch (args.length) {
            case 0:
                the[_handleMap] = {};
                break;

            case 1:
                shortcut = normalize(shortcut);
                the[_handleMap][shortcut] = [];
                break;

            case 2:
                shortcut = normalize(shortcut);
                var foundIndex = -1;
                if (the[_handleMap][shortcut]) {
                    array.each(the[_handleMap][shortcut], function (index, _listener) {
                        if (_listener === listener) {
                            foundIndex = index;
                            return false;
                        }
                    });
                    array.remove(the[_handleMap][shortcut], foundIndex);
                }
                break;
        }
    }
});
var prop = Hotkey.prototype;
var sole = Hotkey.sole;
var _options = sole();
var _handleEl = sole();
var _handleMap = sole();
var _initEvent = sole();

/**
 * 初始化事件
 */
prop[_initEvent] = function () {
    var the = this;

    event.on(the[_handleEl], the[_options].keyEvent, function (ev) {
        var keyPath = buildKeyPath(ev);
        var listeners = the[_handleMap][keyPath];

        if (!listeners) {
            return;
        }

        var eachListeners = [].concat(listeners);
        the.emit('hotkey', keyPath);
        array.each(eachListeners, function (index, listener) {
            listener.call(the, ev);
        });
    });
};

Hotkey.defaults = defaults;
Hotkey.mac = /mac/i.test(navigator.platform);
Hotkey.normalize = normalize;
module.exports = Hotkey;

// ========================================

/**
 * 标准化快捷键
 * @param shortcut
 * @returns {string}
 */
function normalize(shortcut) {
    var keys = shortcut.toLowerCase().replace(/\s+/gi, '').split(keyConnector);

    array.each(keys, function (index, key) {
        keys[index] = aliases[key] || key;
    });

    var keyname = keys.pop();
    keys.sort().push(keyname);
    return keys.join(keyConnector);
}


/**
 * 构建键程
 * @param ev
 * @returns {string}
 */
function buildKeyPath(ev) {
    var which = ev.which;
    var keyName = keyNameMap[which];
    var keyPath = [];

    if (ev.altKey) {
        keyPath.push('alt');
    }

    if (ev.ctrlKey) {
        keyPath.push('control');
    }

    if (ev.metaKey) {
        keyPath.push('meta');
    }

    if (ev.shiftKey) {
        keyPath.push('shift');
    }

    if (keyName) {
        keyPath.push(keyName);
    }

    return keyPath.join(keyConnector);
}

