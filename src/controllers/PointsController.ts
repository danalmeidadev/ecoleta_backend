
import {Request, Response} from 'express';
import knex from '../database/connect';

class PointsController {
    async index(request: Request, response: Response) {
        const {city, uf, items} = request.query;
       const parsedItems = String(items).split(',')
       .map(item => Number(item
        .trim()));

        const points = await knex('point')
        .join('point_items', 'point.id', '=', 'point_items.point_id')
        .whereIn('point_items.item_id', parsedItems)
        .where('city', String(city))
        .where('uf', String(uf))
        .distinct()
        .select('point.*');

        return response.json(points);
    }


    async show (request: Request, response: Response){
        const { id } = request.params;
        const point = await knex('point').where('id', id).first();
        if(!point){
            return response.status(400).json({message: 'Nenhum ponto encontrado, tente novamnte'});
        }

        const items = await knex('item')
        .join('point_items', 'item.id', '=', 'point_items.item_id')
        .where('point_items.point_id', id)
        .select('item.title');
        
        return response.json({point, items});
    }

    async create (request: Request, response: Response) {
        const {
           name,
           email,
           whatsapp,
           latitude,
           longitude,
           city,
           uf,
           items
    
        } = request.body;
    
       const trx = await knex.transaction();

       const points = {
        image: 'image-fake',
        name,
        email,
        whatsapp,
        latitude,
        longitude,
        city,
        uf 
       };
    
       const insertsIds =  await knex('point').insert(points);
    
        const point_id = insertsIds[0];
    
        const pointItems = items.map((item_id: number) => {
            return{
               item_id,
               point_id 
            }
        })
        await trx('point_items').insert(pointItems);

        await trx.commit();
    
        return response.json({
            id: point_id,
            ...points
        });
    
    }

    
}

export default PointsController;
