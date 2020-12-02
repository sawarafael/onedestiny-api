const User = require('./../models/User/user');
const UserData = require('./../models/User/userdata');
const Userfavorite = require('./../models/User/userfavorite');
const Userfriends = require('./../models/User/userfriends');
const Userrole = require('./../models/User/userrole');

const bcrypt = require('bcrypt');
const salt = 10;

const JWT = require('jsonwebtoken');
const Userdata = require('./../models/User/userdata');


module.exports = {

    signupUser(req, res) {

        User.findOne({
            where: {
                 email:      req.body.email.trim().toLowerCase(),
                 username:   req.body.username
             }
        }).then(user => {
            if(user) {
                res.status(400);
                res.json({ err: "Este Email ou Usuário já está Cadastrado no Sistema!"});
                
            } else {
                
     
        bcrypt.hash(req.body.password, salt, function (err, hash) {
     
            User.create({
                username: req.body.username,
                email: req.body.email,
                password: hash
            }).then(user => {
                res.status(200);
                res.json({ msg: "Usuário cadastrado!"});

               UserData.create({
                   avatar: null,
                   bio: null,
                   level:  1,
               })
               Userfavorite.create({
                   idUser: user.id,
                   favoriteTags: null,
                   favoriteRooms: null
               })
               Userrole.create({
                   free: 1,
                   premium: 0,
                   adm: 0,
                   mod: 0
               })
            })
       })
       
            }
        })
     
     





    },

    signinUser(req, res){

        User.findOne({
            where: {
                username: req.body.username
        }
        }).then((userAuth) => {

            const us = userAuth.username;
            const ps = userAuth.password;

                if(!us) {
                    res.json({ error: "Usuário não encontrado." });
                } else {
                    bcrypt.compare(req.body.password, ps, function(err, result) {
                        if (result == true) {   

                                User.findOne({
                                    where: {
                                        username: us
                                    }, 
                                    attributes: [ 
                                        'id', 'username'
                                     ]
                                }).then((useri) => {

                                        Userrole.findOne({
                                            where: {
                                                id: useri.id
                                            }, 
                                            attributes: [
                                                'free', 'premium', 'adm', 'mod'
                                            ]
                                        }).then((userro) => {

                                            if(userro.free == true) {
                                                JWT.sign({ id: userAuth.id, username: userAuth.username }, 
                                                    process.env.JWT_SECRET_TOKEN_USER, {expiresIn: '48h'}, (err, token) => {
                                                    if(err){
                                                        res.status(400);
                                                        res.json({err: "Falha Interna"})
                                                    }else {
                                                        res.status(200);
                                                        res.json({token: token})
                                                    }
                                                })
                                            } else if(userro.premium == true) {
                                                JWT.sign({ id: userAuth.id, username: userAuth.username }, 
                                                    process.env.JWT_SECRET_TOKEN_PREMIUM, {expiresIn: '48h'}, (err, token) => {
                                                    if(err){
                                                        res.status(400);
                                                        res.json({err: "Falha Interna - Falha em processar o Token - Premium."})
                                                    }else {
                                                        res.status(200);
                                                        res.json({token: token})
                                                    }
                                                })
                                            } else if(userro.adm == true) {
                                                JWT.sign({ id: userAuth.id, username: userAuth.username }, 
                                                    process.env.JWT_SECRET_TOKEN_ADMIN, {expiresIn: '48h'}, (err, token) => {
                                                    if(err){
                                                        res.status(400);
                                                        res.json({err: "Falha Interna"})
                                                    }else {
                                                        res.status(200);
                                                        res.json({token: token})
                                                    }
                                                })
                                            } else if(userro.mod == true) {
                                                JWT.sign({ id: userAuth.id, username: userAuth.username }, 
                                                    process.env.JWT_SECRET_TOKEN_MOD, {expiresIn: '48h'}, (err, token) => {
                                                    if(err){
                                                        res.status(400);
                                                        res.json({err: "Falha Interna"})
                                                    }else {
                                                        res.status(200);
                                                        res.json({token: token})
                                                    }
                                                })
                                            } else {
                                                res.status(401)
                                                res.json({ err: "Usuário não possui cargo especificado!" })
                                            }
                                    })
                                })
                    } else {
                        res.status(404)
                        res.json({ error: "Senha inválida."});
                    }
                    });
                }

        }).catch((err) => {
            console.log("Erro em achar o usuário! " +err)
        })

    },

    dataview(req, res){ 

        User.findOne({
                where: { id : req.body.id } 
        }).then((userd) => {

            const user_view_id = userd.id;
            const user_view_username = userd.username;

            UserData.findOne({
                where: { id : user_view_id }
            }).then((userd) => {

                const user_data_avatar = userd.avatar;
                const user_data_bio = userd.bio;
                const user_data_lvl = userd.level;

                Userrole.findOne({
                    where: { id : user_view_id }
                }).then((userr) => {

                    const user_is_free = userr.free;
                    const user_is_premium = userr.premium;
                    const user_is_adm = userr.adm;
                    const user_is_mod = userr.mod;

                    Userfavorite.findOne({
                        where: { idUser: user_view_id }
                    }).then((userf) => {

                        const user_favorites_tags = userf.favoriteTags;
                        const user_favorites_rooms = userf.favoriteRooms;

                        res.status(200);
                        res.json({ user_view: { user_view_id, user_view_username }, 
                                   user_data: { user_data_avatar, user_data_bio, user_data_lvl }, 
                                   user_favs: { user_favorites_tags, user_favorites_rooms},
                                   user_role: { user_is_free, user_is_premium, user_is_adm, user_is_mod } });
                    })

                  
                })


            }).catch((err) => {
                res.status(404);
                res.json({ err: "Erro do Servidor ao Entregar os Dados." })
            })

            


        })
    },

    datachange(req, res){

        User.findOne({
            where: {
                id: req.body.id
            }
        }).then((userv) => {

            Userdata.update({
                avatar: req.body.avatar,
                bio: req.body.bio
            }, {
                where: {
                    id: userv.id
                }
                })

                res.status(200);
                res.json({ msg: "Perfil Atualizado!" });

        }).catch((err) => {
            res.status(404);
            res.json({ err: "Erro em encontrar o usuário." })
        })


    },

    levelup(req, res){

        const up = req.body.up;

        if (up == true && up == 1) {

            UserData.findOne({
                where: {
                    id: req.body.id
                }
            }).then((userlvl) => {

                const count = userlvl.level;

                newlvl = count + 1;

                    UserData.update({
                        level: newlvl
                    }, {
                        where: {
                            id: req.body.id
                        }
                    })

            }).catch((err) => {
                res.status(400);
                res.json({ err: "Falha em encontrar o Usuário." })
            })

        } else {
            res.status(404);
            res.json({ err: "Falha no Level Up!" })
        }
        


    },

    friendListRequest(req, res) {

        User.findOne({
            where: {
                id: req.body.id1
            }
        }).then((userv) => {

            const userv1 = userv.id;

            User.findOne({
                where: {
                    id: req.body.id2,
                    username: req.body.usernamer
                }
            }).then((userv) => {

                const userv2 = userv.id

                Userfriends.create({
                    idUser: userv1,
                    idFriend: userv2,
                    status: 0,
                    action: req.body.action
                })

                res.status(200);
                res.json({ msg: "Requisição de pedido de amizade realizada com sucesso!" })

            }).catch((err) => {
                res.status(404);
                res.json({ err: "Erro ao encontrar o usuário requerido." });
            })
        }).catch((err) => {
            res.status(404);
            res.json({ err: "Erro ao encontrar o usuário requerente."});
        })
    },

    friendListUpdate(req, res) {

        
            const resp = req.body.resp;

            switch(resp) {
                case '1': 
                        Userfriends.update({
                            status: 1,
                            action: req.body.action
                        }, {
                            where: {
                                    idUser: req.body.id1,
                                    idFriend: req.body.id2
                            }
                        })
                        res.status(200);
                        res.json({ msg: "Requisição confirmada." })
                        break;
                case '2': 
                        Userfriends.update({
                            status: 2,
                            action: req.body.action
                        }, {
                            where: {
                                    idUser: req.body.id1,
                                    idFriend: req.body.id2
                        }
                        })
                        res.status(200);
                        res.json({ msg: "Requisição confirmada." })
                        break;
                case '3': 
                        Userfriends.update({
                            status: 3,
                            action: req.body.action
                        }, {
                            where: {
                                    idUser: req.body.id1,
                                    idFriend: req.body.id2
                        }
                        })
                        res.status.update(200);
                        res.json({ msg: "Requisição confirmada." })
                        break;                        
                case '4':
                        Userfriends.update({
                            status: 4,
                            action: req.body.action
                        }, {
                            where: {
                                    idUser: req.body.id1,
                                    idFriend: req.body.id2
                            }
                        })
                        res.status.update(200);
                        res.json({ msg: "Requisição confirmada." })
                        break; 
                default: 
                        res.status(404);
                        res.json({ err: "Status não identificado!" })
            }

           

    },

    friendListView(req, res) {


        User.findOne({
            where: {
                id: req.body.id1
            }
        }).then((userv) => {

            const uservi = userv.id;

            Userfriends.findOne({
                where: {
                    idUser: uservi,
                }
            }).then((userf) => {

                const userfi = userf.idUser;
                
                if(userfi != uservi) {
                    res.status(400);
                    res.json({ err: "O Usuário ainda não tem amizades." })
                } else {
                    
                    Userfriends.findAll({
                        where: {
                            idUser: uservi
                        }, 
                        attributes: ['idFriend', 'status']
                    }).then((userfr) => {
                        res.status(200);
                        res.json({ id_user: uservi, user_friends: userfr })
                    })
                }

                
            }).catch((err) => {
                res.status(404);
                res.json({ err: "Erro ao tentar encontrar o ID do Usuário." })
            })

        }).catch((err) => {
            res.status(400);
            res.json({ err: "Usuário não encontrado." })
        })

    },

    UserFavoriteAddFavorites(req, res){

        User.findOne({
            where: {
                id: req.body.id
            },
            attributes: [ 'id' ]
        }).then((useri) => {

            Userfavorite.findOne({
                where: {
                    idUser: useri.id
                }
            }).then((userfa) => {

                const favorites = {
                    tag: req.body.tag,
                    room: req.body.room
                }

                console.log(favorites + useri.id)

                
                Userfavorite.update({ 
                    favoriteTags: favorites.tag,
                    favoriteRooms: favorites.room
                }, {
                    where: {
                        idUser: userfa.idUser
                    }
                })

                res.status(200)

            })

        })

    },

    UserFavoritesView(req, res) {

        User.findOne({
            where: {
                id: req.body.id
            }, 
            attributes: [ 'id' ]
        }).then((useri) => {

            Userfavorite.findOne({
                where: {
                    idUser: req.body.id
                }
            }).then((userfa) => {

                res.status(200);
                res.json({ favoriteTags: [userfa.favoriteTags], favoriteRooms: [userfa.favoriteRooms]  })

            }).catch((err) => {
                res.status(400);
                res.json({ err: "O usuário não possui registros de favoritos." })
            })            
        }).catch(() => {
            res.status(400);
            res.json({ err: "Usuário não encontrado." })
        }) 
    }


}