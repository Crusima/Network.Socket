(function(plugin, io) {
    'use strict';

    var _io         = io;
    var _socketName = 'https://en.tribalwars2.com:80';
    var _socket     = {};

    var _originalSend = null;

    var Module = (function() {
        var _version   = '0.1.21';
        var _namespace = 'CTW2.Plugin.Socket';

        function emitEvent(data) {
            data = data[0];

            if (data.indexOf('2::') === 0) {
                document.dispatchEvent(new CustomEvent('Heartbeat', {detail: {}}));

                return;
            }

            data = JSON.parse(data.substr(4));

            switch (data.args[0].type) {
                case 'Command/getAttackingFactor':
                    document.dispatchEvent(new CustomEvent('ClickVillage', {'detail': data.args[0].data}));
                    return;

                case 'Map/getVillageDetails':
                    document.dispatchEvent(new CustomEvent('ShowVillageInfo', {'detail': data.args[0].data}));
                    return;

                case 'Character/getProfile':
                    document.dispatchEvent(new CustomEvent('ShowPlayerInfo', {'detail': data.args[0].data}));
                    return;
            }
        }

        function Socket() {
        }

        Socket.prototype.getVersion = function() {
            return _version;
        };

        Socket.prototype.getNamespace = function() {
            return _namespace;
        };

        Socket.prototype.run = function() {
            _socket = _io.sockets[_socketName].transport.websocket;

            _originalSend = _socket.send;

            _socket.send = function () {
                _originalSend.apply(this, [].slice.call(arguments));

                emitEvent(arguments);
            }
        };

        Socket.prototype.stop = function() {
            _socket = _io.sockets[_socketName].transport.websocket;

            _socket.send = _originalSend;
        };

        return Socket;
    }());

    var module = new Module();

    newPluginName = module.getNamespace();

    plugin.registerAndRun(module);
}(_mainPlugin, io));
