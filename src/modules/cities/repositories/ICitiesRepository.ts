import { ICreateCityDTO } from '../dtos/ICreateCityDTO';
import { City } from '../infra/typeorm/entities/City';

interface ICitiesRepository {
  find(
    limit: number,
    page: number,
    name?: string,
    state?: string
  ): Promise<{ cities: City[]; total: number }>;
  findById(id: string): Promise<City | undefined>;
  findByState(state: string): Promise<City[]>;
  findByNameAndSate(name: string, state: string): Promise<City | undefined>;
  create(data: ICreateCityDTO): Promise<City>;
}

export { ICitiesRepository };
