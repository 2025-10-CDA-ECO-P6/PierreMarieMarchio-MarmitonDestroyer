import {
  createRecipeUseCase,
  deleteRecipeUseCase,
  getAllRecipesUseCase,
  getRecipeByIdUseCase,
  updateRecipeUseCase,
} from '../../core/application/features/recipes/usecase';
import { Request, Response } from 'express';

export const getAllRecipesController = async (_req: Request, res: Response) => {
  const response = await getAllRecipesUseCase();
  res.json(response);
};

export const getRecipeByIdController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const response = await getRecipeByIdUseCase(id);
  if (!response.data)
    return res.status(404).json({ message: 'Recipe not found' });
  res.json(response);
};

export const createRecipeController = async (req: Request, res: Response) => {
  const response = await createRecipeUseCase(req.body.data);
  res.status(201).json(response);
};

export const updateRecipeController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const response = await updateRecipeUseCase(id, req.body.data);
  if (!response.data)
    return res.status(404).json({ message: 'Recipe not found' });
  res.json(response);
};

export const deleteRecipeController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const response = await deleteRecipeUseCase(id);
  if (!response.success)
    return res.status(404).json({ message: 'Recipe not found' });
  res.json(response);
};
