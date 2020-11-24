const User = require('./../models/User/user');
const Userrole = require('./../models/User/userrole');
const Userpunish = require('./../models/User/punisheduser');

const tags = require('./../models/tags');
const article = require('./../models/Article/article');


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
            console.log("Falha em ")
        })
    },

    AdmSeeTag(req, res) {

        tags.findAll({ 
            attributes: [
                'id', 'title', 'description'
            ]
        }).then((tagerr) => {
            res.status(200);
            res.json({ data: tagerr })
        }).catch((err) => {
            res.status(400);
            res.json({ err: err })
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
        })
    },

    AdmRemoveTag(req, res) {

        tags.destroy({
            where: {
                title: req.body.title,
            }
        })

        tags.findOne({
            where: {
                title: req.body.title
            }, 
            attributes: ['title']
        }).then((art) => {

            if(art) {
                res.status(400);
                res.json({ err: "A Tag não foi removido!" })
            } else {
                res.status(200);
                res.json({ msg: "Tag removido com sucesso!" })
            }
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

                article.create({
                    title: req.body.title,
                    body: req.body.bodie
                })
                res.status(200);
                res.json({ msg: "Artigo criado com sucesso!" })
            }
        }).catch((err) => {
            res.status(401);
            res.json({ err: "Falha em criar um novo artigo." })
        })

    },

    AdmSeeArticle(req, res) {

        article.findAll({
            attributes: [
                'id', 'title', 'body'
            ]
        }).then((art) => {
            res.status(200);
            res.json({ data: art })
        }).catch((err) => {
            res.status(400);
            res.json({ err: err })
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
        })

    },

    AdmRemoveArticle(req, res) {

        article.destroy({ 
            where: {
                title: req.body.title
            }
        })

        article.findOne({
            where: {
                title: req.body.title
            }, 
            attributes: ['title']
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

    AdmNewMod(req, res) {

        User.findOne({
            where: {
                username: req.body.username,
                id: req.body.id
            }, 
            attributes: [
                'id', 'username'
            ]
        }).then((userr) => {

            Userrole.findOne({
                where: {
                    id: userr.id
                },
                attributes: [ 'mod' ]
            }).then((userro) => {

                if(userro.mod == 0) {

                    Userrole.update({
                        free: 0,
                        mod: 1
                    }, {
                        where: {
                            id: userr.id
                        }
                    })

                    res.status(200);
                    res.json({ msg: "O Usuário agora é um Moderador do Programa!" })

                } else {

                    res.status(404);
                    res.json({ err: "Falha em tornar o usuário Moderador do Programa." })

                }
            })
        })

    },

    AdmRemoveMod(req, res){

        
        User.findOne({
            where: {
                username: req.body.username,
                id: req.body.id
            }, 
            attributes: [
                'id', 'username'
            ]
        }).then((userr) => {

            Userrole.findOne({
                where: {
                    id: userr.id
                },
                attributes: [ 'mod' ]
            }).then((userro) => {

                if(userro.mod == 1) {

                    Userrole.update({
                        free: 1,
                        mod: 0
                    }, {
                        where: {
                            id: userr.id
                        }
                    })

                    res.status(200);
                    res.json({ msg: "O Usuário não é Mais Moderador do Programa!" })

                } else {

                    res.status(404);
                    res.json({ err: "Falha em retirar a Moderação do Usuário!" })

                }
            })
        })

    },

    AdmPuneUser(req, res) {

        User.findOne({ 
            where: {
                id: req.body.id,
                username: req.body.username
            }, 
            attributes: [
                'id', 'username'
            ]
        }).then((userp) => {

            if(userp){

                Userpunish.create({
                    idUser: userp.id,
                    case: req.body.case,
                    action: req.body.action,
                    dateReturn: req.body.dateR
                })

                res.status(200);
                res.json({ msg: "Reclamação ou Ação realizada!" })

            } else {

                res.status(404);
                res.json({ err: "Usuário não encontrado." })

            }

        })

    },

    AdmSeePuneUser(req,res) {

        Userpunish.findAll({
            attributes: [
                'idUser', 'case', 'action', 'dateReturn'
            ]
        }).then((userp) => {
            res.status(200);
            res.json({ data: userp })
        }).catch((err) => {
            res.status(400);
            res.json({ err: "Reclamação ou Ação não encontrado!" })
        })

    },

    AdmNiceUser(req, res){

        Userpunish.findOne({
            where: {
                idUser: req.body.id
            }
        }).then((userp) => {

            if(userp) {

                Userpunish.update({
                    case: req.body.case,
                    action: req.body.action,
                    dateReturn: null
                })

                res.status(200);
                res.json({ msg: "O problema foi resolvido!" })

            } else {
                
                res.status(404);
                res.json({ err: "Falha em retirar a Moderação do Usuário!" })

            }

        })


    }

}