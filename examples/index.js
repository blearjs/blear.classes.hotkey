/**
 * 文件描述
 * @author ydr.me
 * @create 2016-06-27 17:34
 */


'use strict';

var Hotkey = require('../src/index');

var ht = new Hotkey();

ht.bind((Hotkey.mac ? 'cmd' : 'ctrl') + ' + b', function () {

});


