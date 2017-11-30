/**
 * blear.core.hotkey
 * @author ydr.me
 * @create 2016年06月04日14:09:36
 */

'use strict';

var selector = require('blear.core.selector');
var event = require('blear.core.event');
var Events = require('blear.classes.events');
var object = require('blear.utils.object');

var keyNameMap = {
    8: "backspace",
    9: "tab",
    13: "enter",
    16: "shift",
    17: "control",
    18: "alt",
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
    91: "meta",
    93: "meta",
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
        var el = selector.query(options.el)[0];
        event.on(el, options.keyEvent, function (ev) {
            var which = ev.which || ev.charCode !== null ? ev.charCode : ev.keyCode;


        });
    }
});
var prop = Hotkey.prototype;
var sole = Hotkey.sole;
var _options = sole();
var _handleMap = sole();

Hotkey.defaults = defaults;
module.exports = Hotkey;

// ========================================
