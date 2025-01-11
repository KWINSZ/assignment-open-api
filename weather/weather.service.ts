import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class WeatherService {
  private readonly apiUrl = 'https://api.openweathermap.org/data/2.5/weather';
  private readonly apiKey = 'ac722b04a79d435d4cf3e1b4caba21ce';

  async getWeather(location: string = 'Bacoor,PH', units: string = 'metric', lang: string = 'en') {
    try {
      const response = await axios.get(this.apiUrl, {
        params: {
          q: location, // Use the city and country code
          units, // 'metric' for Celsius, 'imperial' for Fahrenheit
          lang, // Language of the response
          appid: this.apiKey, // API key
        },
      });

      return response.data; // Return the weather data
    } catch (error) {
      console.error('Error fetching weather data:', error.message);
      throw new HttpException(
        error.response?.data || 'Failed to fetch weather data',
        error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
