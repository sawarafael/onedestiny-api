const User = require('./../models/User/user');

const Room = require('./../models/Room/room');
const RoomData = require('./../models/Room/roomData');
const RoomPlugin = require('./../models/Room/roomPlugins');
const RoomPluginsData = require('./../models/Room/roomPluginsData');
const RoomPlugins = require('./../models/Room/roomPlugins');
const RoomPluginData = require('./../models/Room/roomPluginsData');


module.exports = {

    createRoom(req, res) {


        Room.findOne({
            where: {
                roomName: req.body.roomName
            }
        }).then((room) => {

            if(room) {
                res.status(400);
                res.json({ err: "Já existe uma mesa com este mesmo nome no sistema! "})
            } else {
                User.findOne({
                    where: {
                        id: req.body.id
                    }, 
                    attributes: [ 'id', 'username' ]
                }).then((user) => {
                
                    Room.create({
                        idUser: user.id,
                        roomName: req.body.roomName,
                        status: 0
                    }).then((roomc) => {
                        res.status(200);
                        res.json({ msg: "Mesa criada!" })

                        RoomData.create({
                            idMesa: roomc.id,
                            idMaster: user.id,
                            description: req.body.description,
                            avatar: req.body.avatar,
                            players: null,
                            assistMasters: null
                        })

                        RoomPlugin.create({
                            idRoom: roomc.id,
                            idOwner: user.id,
                            status: 0,
                            amount: null
                        })
                    })
                })
            }
        })
    },

    updateDataRoom(req, res){

        Room.findOne({
            where: {
                id: req.body.idroom
            }
        }).then((room) => {
            
            Room.update({
                roomName: req.body.newroomname,
                status: req.body.status
            }, {
                where: {
                    id: room.id
                }
            })

            RoomData.update({
                description: req.body.description,
                avatar: req.body.avatar
            }, {
                where: {
                    idMesa: room.id
                }
            })

            res.status(200);
            res.json({ msg: "Informações da Mesa atualizada!" })



        })  

    },

    seeDataRoom(req, res){

        Room.findAll({
            where: {
                id: req.body.idroom
            }, 
            attributes: [ 'idUser', 'roomName', 'status' ]
        }).then((room) => {

            RoomData.findAll({
                where: {
                    idMesa: req.body.idroom
                }, 
                attributes: [ 'idMaster', 'description', 'avatar', 'players', 'assistMasters' ]
            }).then((roomd) => {

                res.status(200);
                res.json({ room: room, room_data: roomd })
            })

        })

    },

    createPluginOwner(req, res){

        User.findOne({
            where: {
                id: req.body.iduser
            },
            attributes: ['id']
        }).then((useri) => {
            Room.findOne({
                where:  {
                    idUser: useri.id
                }
            }).then((room) => {

                const one = 1;
                m = one + 1;

                RoomPlugin.update({
                    status: 1,
                    amount: m
                }, {
                    where: {
                        idOwner: room.id
                    }
                }).then((att) => {

                    RoomPluginsData.create({
                        idOwner: room.idUser,
                        idRoom: room.id,
                        title: null,
                        content: null
                    })

                    res.status(200);
                    res.json({ msg: "Adicionado mais uma ficha para o Mestre - NPC" })
                })
            }).catch((err) => {
                res.status(400);
                res.json({ err: "Erro em adicionar mais uma ficha para o Mestre - NPC" })
            })  
        })       

    },

    createPluginPlayer(req, res) {

        User.findOne({
            where: {
                id: req.body.iduser
            },
            attributes: ['id']
        }).then((useri) => {

            RoomPlugins.findOne({
                where: {
                    idRoom: req.body.idroom,
                    idOwner: req.body.iduser
                }, 
                attributes: [ 'idRoom', 'idOwner' ]
            }).then((room) => {

                if(room){
                    res.status(400);
                    res.json({ err: "Este usuário já tem uma bancada de fichas nessa mesa" })
                } else {
                    RoomPlugin.create({
                        idRoom: req.body.idroom,
                        idOwner: useri.id,
                        status: 0,
                        amount: 1                
                    }).then((resukt) => {
                        RoomPluginsData.create({                            
                            idRoom: req.body.idroom,
                            idOwner: resukt.idOwner,
                            title: null,
                            content: null
                        })
                        res.status(200);
                        res.json({ msg: "Ficha para Player criada!" })
                    })
                }
            })

        })

    },

    seePlugins(req, res){

        RoomPlugin.findAll({
            where: {
                idRoom: req.body.idroom
            },
            attributes: [ 'idOwner', 'idRoom', 'status' ]
        }).then((roomp) => {

            RoomPluginData.findAll({                
                attributes: [ 'idRoom', 'title', 'content' ]
            }).then((roompd) => {



                res.status(200);
                res.json({ plugin_major: roomp, plugin_content: roompd })
            })

        })

    },

    updatePluginPlayer(req, res){

        User.findOne({
            where: {
                id: req.body.iduser
            },
            attributes: ['id']
        }).then((user) => {

            RoomPlugins.findOne({
                where: {
                    idOwner: req.body.iduser
                },
                attributes: ['idOwner']
            }).then((roomd) => {

                RoomData.findOne({
                    attributes: [ 'idMesa', 'idMaster' ]
                }).then((rest) => {

                
                    if(roomd.idOwner == rest.idMaster) {
                        res.status(404);
                        res.json({ err: "Não é jogador da sala!" })
                    } else {
                        RoomPlugin.update({
                            status: 1
                        }, {
                            where: {
                                idRoom: rest.idMesa
                            }
                        })
                        RoomPluginData.update({
                            title: req.body.title,
                            content: req.body.content
                        }, {
                            where: {
                                idRoom: rest.idMesa
                            }
                        })

                        res.status(200);
                        res.json({ msg: "Ficha atualizada." })
                    }
                }).catch((err) => {
                    res.status(400);
                    console.log("Erro de Comparação")
                })
            }).catch((err) => {
                res.status(400);
                console.log("Erro em encontrar o dono da ficha")
            })
        }).catch(() => {
            res.status(400);
            console.log("Erro em encontrar o usuário")
        })

    },

    updatePluginOwner(req, res) {

        
        User.findOne({
            where: {
                id: req.body.iduser
            },
            attributes: ['id']
        }).then((user) => {

            RoomPlugins.findOne({
                where: {
                    idOwner: req.body.iduser
                },
                attributes: ['idOwner']
            }).then((roomd) => {

                RoomData.findOne({
                    attributes: [ 'idMesa', 'idMaster' ]
                }).then((rest) => {

                
                    if(roomd.idOwner == rest.idMaster) {
                        RoomPluginData.update({
                            title: req.body.title,
                            content: req.body.content
                        }, {
                            where: {
                                idRoom: rest.idMesa
                            }
                        })
                        
                        res.status(200);
                        res.json({ msg: "Ficha atualizada." })
                    } else {
                        res.status(404);
                        res.json({ err: "Não é mestre da sala!" })
                    }
                }).catch((err) => {
                    res.status(400);
                    console.log("Erro de Comparação")
                })
            }).catch((err) => {
                res.status(400);
                console.log("Erro em encontrar o dono da ficha")
            })
        }).catch(() => {
            res.status(400);
            console.log("Erro em encontrar o usuário")
        })

    },

    removePlugin(req, res){


        User.findOne({
            where: {
                id: req.body.iduser
            },
            attributes: [ 'id' ]
        }).then((useri) => {

            RoomPlugins.findOne({
                where: {
                    idOwner: useri.id
                },
                attributes: [ 'idOwner', 'amount' ]
            }).then((rrio) => {
                
                RoomPluginData.destroy({
                    where: {
                        idOwner: rrio.idOwner
                    }
                })

                const minus = -1;                

                RoomPlugin.update({
                    amount: minus
                }, 
                {
                    where: {
                        idOwner: useri.id
                    }
                })
            })

            res.status(200);
            res,json({ msg: "Ficha destruída!" })
        })


       

    },

    addAssistMaster(req, res) {

        User.findOne({
            where: {
                id: req.body.iduser
            },
            attributes: ['id']
        }).then((useri) => {

            RoomData.findOne({
                where: {
                    idMesa: req.body.idroom
                }
            }).then((roomd) => {

                if(roomd) {
                    
                    RoomData.update({
                        assistMasters: useri.id
                    }, {
                        where: {
                            idMesa: roomd.idMesa
                        }
                    })

                    res.status(200);
                    res.json({ msg: "Mestre Auxiliar adicionado!" })
                } else {
                    res.status(404);
                    res.json({ err: "Erro em adicionar o Mestre Auxiliar!" })
                }
            }) 

        })

    },

    addPlayer(req, res){

        
        User.findOne({
            where: {
                id: req.body.iduser
            },
            attributes: ['username']
        }).then((useri) => {

            RoomData.findOne({
                where: {
                    idMesa: req.body.idroom
                }
            }).then((roomd) => {

                if(roomd) {
                    
                    RoomData.update({
                        players: useri.username
                    }, {
                        where: {
                            idMesa: roomd.idMesa
                        }
                    })

                    res.status(200);
                    res.json({ msg: "Jogador adicionado!" })
                } else {
                    res.status(404);
                    res.json({ err: "Erro em adicionar o Jogador!" })
                }
            }) 

        })

    },


}