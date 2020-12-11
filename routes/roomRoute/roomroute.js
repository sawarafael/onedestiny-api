const express = require('express');
const RoomRoute = express.Router();

const users = require('./../../middlewares/verify')

const room = require('./../../controllers/rooms');

RoomRoute.post('/create/new', users.Auth, room.createRoom);
RoomRoute.patch('/update/rooms/:idroom', users.Auth, room.updateDataRoom);

RoomRoute.get('/view/room', users.Auth, room.seeDataRoom);
RoomRoute.get('/view/all', users.Auth, room.seeAllRooms);
RoomRoute.get('/view/playing', users.Auth, room.seeUserPlayingRooms);
RoomRoute.get('/view/friend', users.Auth, room.seeUserFriendRooms);
RoomRoute.get('/view/tags', users.Auth, room.seeUserTagsRooms);

RoomRoute.post('/create/new/assist/:iduser/:idroom', users.Auth, room.addAssistMaster);
RoomRoute.post('/create/new/player/:iduser/:idroom', users.Auth, room.addPlayer);
RoomRoute.get('/view/all/players/assists/', users.Auth, room.seePlayersAndAssists);

RoomRoute.post('/add/record', users.Auth, room.addRecord);
RoomRoute.patch('/update/record', users.Auth, room.updateRecordInfo);
RoomRoute.get('/view/all/record', users.Auth, room.viewRecords);


module.exports = RoomRoute;