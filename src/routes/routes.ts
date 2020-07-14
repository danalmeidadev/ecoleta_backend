import express from "express";
import knex from '../database/connect';
import PointsController from '../controllers/PointsController';
import ItemsController from '../controllers/ItemsController';

const routes = express.Router();

const pointsController = new PointsController();
const intemsController = new ItemsController();

routes.get('/items', intemsController.index);
routes.post('/points', pointsController.create);
routes.get('/points', pointsController.index);
routes.get('/points/:id', pointsController.show);
export default routes;