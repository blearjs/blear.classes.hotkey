/**
 * 文件描述
 * @author ydr.me
 * @create 2016-06-27 17:34
 */


'use strict';

var Hotkey = require('../src/index');

var ht = new Hotkey();

ht.on('hotkey', function (shortcut) {
    console.log('hotkey', shortcut)
});

ht.bind((Hotkey.mac ? 'cmd' : 'ctrl') + ' + b', function () {});
ht.bind((Hotkey.mac ? 'cmd' : 'ctrl') + ' + shift + b', function () {});
ht.bind((Hotkey.mac ? 'cmd' : 'ctrl') + ' + shift + alt + b', function () {});
ht.bind((Hotkey.mac ? 'cmd' : 'ctrl') + ' + shift + alt + ctrl + b', function () {});


