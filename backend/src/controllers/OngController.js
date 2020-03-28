const connection = require('../database/connection');

const crypto = require('crypto');

module.exports ={
    async store (req, res){
        const { name, email, whatsapp, city, uf } = req.body;
        const id = crypto.randomBytes(4).toString('HEX');
    
    await connection('ongs').insert({
        id,
        name,
        email,
        whatsapp,
        city,
        uf,
    }).catch(err => {
        
    })

    return res.json({ id });
    },
    async list(req, res){
        const ongs = await connection('ongs').select('*').catch(err => {
           return res.json({err});
        })
        return res.json(ongs);
    }
}