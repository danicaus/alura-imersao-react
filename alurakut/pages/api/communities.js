import { SiteClient } from 'datocms-client'


export default async function recebedorRequests(req, res) {
    
    if(req.method === "POST"){
        const TOKEN = '7dcde56f70bc2a2583d86f3cc92909';
        const client = new SiteClient(TOKEN)

        const registroCriado = await client.items.create({
            itemType: '975380',
            ...req.body,
        })

        console.log(registroCriado)

        res.json({
            dados: 'Um teste muito louco',
            registro: registroCriado
        })
        return;
    }

    res.status(404).json({
        message: "Não é possível criar uma comunidade assim "
    })
}