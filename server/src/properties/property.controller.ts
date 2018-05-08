import * as express from 'express';

import { PropertyService } from './property.service';

const propertyService = new PropertyService();

const controller = express.Router();

controller.post('/', async (req, res) => {
  const query = req.body;
  const properties = await propertyService.listProperties(query, req.query.offset, req.query.limit);
  res.send(properties);
});

controller.post('/getProperty', async (req, res) => {
  const id = req.body.propertyId;
  const property = await propertyService.getProperty(id);
  res.send(property);
});

controller.post('/createProperty', async (req, res) => {
  const property = req.body.newProperty;
  const id = await propertyService.createProperty(property);
  console.log("Created Property with ID", id);
  res.send({id: id});
});



export { controller as PropertyController };
