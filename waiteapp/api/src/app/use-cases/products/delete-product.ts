import { Request, Response } from 'express';

import { Product } from '../../models/product';

export async function deleteProduct(req: Request, res: Response) {
  try {
    const { productId } = req.params;
    await Product.findByIdAndDelete(productId);

    res.sendStatus(204);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
}
