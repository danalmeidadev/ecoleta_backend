import {Request, Response} from 'express';
import knex from '../database/connect';
class ItemsController {   
    async index (request: Request, response: Response) {
        const URL = "http://192.168.0.110:3333/uploads";
        const items = await knex('item').select('*');
        const serializedItems = items.map(item => {
            return {
                id: item.id,
                title: item.title,
                image_url: `${URL}/${item.image}`,
            }
        })
       return response.json(serializedItems);
    }
}

export default ItemsController;