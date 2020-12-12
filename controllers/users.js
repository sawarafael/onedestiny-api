const User = require('./../models/User/user');
const Userdata = require('./../models/User/userdata');
const Userrole = require('./../models/User/userrole');
const Userfriend = require('./../models/User/userrelationships');
const Userfriendcode = require('./../models/User/userrelationshipstatus');
const Userfavorites = require('./../models/User/userfavorites');
const Usermedals = require('./../models/User/usermedals');
const Userpost = require('./../models/User/userposts');
const Userpostcomment = require('./../models/User/userpostcomments');
const Role = require('./../models/User/role');

const tags = require('./../models/tags');

const bcrypt = require('bcrypt');
const salt = 10;

const JWT = require('jsonwebtoken');
const Medals = require('../models/Medals');
const Userpostcomments = require('./../models/User/userpostcomments');
const Tag = require('./../models/tags');

const JWT_SECRET_TOKEN_USER =       "gX1IXdY7aVWol1pS4T2Xjg1";
const JWT_SECRET_TOKEN_MOD=         "9BLhrpsc-z4FavRKH6BVUg";
const JWT_SECRET_TOKEN_PREMIUM=     "gX1IXdY7aVWol1pS4T2Xjg2";
const JWT_SECRET_TOKEN_ADMIN=       "MiySQzMg3d8YnEMwHfbgJQ";

//Pertence ao User
Userdata.belongsTo(User, {
    allowNull: false
})

Userrole.belongsTo(User, {
    allowNull: false
})

Userrole.belongsTo(Role, {
    allowNull: false
})

Usermedals.belongsTo(User, {
    allowNull: false
})

Usermedals.belongsTo(Medals, {
    allowNull: false
})

Userpost.belongsTo(User, {
    allowNull: false
})

Userpostcomments.belongsTo(Userpost, {
    allowNull: false
})

Userfavorites.belongsTo(User, {
    allowNull: false
})

//Outro tem um tal
Role.hasOne(Userrole, {
    onDelete: "cascade",
    onUpdate: "cascade"
})

Medals.hasOne(Usermedals, {
    onDelete: "cascade",
    onUpdate: "cascade"
})

//User tem um ou muitos tals
User.hasOne(Userdata, {
    onDelete: "cascade",
    onUpdate: "cascade"
})

User.hasOne(Userrole, {
    onDelete: "cascade",
    onUpdate: "cascade"
})

User.hasMany(Userpost, {
    onDelete: "cascade",
    onUpdate: "cascade"
})

Userpost.hasMany(Userpostcomment, {
    onDelete: "cascade",
    onDelete: "cascade"
})

User.hasMany(Userfavorites, {
    onDelete: "cascade",
    onUpdate: "cascade"
})

User.hasOne(Usermedals, {
    onDelete: "cascade"
})


module.exports = {

    signupUser(req, res) {

        User.findOne({
            where: {
                 email:      req.body.email.trim().toLowerCase(),
                 username:   req.body.username
             },
             attributes : ['id']
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

               Userdata.create({
                   userId: user.id,
                   nickname: null,
                   coverPage: null,
                   avatar: null,
                   bio: null
               })
               Role.findOne({ 
                   where: {
                       id: 1
                   },
                   attributes: ['id']
                }).then((resp) => {                   
                    Userrole.create({
                        userId: user.id,
                        roleId: resp.id
                    })
                })
            })
       })      
            

    } })

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
                                    attributes: ['id', 'username']
                                }).then((useri) => {

                                        Userrole.findOne({
                                            where: {
                                                userId: useri.id
                                            },
                                            attributes: ['roleId']
                                            }).then((userro) => { 
                                                
                                                Role.findOne({
                                                    where: {
                                                        id: userro.roleId
                                                    },
                                                    attributes: ['id', 'permission']
                                                }).then((role) => {
                                                    
                                                    console.log(role.id)
                                                    
                                                    if(userro.roleId == 1) {
                                                        JWT.sign({ id: userAuth.id, username: userAuth.username }, 
                                                        JWT_SECRET_TOKEN_USER, {expiresIn: '48h'}, (err, token) => {
                                                            if(err){
                                                                res.status(400);
                                                                res.json({err: "Falha Interna - Falha em processar o Token - User."})
                                                            } else {
                                                                res.status(200);
                                                                res.json({token: token, id: useri.id, role: role.permission})
                                                            }
                                                        })
                                                    } else if(userro.roleId == 2) {
                                                        JWT.sign({ id: userAuth.id, username: userAuth.username }, 
                                                        JWT_SECRET_TOKEN_PREMIUM, {expiresIn: '48h'}, (err, token) => {
                                                            if(err){
                                                                res.status(400);
                                                                res.json({err: "Falha Interna - Falha em processar o Token - Premium."})
                                                            }else {
                                                                res.status(200);
                                                                res.json({token: token, id: useri.id, role: role.permission})
                                                            }
                                                        })
                                                    } else if(userro.roleId == 4) {
                                                        JWT.sign({ id: userAuth.id, username: userAuth.username }, 
                                                        JWT_SECRET_TOKEN_ADMIN, {expiresIn: '48h'}, (err, token) => {
                                                            if(err){
                                                                res.status(400);
                                                        res.json({err: "Falha Interna - Falha em processar o Token - Administrador"})
                                                    }else {
                                                        res.status(200);
                                                        res.json({token: token, id: useri.id, role: role.permission})
                                                    }
                                                })
                                            } else if(userro.roleId == 3) {
                                                JWT.sign({ id: userAuth.id, username: userAuth.username }, 
                                                    JWT_SECRET_TOKEN_MOD, {expiresIn: '48h'}, (err, token) => {
                                                    if(err){
                                                        res.status(400);
                                                        res.json({err: "Falha Interna - Falha em processar o Token - Moderador"})
                                                    }else {
                                                        res.status(200);
                                                        res.json({token: token, id: useri.id, role: role.permission})
                                                    }
                                                })
                                            } else {
                                                res.status(401)
                                                res.json({ err: "Usuário não possui cargo especificado!" })
                                            }
                                        }).catch((err) => {
                                            res.status(400);
                                            res.json({ err: "Não foi possível entregar a permissão ao usuário." })
                                        })
                                    }).catch((err) => {
                                        res.status(400);
                                        res.json({ err: "Não foi possível encontrar o cargo do usuário." })
                                    })
                                }).catch((err) => {
                                    res.status(400);
                                    res.json({ err: "Usuário inexistente ou não foi possível encontrar seu dado." })
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

        User.findAll({
            where: { id: req.query.id }, 
            include: [{model: Userdata, attributes:['nickname', 'avatar', 'coverPage', 'bio', 'level']},
                      {model: Userrole, attributes: ['roleId'],
                      include:[{model: Role, attributes: ['permission']}]
                      }
                     ],
            attributes: ['id', 'username']
         }).then((userd) => {
            res.status(200); 
            res.json({ userd })            
        }).catch((err) => {
            res.status(400);
            res.json({ err: "Não foi possível encontrar o o usuário." })
        })
    },

    datachange(req, res){

        User.findOne({
            where: {
                id: req.params.id
            }
        }).then((userv) => {

            Userdata.update({
                nickname: req.body.nickname,
                avatar: req.body.avatar,
                coverPage: req.body.coverPage,
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

            Userdata.findOne({
                where: {
                    id: req.query.id
                }
            }).then((userlvl) => {

                const count = userlvl.level;

                newlvl = count + 1;

                    Userdata.update({
                        level: newlvl
                    }, {
                        where: {
                            id: req.query.id
                        }
                    })
                    res.status(200);
                    res.json({ msg: "Level do Usuário Atualizado!" })
            }).catch((err) => {
                res.status(400);
                res.json({ err: "Falha em encontrar o Usuário." })
            })

    },

    friendListRequest(req, res) {

        User.findOne({
            where: {
                id: req.body.id1
            },
            attributes: ['id']
        }).then((uservo) => {
            
            if(uservo) { 
                User.findOne({
                    where: {
                        id: req.body.id2
                    },
                    attributes: ['id']
                }).then((uservt) => {

                    if(uservt) {

                        Userfriend.findOne({
                            where: {
                                idUserOne: uservo.id,
                                idUserTwo: uservt.id
                            }
                        }).then((exist) => {
                            if(exist) {
                                res.status(401);
                                res.json({ err: "Este relacionamento já existe." })
                            } else {
                                Userfriend.create({
                                    idUserOne: uservo.id,
                                    idUserTwo: uservt.id,
                                    statusCode: 1
                                }).then((res) => {
                                    res.status(200);
                                    res.json({ msg: "Requisição de Amizade realizada!" })
                                }).catch((err) => {
                                    res.json({ err })
                                })
                            }
                        }).catch((err) => {
                            res.status(400);
                            res.json({ err: "Erro em encontrar as Amizades" })
                        })                        
                    }else {
                        res.status(401);
                        res.json({ err: "Não foi possível confirmar o usuário requisitado." })
                    }
                }).catch((err) => {
                    res.status(400);
                    res.json({ err: "Não foi possível encontrar o usuário requisitado." })
                })
            } else {
                res.status(401);
                res.json({ err: "Não foi possível confirmar o usuário requerente." })
            }
        }).catch((err) => {
            res.status(400);
            res.json({ err: "Não foi possível encontrar o usuário requisitado." })
        })
    },

    friendListUpdate(req, res) {
        
            const resp = req.params.resp;

            switch(resp) {
                case '1': 
                        Userfriend.update({
                            statusCode: 1,
                        }, {
                            where: {
                                    idUserOne: req.body.id1,
                                    idUserTwo: req.body.id2
                            }
                        })
                        res.status(200);
                        res.json({ msg: "Requisição confirmada." })
                        break;
                case '2': 
                        Userfriend.update({
                            statusCode: 2
                        }, {
                            where: {
                                    idUserOne: req.body.id1,
                                    idUserTwo: req.body.id2
                        }
                        })
                        res.status(200);
                        res.json({ msg: "Requisição confirmada." })
                        break;
                case '3': 
                        Userfriend.update({
                            statusCode: 3
                        }, {
                            where: {
                                    idUserOne: req.body.id1,
                                    idUserTwo: req.body.id2
                        }
                        })
                        res.status.update(200);
                        res.json({ msg: "Requisição confirmada." })
                        break;                        
                case '4':
                        Userfriend.update({
                            statusCode: 4
                        }, {
                            where: {
                                    idUserOne: req.body.id1,
                                    idUserTwo: req.body.id2
                            }
                        })
                        res.status.update(200);
                        res.json({ msg: "Requisição confirmada." })
                        break;
                case '5':
                        Userfriend.update({
                            statusCode: 5
                            }, {
                                where: {
                                        idUserOne: req.body.id1,
                                        idUserTwo: req.body.id2
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

    friendListViewAll(req, res){

        Userfriend.findOne({
            where: {
                idUserOne: 1
            },
            include: [
                {model: Userfriendcode, attributes: ['statusCode', 'name']},
                {model: User, attributes: ['id', 'username'], 
            include: [{model: Userdata, attributes: ['nickname', 'avatar', 'level']}]}
            ]
        }).then((resp) => {
            res.json({ resp })
        }).catch((err) => {
            res.json({ err })
        })

    },
    
    userpostNewPost(req, res) {

        User.findOne({ 
            where: {
                id: req.body.id
            },
            attributes: ['id']
        }).then((useri) => {
            
            Userpost.create({
                content: req.body.content,
                userId: useri.id
            }).then(() => {
                res.status(200);
                res.json({ msg: "Post criado!" })
            })
        }).catch((err) => {
            res.status(400);
            res.json({ err: "Não foi possível encontrar o usuário." })
        })
            
    },

    userpostNewComment(req, res){

        User.findOne({ 
            where: {
                id: req.body.id
            },
            attributes: ['id']
        }).then((useri) => {

            Userpost.findOne({
                where: {
                    id: req.body.idpost
                },
                attributes: ['id']
            }).then((userp) => {               

                Userpostcomments.create({
                    content: req.body.content,
                    userId: useri.id,
                    userpostId: userp.id
                }).then(() => {
                    res.status(200);
                    res.json({ msg: "Comentário realizado!" })
                }).catch((err) => {
                    res.status(400);
                    res.json({ err: "Não foi possível comentar." })
                })
            }).catch((err) => {
                res.status(400);
                res.json({ err: "Não foi possível encontrar o usuário." })
            })
        }).catch((err) => {
            res.status(400);
            res.json({ err: "Não foi possível encontrar o usuário." })
        })

    },

    userpostView(req, res){

        User.findOne({ 
            where: {
                id: req.query.id
            },
            include: [
                {model: Userpost, attributes: ['id', 'content', 'createdAt'],
            include:[{model: Userpostcomments, attributes: ['id', 'content', 'createdAt'], 
            include:[{model: User, attributes: ['id', 'username'], 
            include: [{model: Userdata, attributes: ['avatar']}]}]}]}
            ],
            attributes: ['username']
        }).then((resp) => {
            res.status(200);
            res.json({ resp })
        }).catch((err) => {
            res.status(400);
            res.json({ err: "Não foi possível encontrar os posts deste usuário." })
        })

    },

    addUserTagsFavorites(req, res){
        
        User.findOne({
            where: {
                id: req.body.id
            },
            attributes: ['id']
        }).then((useri) => {

            tags.findOne({
                where: {
                    id: req.body.tagid
                },
                attributes: ['id']
            }).then((tags) => {
                
                Userfavorites.findOne({ 
                    where: {
                        tagId: tags.id,
                        userId: useri.id
                    },
                    attributes: ['tagId']
                }).then((exist) => {
                    
                    if(exist) {
                        res.status(401);
                        res.json({ msg: "Este usuário já possui esta Tag." })
                    } else {
                        Userfavorites.create({
                            tagId: tags.id,
                            userId: useri.id
                        }).then((resp) => {
                            res.status(200);
                            res.json({ msg: "Tag adicionada ao Usuário." })
                        }).catch((err) => {
                            res.status(400);
                            res.json({ err: "Falha em adicionar a tag para o Usuário." })
                        })
                    }
                }).catch((err) => {
                    res.status(400);
                    res.json({ err: "Falha em comparar a existência da Tag."  })
                })
            }).catch((err) => {
                res.status(400);
                res.json({ err: "Falha em encontrar a Tag para comparar."})
            })
        }).catch((err) => {
            res.status(400);
            res.json({ err: "Falha em encontrar o usuário." })
        })
    },

    viewUserTagsFavorites(req, res){

        User.findOne({
            where: {
                id: req.query.id
            },
            include: [{model: Userfavorites, attributes: ['tagId'],
            include: [{model: Tag, attributes: ['title', 'description']}] }],
            attributes: ['id']
        }).then((usertags) => {
            res.status(200);
            res.json({ usertags })
        }).catch((err) => {
            res.status(400);
            res.json({ err: "Não foi possível encontrar as Tags do Usuário." })
        })
    },

    addUserMedals(req, res){

        User.findOne({
            where: {
                id: req.body.id
            },
            attributes: ['id']
        }).then((useri) => {

            Medals.findOne({
                where: {
                    id: req.body.medalid
                },
                attributes: ['id']
            }).then((medals) => {

                Usermedals.findOne({ 
                    where: {
                        medalId: medals.id,
                        userId: useri.id
                    }
                }).then((exist) => {

                    if(exist) {
                        res.status(401);
                        res.json({ msg: "Este usuário já possui esta Medalha - Insígnia." })
                    } else {
                        Usermedals.create({
                            medalId: medals.id,
                            userId: useri.id
                        }).then((resp) => {
                            res.status(200);
                            res.json({ msg: "Medalha - Insígnia adicionado ao Usuário." })
                        }).catch((err) => {
                            res.status(400);
                            res.json({ err: "Falha em adicionar a Medalha - Insígnia ao Usuário." })
                        })
                    }
                }).catch((err) => {
                    res.status(400);
                    res.json({ err: "Falha em comparar a existência da Medalha - Insígnia." })
                })
            }).catch((err) => {
                res.status(400);
                res.json({ err: "Falha em encontrar a Medalha - Tag para comparar." })
            })
        }).catch((err) => {
            res.status(400);
            res.json({ err: "Falha em encontrar o Usuário." })
        })
    },

    viewUserMedals(req, res){

        User.findOne({
            where: {
                id: req.query.id
            },
            include: [{model: Usermedals, attributes: ['medalId'],
            include: [{model: Medals, attributes: ['name', 'description', 'img']}]}],
            attributes: ['id']
        }).then((usermedals) => {
            res.status(200);
            res.json({ usermedals })
        }).catch((err) => {
            res.status(400);
            console.log(err)
        })
    }

}