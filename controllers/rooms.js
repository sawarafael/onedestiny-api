const User = require('./../models/User/user');
const Userfriends = require('./../models/User/userrelationships');
const Userfavorites = require('./../models/User/userfavorites');

const Room = require('./../models/Room/room');
const RoomPlugin = require('../models/Room/roomrecords');
const Roomdata = require('./../models/Room/roomData');
const Roomplayers = require('./../models/Room/roomplayers');

const Tag = require('./../models/tags');
const Roomdatawikia = require('../models/Room/roomdatawikia');
const RoomAssistentMaster = require('../models/Room/roomassistmaster');
const Userdata = require('../models/User/userdata');
const Roomrecord = require('../models/Room/roomrecords');
const Roomrecordinfo = require('../models/Room/roomrecordinfo');
const Roomfile = require('../models/Room/roomfile');

//Algo pertence a algo
Roomdata.belongsTo(Room, {
    foreignKey: {
        allowNull: false
    }
})

Roomdatawikia.belongsTo(Room, {
    foreignKey: {
        allowNull: false
    }
})

Roomplayers.belongsTo(Roomdata, {
    foreignKey: {
        allowNull: false
    }
})

//Algo possui algo
Room.hasOne(Roomdata, {
    onDelete: "cascade",
    onUpdate: "cascade"
})

Room.hasOne(Roomdatawikia, {
    onDelete: "cascade",
    onUpdate: "cascade"
})

Roomdata.hasOne(Roomplayers, {
    onDelete: "cascade",
    onUpdate: "cascade"
})

Roomdata.hasOne(RoomAssistentMaster, {
    onDelete: "cascade",
    onUpdate: "cascade"
})

Room.hasMany(Roomrecord, {
    onDelete: "cascade",
    onUpdate: "cascade"
})

Room.hasMany(Roomfile, {
    onDelete: "cascade",
    onUpdate: "cascade"
})

Roomrecord.hasOne(Roomrecordinfo, {
    onDelete: "cascade",
    onUpdate: "cascade"
})


module.exports = {

    createRoom(req, res) {        
        
        Room.findOne({
            where: {
                roomName: req.body.roomname,
            },
            attributes: ['id', 'roomName']
        }).then((exist) => {
            
            if(exist){
                res.status(401);
                res.json({ err: "Uma mesa com o mesmo nome já existe." })
            } else { 
                
                User.findOne({
                    where: {
                        id: req.body.id
                    },
                    attributes: ['id']
                }).then((useri) => {

                    Room.create({
                        roomName: req.body.roomname,
                        userId: useri.id
                    }).then((r) => {

                        Roomdata.create({
                            description: req.body.description,
                            avatar: req.body.avatar,
                            createdAt: req.body.datecreated,
                            roomId: r.id,
                            tagId: req.body.tagsid,
                            userId: useri.id
                        }).then((rd) => {

                            Roomdatawikia.create({
                                content: null,
                                images: null,
                                toRecord: null,
                                roomId: rd.id
                            }).then(() => {   
                                res.status(200);
                                res.json({ msg: "Mesa criada com sucesso!" })
                            })
                        }).catch((err) => {
                            res.status(400);
                            res.json({ err: "Não foi possível criar os dados da mesa.", error: err })
                        })
                    }).catch((err) => {
                        res.status(400);
                        res.json({ err: "Não foi possível criar a mesa." })
                    }) 
                }).catch((err) => {
                    res.status(400);
                    res.json({ err: "Não foi possível encontrar o usuário." })
                })   
            }
        }).catch((err) => {
            res.status(400);
            res.json({ err: "Não foi possível encontrar a mesa." })
        })        
    },

    updateDataRoom(req, res){

        Room.findOne({
            where: {
                id: req.params.idroom
            },
            attributes: ['id']
        }).then((exist) => {
            
            if(exist) {

                Room.update({
                    roomName: req.body.roomname
                }, {
                    where: {
                        id: exist.id
                    }
                })
                Roomdata.update({
                    description: req.body.description,
                    avatar: req.body.avatar,
                }, {
                    where: {
                        roomId: exist.id
                    }
                })
                Roomdatawikia.update({
                    content: req.body.content,
                    images: req.body.images,
                    toRecord: req.body.toRecord
                }, {
                    where: {
                        roomId: exist.id
                    }
                })

                res.status(200);
                res.json({ msg: "Mesa atualizada." })

            } else {
                res.status(401);
                res.json({ err: "Mesa não existe." })
            }
            
        }).catch((err) => {
            res.status(400);
            res.json({ err: "Não foi possível encontrar a Mesa." })
        })

    },

    seeDataRoom(req, res){

       Room.findOne({
            where: {
                id: 1
            },
            include: [{model: Roomdata, attributes: ['description', 'avatar']},
                      {model: Roomdatawikia, attributes: ['content', 'images', 'toRecord']}
            ],
            attributes: ['roomName']
       }).then((rd) => {
           res.status(200);
           res.json({ rd });
       }).catch((err) => {
           res.status(400);
           res.json({ err: "Não foi possível encontrar os dados da mesa." });
       })
    },

    seeAllRooms(req,res) {

        Room.findAll({
            include: [{model: Roomdata, attributes: ['description', 'avatar']}],
            attributes: ['roomName']
        }).then((ra) => {
            res.status(200);
            res.json({ ra })
        }).catch((err) => {
            res.status(400);
            res.json({ err: "Não foi possível encontrar as mesas." })
        })
    },

    seeUserPlayingRooms(req, res){
        
        User.findOne({ 
            where: {
                id: req.query.id
            },
            attributes: ['id']
        }).then((useri) => {

            Roomplayers.findAll({
                where: {
                    userId: useri.id
                },
                include: [{model: Roomdata, attributes: ['description', 'avatar'], 
                include: [{model: Room, attributes: ['roomName']}]}]
            }).then((find) => {
                res.status(200);
                res.json({ find })
            }).catch((err) => {
                res.status(400)
                res.json({ err: "Não foi possível encontrar as mesas." })
            })
        }).catch((err) => {
            res.status(400);
            res.json({ err: "Não foi possível encontrar o usuário." })
        })
    },

    seeUserFriendRooms(req, res){

        Userfriends.findOne({            
            where: {
                idUserOne: req.query.id
            },
            include: [{model: User, attributes: ['username']}],
            attributes: ['idUserTwo']
        }).then((find) => {
            
            Room.findAll({
                where: {
                    userId: find.idUserTwo
                },
                include: [{model: Roomdata, attributes: ['description', 'avatar']},
                          {model: User, attributes: ['id', 'username']}],
                attributes: ['roomName']
            }).then((findr) => {
                res.status(200);
                res.json({ findr });
            }).catch((err) => {
                res.status(400);
                res.json({ err: "Não foi possível encontrar as mesas - ou o tal amigo não possui ainda." })
            })
        }).catch((err) => {
            res.status(400);
            res.json({ err: "Não foi possível encontrar o amigo do usuário." })
        })

    },

    seeUserTagsRooms(req, res){

        User.findOne({
            where: {
                id: req.query.id
            }, 
            include: [{model: Userfavorites, attributes: ['tagId']}],
            attributes: ['id']
        }).then((find) => {
                        
            Roomdata.findAll({
                where: {
                    tagId: find.userfavorites.map(x => x.tagId)
                },
                include: [{model: Room, attributes: ['roomName']}],
                attributes: ['description', 'avatar']
            }).then((findm) => {
                res.json({ findm })
            })

        }).catch((err) => {
            res.status(400);
            res.json({ err: "Não foi possível encontrar o usuário." })
        })        
    },
    
    addPlayer(req, res){
        
        User.findOne({
            where: {
                id: req.params.iduser
            },
            attributes: ['id']
        }).then((useri) => {
            
            if(useri){
                Room.findOne({
                    where: {
                        id: req.params.idroom
                    },
                    include: [{model: Roomdata, attributes: ['id']}],
                    attributes: ['id']
                }).then((find) => {

                    Roomplayers.create({
                        userId: useri.id,
                        roomdatumId: find.roomdatum.id,
                        roomplacecodeId: 1
                    }).then(() => {
                        res.status(200);
                        res.json({ msg: "Novo player adicionado para esta mesa." })
                    }).catch((err) => {
                        res.status(400);
                        res.json({ error: err, fail: "Falha em adicionar o player para esta mesa." })
                    })
                }).catch((err) => {
                    res.status(400);
                    res.json({ err: "Falha em encontrar a mesa." })
                })
            } else {
                res.status(401);
                res.json({ err: "Usuário fantasma?" })
            }
        }).catch((err) => {
            res.status(400);
            res.json({ err: "Falha em encontrar o usuário." })
        })

    },

    addAssistMaster(req, res) {

        User.findOne({
            where: {
                id: req.params.iduser
            },
            attributes: ['id']
        }).then((useri) => {
            
            if(useri){
                Room.findOne({
                    where: {
                        id: req.params.idroom
                    },
                    include: [{model: Roomdata, attributes: ['id']}],
                    attributes: ['id']
                }).then((find) => {
                    RoomAssistentMaster.create({
                        userId: useri.id,
                        roomdatumId: find.roomdatum.id,
                        roomplacecodeId: 1
                    })
                    res.status(200);
                    res.json({ msg: "O usuário é Mestre Assistente dessa Sala de Rpg."})
                }).catch((err) => {
                    res.status(400);
                    res.json({ err: "Falha em encontrar a mesa." })
                })
            } else {
                res.status(401);
                res.json({ err: "Usuário fantasma?" })
            }
        }).catch((err) => {
            res.status(400);
            res.json({ err: "Falha em encontrar o usuário." })
        })
    },

    seePlayersAndAssists(req, res){

        Roomdata.findAll({
            where: {
                roomId: req.query.idroom
            },
            include: [{model:Roomplayers, attributes:['userId'],
            include:[{model:User, attributes: ['username'],
            include: [{model: Userdata, attributes: ['nickname', 'avatar']}]}]},
            {model: RoomAssistentMaster, attributes: ['userId'], 
            include: [{model: User, attributes: ['username'], 
            include: [{model: Userdata, attributes: ['nickname', 'avatar']}]}]}
        ],
        attributes: ['id']
        }).then((findpa) => {
            res.status(200);
            res.json({ findpa })
        }).catch((err) => {
            res.status(400);
            res.json({ err: "Não foi possível encontrar os mestres auxiliares ou jogadores desta mesa." })
        })

    },

    addRecord(req, res){

        User.findOne({ 
            where: {
                id: req.body.id
            },
            attributes: ['id']
        }).then((useri) => {
            
                Room.findOne({
                    where: {
                        id: req.body.idroom
                    },
                    attributes: ['id']
                }).then((rexist) => {                    
                    
                        if(!rexist) {
                            res.status(401);
                            res.json({ err: "Esta mesa não existe!" });
                        } else {                            
                            Roomrecord.create({
                                userId: useri.id,
                                roomId: rexist.id
                            }).then((rr) => {
                                Roomrecordinfo.create({
                                    roomrecordIdRecord: rr.idRecord,
                                    title: req.body.title,
                                    content: null,
                                    lelelCharacter: null,
                                    barOne: null,
                                    barTwo: null,
                                    barThree: null,
                                    barFour: null,
                                    barFive: null,
                                    CharacterPhrase: null
                                }).then(() => {
                                    res.status(200);
                                    res.json({ msg: "Ficha para o usuário na tal mesa foi criada." })
                                }).catch((err) => {
                                    res.status(400);
                                    res.json({ err: "Não foi possível criar a ficha para o usuário." })
                                })
                            }).catch((err) => {
                                res.status(400);
                                res.json({ err: "Falha em criar a ficha do usuário." })
                            })
                        }                    
                    }).catch((err) => {
                        res.status(400);
                        res.json({ err: "Não foi possível encontrar a Mesa." })
                    })
                }).catch((err) => {
                    res.status(400);
                    res.json({ err: "Não foi possível encontrar o Usuário" })
                })
    },

    updateRecordInfo(req, res){
        
        User.findOne({ 
            where: {
                id: req.body.id
            },
            attributes: ['id']
        }).then((useri) => {
            
                Room.findOne({
                    where: {
                        id: req.body.idroom
                    },
                    attributes: ['id']
                }).then((rexist) => {                    
                    
                        if(!rexist) {
                            res.status(401);
                            res.json({ err: "Esta mesa não existe!" });
                        } else {          
                            Roomrecord.findOne({
                                where: {
                                    idRecord: req.body.idrecord
                                },
                                attributes: ['idRecord']
                            }).then((find) => {
                                Roomrecordinfo.update({
                                    title: req.body.title,
                                    content: req.body.content,
                                    levelCharacter: req.body.levelcharacter,
                                    barOne: req.body.barone,
                                    barTwo: req.body.bartwo,
                                    barThree: req.body.barthree,
                                    barFour: req.body.barfour,
                                    barFive: req.body.barfive,
                                    CharacterPhrase: req.body.characterphrase
                                },{
                                    where: {
                                        roomrecordIdRecord: find.idRecord
                                    }
                                }).then(() => {
                                    res.status(200);
                                    res.json({ msg: "Ficha atualizada." })
                                })
                            }).catch((err) => {
                                res.status(400);
                                res.json({ err: "Não foi possível encontrar a ficha." })
                            })
                        }
                    }).catch((err) => {
                        res.status(400);
                        res.json({ err: "Não foi possível encontrar a mesa." })
                    })
        }).catch((err) => {
            res.status(400);
            res.json({ err: "Não foi possível encontrar o usuário."})
        })
    },

    viewRecords(req, res){
        
        Room.findOne({
            where: {
                id: req.query.id
            },
            include: [{model: Roomrecord, attributes: ['roomId', 'userId'], 
            include: [{model: Roomrecordinfo},
                      {model: User, attributes: ['id','username']}]}],
            attributes: ['id', 'roomName']
        }).then((find) => {
            res.status(200);
            res.json({ find })
        }).catch((err) => {
            res.status(400);
            console.log(err)
        })

    },

    createRoomFiles(req, res){

        Room.findOne({
            where: {
                id: req.body.idroom
            },
            attributes: ['id']
        }).then((rexist) => {
            
            Roomfile.create({
                title: req.body.title,
                content: req.body.content,
                roomId: rexist.id
            }).then(() => {
                res.status(200);
                res.json({ msg: "Arquivo para mesa criado com sucesso!" });
            }).catch((err) => {
                res.status(400);
                res.json({ err: "Não foi possível criar um arquivo para esta mesa." })
            })
        }).catch((err) => {
            res.status(400);
            res.json({ err: "Não foi possível encontrar a mesa." })
        })
    },

    updateRoomFiles(req, res){
        
        Room.findOne({
            where: {
                id: req.body.idroom
            },
            attributes: ['id']
        }).then((rexist) => {
            Roomfile.update({
                title: req.body.title,
                content: req.body.content
            }, {
                where: {
                    roomId: rexist.id
                }
            }).then(() => {
                res.status(200);
                res.json(({ msg: "Arquivo desta mesa atualizada." }))
            }).catch((err) => {
                res.status(400);
                res.json({ msg: "Não foi possível atualizar o arquivo desta mesa." })
            })
        }).catch(() => {
            res.status(400);
            res.json({ err: "Não foi possível encontrar a mesa." })
        })
    },

    viewRoomFiles(req, res){

        Room.findOne({
            where: {
                id: req.query.file
            },
            include: [{model: Roomfile, attributes: ['title', 'content']}],
            attributes: ['id']
        }).then((rexist) => {
            res.status(200);
            res.json({ rexist })
        }).catch((err) => {
            res.status(400);
            console.log(err)
            res.json({ err: "Não foi possível encontrar os arquivos desta mesa.", error: err })
        })
    }
}