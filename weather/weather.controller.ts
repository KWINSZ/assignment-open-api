import { Controller, Get, Query } from '@nestjs/common';
import { WeatherService } from './weather.service';

@Controller('weather')
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}

  @Get()
  async getWeather(
    @Query('location') location: string,
    @Query('units') units: string = 'imperial',
    @Query('lang') lang: string = 'en',
  ) {
    if (!location) {
      throw new Error('Location query parameter is required');
    }

    return this.weatherService.getWeather(location, units, lang);
  }
}
