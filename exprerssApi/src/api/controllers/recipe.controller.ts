import { Request, Response } from 'express';
import { container } from '../app';
import {
  GetAllRecipesUseCase,
  GetRecipeByIdUseCase,
  CreateRecipeUseCase,
  UpdateRecipeUseCase,
  DeleteRecipeUseCase,
} from '../../core/application/features/recipes/usecase';

export const getAllRecipesController = async (_req: Request, res: Response) => {
  const useCase = container.inject<GetAllRecipesUseCase>(
    'GetAllRecipesUseCase',
  );
  const response = await useCase.execute();
  res.json(response);
};

export const getRecipeByIdController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const useCase = container.inject<GetRecipeByIdUseCase>(
    'GetRecipeByIdUseCase',
  );
  const response = await useCase.execute(id);
  if (!response.data)
    return res.status(404).json({ message: 'Recipe not found' });
  res.json(response);
};

export const createRecipeController = async (req: Request, res: Response) => {
  const useCase = container.inject<CreateRecipeUseCase>('CreateRecipeUseCase');
  const response = await useCase.execute(req.body.data);
  res.status(201).json(response);
};

export const updateRecipeController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const useCase = container.inject<UpdateRecipeUseCase>('UpdateRecipeUseCase');
  const response = await useCase.execute({ id, input: req.body.data });
  if (!response.data)
    return res.status(404).json({ message: 'Recipe not found' });
  res.json(response);
};

export const deleteRecipeController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const useCase = container.inject<DeleteRecipeUseCase>('DeleteRecipeUseCase');
  const response = await useCase.execute(id);
  if (!response.success)
    return res.status(404).json({ message: 'Recipe not found' });
  res.json(response);
};
