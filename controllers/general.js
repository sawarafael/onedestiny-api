const Article = require('../models/Article/article');
const Tag = require('../models/tags');
const Userdata = require('../models/User/userdata');
const Action = require('./../models/Report/action');
const Coordenator = require('./../models/Report/coordenator');
const Punishment = require('./../models/Report/punishment');
const Ticket = require('./../models/Report/ticket');

const User = require('./../models/User/user');

module.exports = {

    addTicket(req, res){

        Ticket.findOne({
            where: {
                userClaimantId: req.body.id1,
                userAclaimedId: req.body.id2
            },
            include: [{model: User, attributes: ['id', 'username']}],
            attributes: ['userAclaimedId', 'userClaimantId']
        }).then((exist) => {

            if(exist) {
                const message = `Este Usuário Reclamante já reclamou deste Usuário Reclamado.`

                Ticket.create({
                    title: req.body.title,
                    report: req.body.report,
                    proofs: req.body.proofs,
                    userClaimantId: req.body.id1,
                    userAclaimedId: req.body.id2
                }).then(() => {

                    Coordenator.create({
                        userId: null
                    }).then(() => {
                        Action.create({
                            severity: null,
                            action: null
                        }).then((a) => {
                            Punishment.create({ 
                                execution: null,
                                datePunish: null,
                                dateReturn: null,
                                actionIdAction: a.idAction
                            }).then(() => {
                                res.status(200);
                                res.json({ msg: "Ticket criado com sucesso!", attention: message })
                            }).catch((err) => {
                                res.status(400);
                                res.json({ err: "Não foi possível criar a punição do usuário." })
                            })
                        }).catch((err) => {
                            res.status(400);
                            res.json({ err: "Não foi possível criar a ação do administrador." })
                        })
                    }).catch((err) => {
                        res.status(400);
                        res.json({ err: "Não foi possível criar o Coordenador." })
                    })
                })
            } else {
                Ticket.create({
                    title: req.body.title,
                    report: req.body.report,
                    proofs: req.body.proofs,
                    userClaimantId: req.body.id1,
                    userAclaimedId: req.body.id2
                }).then(() => {

                    Coordenator.create({
                        userId: null
                    }).then(() => {
                        Action.create({
                            severity: null,
                            action: null
                        }).then((a) => {
                            Punishment.create({ 
                                execution: null,
                                datePunish: null,
                                dateReturn: null,
                                actionIdAction: a.idAction
                            }).then(() => {
                                res.status(200);
                                res.json({ msg: "Ticket criado com sucesso!" })
                            }).catch((err) => {
                                res.status(400);
                                res.json({ err: "Não foi possível criar a punição do usuário." })
                            })
                        }).catch((err) => {
                            res.status(400);
                            res.json({ err: "Não foi possível criar a ação do administrador." })
                        })
                    }).catch((err) => {
                        res.status(400);
                        res.json({ err: "Não foi possível criar o Coordenador." })
                    })
                })
            }
        }).catch((err) => {
            res.status(400);
            res.json({ err: "Não foi possível encontrar o Ticket para identificação de casos parecidos." })
        })
    },

    seeIfUserIsPunished(req, res){

        Punishment.findAll({
            include: [{model: Action, attributes: ['severity']}],
            attributes: ['id', 'datePunishBegin', 'dateBegin']
        }).then((er) => {

            User.findOne({
                where: {
                    id: req.query.id
                },
                attributes: ['id']
            }).then((yeo) => {  
                Ticket.findAll({
                    where: {
                        userAclaimedId: yeo.id
                    },
                    include: [{model: User, attributes: ['id', 'username']}],
                    attributes: ['id','userAclaimedId']
                }).then((our) => {
                    res.status(200);
                    res.json({ our })
                })
        }).catch((err) => {
            res.status(400);
            res.json({ err: "O Usuário está livre de reclamações ou algum tipo de problema." })
        })
    }).catch((err) => {
        res.status(400);
        res.json({ err: "Não foi possível encontrar a Gambiarra deste usuário. "})
    })

    },

    seeArticle(req, res){

        Article.findAll({
            include: [{model: User, attributes:['id', 'username'], 
            include: [{model: Userdata, attributes: ['avatar', 'bio']}]},
                      {model: Tag, attributes: ['title', 'description']}]
        }).then((find) => {
            res.status(200);
            res.json({ find })
        }).catch((err) => {
            res.status(400);
            res.json({ err: "Não foi possível encontrar um usuário." })
        })
    },

    seeTags(req, res){

        Tag.findAll({ 
        }).then((find) => {
            res.status(200);
            res.json({ find })
        }).catch((err) => {
            res.status(400);
            res.json({ err: "Não foi possível encontrar as Tags." })
        })

    }

}