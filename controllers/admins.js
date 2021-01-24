const User = require('./../models/User/user');
const Userrole = require('./../models/User/userrole');

const tags = require('./../models/tags');
const article = require('./../models/Article/article');
const Ticket = require('../models/Report/ticket');
const Coordenator = require('../models/Report/coordenator');
const Role = require('../models/User/role');
const Action = require('../models/Report/action');
const Punishment = require('../models/Report/punishment');


Ticket.hasOne(Coordenator, {
    onDelete: "cascade",
    onUpdate: "cascade"
})

Ticket.hasOne(Action, {
    onDelete: "cascade",
    onUpdate: "cascade"
})

Action.hasOne(Punishment, {
    onDelete: "cascade",
    onUpdate: "cascade"
})



module.exports = {

    AdmNewTag(req, res) {
        
        tags.findOne({
            where: {
                title: req.body.title
            }, 
            attributes: ['title']
        }).then((tagerr) => {

            if(tagerr) {
                res.status(400);
                res.json({ err: "Esta Tag já foi criada!" });
             } else {
                tags.create({
                    title: req.body.title,
                    description: req.body.description
                })
                res.status(200);
                res.json({ msg: "Tag criado com sucesso!" })
            }

        }).catch((err) => {
            console.log("Falha em criar a Tag")
        })
    },

    AdmUpdateTag(req, res) {

        tags.findOne({
            where: {
                title: req.body.title1
            }
        }).then((tagerr) => {

            tags.update({
                title: req.body.title2, 
                description: req.body.description
            }, {
                where: {
                    title: req.body.title1
                }
            })

            res.status(200);
            res.json({ msg: "Tag atualizada!"});
        }).catch((err) => {
            res.status(400);
            res.json({ err: "Não foi possível localizar as Tags para atualizar!" })
        })
    },

    AdmRemoveTag(req, res) {

        tags.destroy({
            where: {
                title: req.body.title,
            }
        }).then((art) => {
            if(art) {
                res.status(401);
                res.json({ err: "A Tag foi removido!" })
            } else {
                res.status(200);
                res.json({ msg: "Tag não foi removido!" })
            }
        }).catch((err) => {
            res.status(400);
        })


    },

    AdmNewArticle(req, res) {

        article.findOne({
            where: {
                title: req.body.title
            }, 
            attributes: [ 
               'title', 'body' 
            ]
        }).then((art) => {

            if(art) {
                res.status(401);
                res.json({ err: "Artigo de mesmo nome já foi criado!" })
            } else {

                User.findOne({
                    where: {
                        id: req.body.id
                    }
                }).then((useri) => {
                    article.create({
                        title: req.body.title,
                        body: req.body.bodie,
                        tagId: req.body.tagid,
                        userId: useri.id
                    })

                    res.status(200);
                    res.json({ msg: "Artigo criado com sucesso!" })
                })

                
            }
        }).catch((err) => {
            res.status(400);
            res.json({ err: "Falha em criar um novo artigo." })
        })

    },

    AdmUpdateArticle(req, res) {

        article.findOne({ 
            where: {
                title: req.body.title1
            }
        }).then((art) => {

            article.update({
                title: req.body.title2,
                body: req.body.bodie
            }, {
                where: {
                    title: req.body.title1
                }
            })

            res.status(200);
            res.json({ msg: "Artigo atualizado!" })
        }).catch((err) => {
            res.status(400);
            res,json({ err: "Falha em encontrar o Artigo para atualiza-lo!" })
        })

    },

    AdmRemoveArticle(req, res) {

        article.destroy({ 
            where: {
                title: req.body.title
            }
        }).then((art) => {            
            if(art) {
                res.status(200);
                res.json({ msg: "Artigo removido com sucesso!" })
            } else {                
                res.status(400);
                res.json({ err: "Artigo não foi removido ou não existe!" })
            }
        })

    },

    AdmSeeAllTickets(req, res){

        Ticket.findAll({
            include: [
                      {model: User, attributes: ['id', 'username'],
            include: [{model: Userrole, attributes: ['roleId'],
            include: [{model: Role, attributes: ['name']}]}]},
                      {model: Coordenator, attributes: ['userId'], 
            include: [{model: User, attributes: ['id', 'username'], 
            include: [{model: Userrole, attributes: ['roleId'], 
            include: [{model: Role, attributes: ['name']}]}]}]},
        ]
        }).then((find) => {
            res.json({ find })
        }).catch((err) => {
            console.log(err)
        })
    },

    AdmSetCoord(req, res){

        Ticket.findOne({
            where: {
                id: req.body.idt
            },
            include: [{model: Coordenator, attributes: ['idCoord']}],
            attributes: ['id']
        }).then((findt) => {

            if(findt.coordenator === null){
                User.findOne({
                    where: {
                        id: req.body.idu
                    },
                    attributes: ['id']
                }).then((findu) => {
                    
                    Coordenator.update({
                        userId: findu.id,
                        ticketId: findt.id
                    }, {
                        where: {
                            idCoord: findt.id
                        }
                    })
                    res.status(200);
                    res.json({ msg: "Coordenador deste Ticket selecionado." })
                }).catch((err) => {
                    res.status(400);
                    res.json({ err: "Não foi possível achar o Administrador ou Moderador." })
                })
            } else {
                res.status(401);
                res.json({ err: "Este caso já foi pego por um Administrador!" })
            }            
        }).catch((err) => {
            res.status(400);
            res.json({ err: "Não foi possível encontrar o Ticket." })
        })
    },

    AdmSetAction(req, res){

        function addMonths(date, months) {
            var d = date.getDate();
            date.setMonth(date.getMonth() + +months);
            if (date.getDate() != d) {
              date.setDate(0);
            }
            return date;
        }
        
        const nothing = {
            severity: null,
            action: null,
            execution: null,
            datePunishBegin: null,
            dateReturn: null 
        }
        const lowPunishment = {
            severity: "Baixa",
            action: "Solução Rápida.",
            execution: "O Usuário Reclamado irá ter 1 mês de suspensão do Sistema.",
            datePunishBegin: addMonths(new Date(), 0),
            dateReturn: addMonths(new Date(), 1)   
        }
        const mediumPunishment = {
            severity: "Média",
            action: "Solução Mediana e com Tempo Demorado.",
            execution: "O Usuário Reclamado irá ter 3 mêses de suspensão do Sistema.",
            datePunishBegin: addMonths(new Date(), 0),
            dateReturn: addMonths(new Date(), 3)
        }
        const severePunishment = {
            severity: "Alta",
            action: "Solução Grave e com Tempo Alto.",
            execution: "O Usuário Reclamado irá ter 6 meses de suspensão do Sistema",
            datePunishBegin: addMonths(new Date(), 0),
            dateReturn: addMonths(new Date(), 6)
        }
        const randomPunishment = {
            severity: req.body.sever,
            action: req.body.action,
            execution: req.body.exec,
            datePunishBegin: req.body.db,
            dateReturn: req.body.dr
        }
        
        User.findOne({
            where: {
                id: req.params.id
            },
            include: [{model: Userrole, attributes: ['roleId'],
            include: [{model: Role, attributes: ['permission']}]}
        ],
            attributes: ['id']
        }).then((isr) => {

            Role.findOne({
                where: {
                    permission: isr.userrole.role.permission
                },
                attributes: ['permission']
            }).then((permission) => {

                if(permission.permission != 3 && permission.permission != 2) {
                    res.status(401);
                    res.json({ res: "Autorização negada." })
                } else {
                    const resp = req.body.resp;

                    Ticket.findOne({
                        where: {
                            id: req.query.idt
                        },
                        include: [{model: Coordenator, attributes: ['idCoord']}],
                        attributes: ['id']
                    }).then((findt) => {

                        Coordenator.findOne({
                            where: {
                                userId: isr.id,
                                idCoord: findt.coordenator.idCoord
                            }
                        }).then((ea) => {                           
                            
                            switch(resp){
                                    case'0': 
                                        Action.update({
                                            severity: nothing.severity,
                                            action: nothing.action
                                        }, {
                                            where: {
                                                    idAction: findt.id  
                                            }
                                        }).then((fine) => {
                                            
                                            Punishment.update({
                                                execution: nothing.execution,
                                                datePunishBegin: nothing.datePunishBegin,
                                                dateReturn: nothing.dateReturn
                                            },
                                            {
                                                where: {
                                                    actionIdAction: findt.id
                                                }
                                            })
                                        })
                                        res.status(200);
                                        res.json({ msg: "Problema resolvido."});
                                        break;
                                    case '1': 
                                        Action.update({
                                            severity: lowPunishment.severity,
                                            action: lowPunishment.action
                                        }, {
                                            where: {
                                                    idAction: findt.id  
                                        }
                                        }).then((fine) => {
                                        
                                            Punishment.update({
                                                execution: lowPunishment.execution,
                                                datePunishBegin: lowPunishment.datePunishBegin,
                                                dateReturn: lowPunishment.dateReturn
                                            },
                                            {
                                                where: {
                                                    actionIdAction: findt.id
                                            }
                                            })
                                        })
                                        res.status(200);
                                        res.json({ msg: "Problema resolvido."});
                                        break;
                                    case'3':
                                        Action.update({
                                            severity: mediumPunishment.severity,
                                            action: mediumPunishment.action
                                        }, {
                                            where: {
                                                    idAction: findt.id  
                                        }
                                        }).then((fine) => {
                                    
                                            Punishment.update({
                                                execution: mediumPunishment.execution,
                                                datePunishBegin: mediumPunishment.datePunishBegin,
                                                dateReturn: mediumPunishment.dateReturn
                                            },
                                            {
                                                where: {
                                                    actionIdAction: findt.id
                                            }
                                            })
                                        })
                                        res.status(200);
                                        res.json({ msg: "Problema resolvido."});
                                        break;
                                    case'6':
                                        Action.update({
                                            severity: severePunishment.severity,
                                            action: severePunishment.action
                                        }, {
                                            where: {
                                                    idAction: findt.id  
                                        }
                                        }).then((fine) => {
                                    
                                            Punishment.update({
                                                execution: severePunishment.execution,
                                                datePunishBegin: severePunishment.datePunishBegin,
                                                dateReturn: severePunishment.dateReturn
                                            },
                                            {
                                                where: {
                                                    actionIdAction: findt.id
                                            }
                                            })
                                        })
                                        res.status(200);
                                        res.json({ msg: "Problema resolvido."});
                                        break; 
                                    case'10':
                                        Action.update({
                                            severity: randomPunishment.severity,
                                            action: randomPunishment.action
                                        }, {
                                            where: {
                                                    idAction: findt.id  
                                        }
                                        }).then((fine) => {
                                    
                                            Punishment.update({
                                                execution: randomPunishment.execution,
                                                datePunishBegin: randomPunishment.datePunishBegin,
                                                dateReturn: randomPunishment.dateReturn
                                            },
                                            {
                                                where: {
                                                    actionIdAction: findt.id
                                            }
                                            })
                                        })
                                        res.status(200);
                                        res.json({ msg: "Problema resolvido."});
                                        break;                                                                                      
                                    default:
                                        res.status(404);
                                        res.json({ err: "Status não identificado." })
                                        }
                        })
                    }).catch((err) => {
                        res.status(400);
                        res.json({ err, r: "erro"})
                    })
                }
            }).catch((err) => {
                res.status(400);
                res.json({ err: "Usuário não permitido." })
            })
        }).catch((err) => {
            res.status(400);
            console.log(err)
            res.json({ err: err })
        })
    },

    newMod(req, res){

        User.findOne({
            where: {
                id: req.query.id
            },
            include: [{model: Userrole, attributes: ['roleId'], 
            include: [{model: Role, attributes: ['permission']}]}],
            attributes: ['id']
        }).then((existu) => {

            Role.findOne({
                where: {
                    permission: existu.userrole.role.permission
                },
                attributes: ['permission']
            }).then((permission) => {

                if(permission.permission != 3 && permission.permission != 2) {
                    res.status(401);
                    res.json({ res: "Autorização negada." })
                } else {
                    
                    User.findOne({
                        where: {
                            id: req.body.idn
                        }
                    }).then((existn) => {

                        Userrole.update({
                            roleId: 2
                        }, {
                            where: {
                                userId: existn.id
                            }
                        }).then(() => {
                            res.status(200);
                            res.json({ msg: "O usuário agora é um Moderador!" })
                        }).catch((err) => {
                            res.status(400);
                            res.json({ err: "Não foi possível tornar o usuário em moderador." })
                        })
                    }).catch((err) => {
                        res.status(400);
                        console.log(err)
                        res.json({ err: "Não foi possível encontrar o usuário requerido." })
                    })
                }
            }).catch((err) => {
                res.status(400);
                res.json({ err: "Não foi possível comparar as permissões."})
            })
        }).catch((err) => {
            res.status(400);
            res.json({ err: "Não foi possível encontrar o Usuário." })
        })


    },

    removeMod(req, res){
        
        User.findOne({
            where: {
                id: req.query.id
            },
            include: [{model: Userrole, attributes: ['roleId'], 
            include: [{model: Role, attributes: ['permission']}]}],
            attributes: ['id']
        }).then((existu) => {

            Role.findOne({
                where: {
                    permission: existu.userrole.role.permission
                },
                attributes: ['permission']
            }).then((permission) => {

                if(permission.permission != 3 && permission.permission != 2) {
                    res.status(401);
                    res.json({ res: "Autorização negada." })
                } else {
                    
                    User.findOne({
                        where: {
                            id: req.body.idn
                        }
                    }).then((existn) => {

                        Userrole.update({
                            roleId: 1
                        }, {
                            where: {
                                userId: existn.id
                            }
                        }).then(() => {
                            res.status(200);
                            res.json({ msg: "O usuário deixou de ser Moderador." })
                        }).catch((err) => {
                            res.status(400);
                            res.json({ err: "Não foi possível tornar o usuário em moderador." })
                        })
                    }).catch((err) => {
                        res.status(400);
                        console.log(err)
                        res.json({ err: "Não foi possível encontrar o usuário requerido." })
                    })
                }
            }).catch((err) => {
                res.status(400);
                res.json({ err: "Não foi possível comparar as permissões."})
            })
        }).catch((err) => {
            res.status(400);
            res.json({ err: "Não foi possível encontrar o Usuário." })
        })


    }


    

}