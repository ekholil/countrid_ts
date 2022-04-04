export interface countryDataModel {
    capital: string[];
    flags: {
      png: string;
    };
    latlng: number[];
    name: {
      common: string;
    };
    population: number;
  }
export interface weatherDataModel {
    current: {
      cloudcover: number;
      feelslike: number;
      humidity: number;
      is_day: string;
      observation_time: string;
      precip: number;
      pressure: number;
      temperature: number;
      uv_index: number;
      visibility: number;
      weather_code: number;
      weather_descriptions: string[];
      weather_icons: string[];
      wind_degree: number;
      wind_dir: string;
      wind_speed: number;
    };
    location: {
      country: string;
      lat: string;
      lon: string;
      name: string;
    };
  }