const express = require('express');
const RoomRoute = express.Router();

const users = require('./../../middlewares/verify')

const room = require('./../../controllers/rooms');

RoomRoute.post('/create/new', users.Auth, room.createRoom);
RoomRoute.get('/view/rooms', users.Auth, room.seeDataRoom);
RoomRoute.put('/update/rooms', users.Auth, room.updateDataRoom);

RoomRoute.post('/create/plugin/owner', users.Auth, room.createPluginOwner);
RoomRoute.post('/create/plugin/player', users.Auth, room.createPluginPlayer);
RoomRoute.get('/view/plugins', users.Auth, room.seePlugins);
RoomRoute.put('/update/plugin/player', users.Auth, room.updatePluginPlayer);
RoomRoute.put('/update/plugin/owner', users.Auth, room.updatePluginOwner);
RoomRoute.delete('/remove/plugin/that', users.Auth, room.removePlugin);

RoomRoute.put('/update/create/new/assistent', users.Auth, room.addAssistMaster);
RoomRoute.put('/update/create/new/player', users.Auth, room.addPlayer);

module.exports = RoomRoute;