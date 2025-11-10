export class Recipe {
  id: string;
  Title: string;
  preparation_time: number;
  dificulty: number;
  budget: number;
  description: string;

  constructor(
    id: string,
    Title: string,
    preparation_time: number,
    dificulty: number,
    budget: number,
    description: string,
  ) {
    this.id = id;
    this.Title = Title;
    this.preparation_time = preparation_time;
    this.dificulty = dificulty;
    this.budget = budget;
    this.description = description;
  }
}
