import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

type fetchWeather = {
  base: string;
  clouds: { all: number };
  cod: number;
  coord: { lon: number; lat: number };
  dt: number;
  id: number;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    sea_level: number;
    humidity: number;
    grnd_level: number;
  };
  name: string;
  sys: {
    type: number;
    id: number;
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  visibility: number;
  weather: { id: number; main: string; description: string; icon: string }[];
  wind: { speed: number; deg: number; gust: number };
};

export const fetchWeather = createAsyncThunk<fetchWeather, number[], {}>(
  "weather/fetchWeather",
  async function (coords) {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${coords[0]}&lon=${coords[1]}&appid=7f6b4081e42acb33bcce11a03f4d3526`
    );
    const data = await response.json();
    return data;
  }
);

type weather = {
  data: { temp: number; humidity: number; speed: number } | null;
  status: string;
};

const initialState: weather = {
  data: null,
  status: "loading",
};

export const weatherSlice = createSlice({
  name: "weather",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeather.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchWeather.fulfilled,
        (state, action: PayloadAction<fetchWeather>) => {
          const { speed } = action.payload.wind;
          let { temp, humidity } = action.payload.main;
          temp = Math.round(temp - 273.15);
          state.data = { temp, humidity, speed };
          state.status = "loaded";
        }
      )
      .addCase(fetchWeather.rejected, (state) => {
        state.data = null;
        state.status = "error";
      });
  },
});

export default weatherSlice.reducer;
