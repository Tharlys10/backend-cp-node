import { ICreateCityDTO } from '@modules/cities/dtos/ICreateCityDTO';
import { City } from '@modules/cities/infra/typeorm/entities/City';
import { ICitiesRepository } from '../ICitiesRepository';

class CitiesRepositoryInMemory implements ICitiesRepository {
  private cities: City[] = [];

  async find(
    limit: number = 10,
    page: number = 1,
    name?: string,
    state?: string
  ): Promise<{ cities: City[]; total: number }> {
    const total = this.cities.length;

    let cities = this.cities;

    if (name) {
      cities = cities.filter(
        (city) => city.name.toLowerCase().indexOf(name.toLowerCase()) > -1
      );
    }

    if (state) {
      cities = cities.filter(
        (city) => city.state.toLowerCase() === state.toLowerCase()
      );
    }

    cities = cities.splice((page - 1) * limit, limit);

    return { cities, total };
  }

  async findById(id: string): Promise<City | undefined> {
    const city = this.cities.find((city) => city.id === id);

    return city;
  }

  async findByState(state: string): Promise<City[]> {
    const cities = this.cities.filter((city) => city.state === state);

    return cities;
  }

  async findByNameAndSate(
    name: string,
    state: string
  ): Promise<City | undefined> {
    const city = this.cities.find(
      (city) => city.name === name && city.state === state
    );

    return city;
  }

  async create({ name, state }: ICreateCityDTO): Promise<City> {
    const city = new City();

    Object.assign(city, {
      name,
      state,
    });

    this.cities.push(city);

    return city;
  }
}

export { CitiesRepositoryInMemory };
