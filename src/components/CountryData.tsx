import {
  Box,
  Button,
  Container,
  Grid,
  Modal,
  Skeleton,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import styles from "../style.module.css";
import { countryDataModel, weatherDataModel } from "../types/types";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function CountryData() {
  const [countryName, setCountryName] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [countryData, setCountryData] = useState<countryDataModel>();
  const [weatherData, setWeatherData] = useState<weatherDataModel>();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) =>
    setCountryName(e.target.value);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    fetch(`https://restcountries.com/v3.1/name/${countryName}`)
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        console.log(data[0]);
        setCountryData(data[0]);
      });
  };
  const handleWeather = () => {
    handleOpen();
    fetch(
      `http://api.weatherstack.com/current?access_key=1383529894a247bc1c20b789fee9fde6&query=${countryData?.capital[0]}`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setWeatherData(data);
      });
  };

  return (
    <Container>
      <div style={{ display: "grid", placeItems: "center" }}>
        <Box
          sx={{
            width: 500,
            maxWidth: "100%",
            marginTop: "30px",
          }}
        >
          <h2>Countrid</h2>
          <p>Type country name and hit enter to see info and flag</p>
          <form onSubmit={handleSubmit}>
            <TextField
              onChange={handleInput}
              fullWidth
              label="Enter Country Name"
              id="fullWidth"
            />
            <Button
              sx={{ marginTop: "10px", background: "#148f77 " }}
              type="submit"
              variant="contained"
              disabled={!countryName}
            >
              Submit
            </Button>
          </form>
        </Box>
        {countryData?.name && (
          <div className={styles.card}>
            <div>
              <span>Details of {countryData?.name?.common}</span>
              <h4>Capital : {countryData?.capital[0]}</h4>
              <h4>Population: {countryData?.population}</h4>
              <h4>
                Latlng : {countryData?.latlng[0]}, {countryData?.latlng[1]}
              </h4>
              <Button
                sx={{ background: "#148f77 ", py: "10px" }}
                onClick={handleWeather}
                variant="contained"
              >
                Capital Weather
              </Button>
            </div>

            <div>
              <span className={styles.span}>Flag</span> <br />
              <img src={countryData?.flags?.png} alt="flagImg" />
            </div>
          </div>
        )}
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Weather info of {weatherData?.location.name},{" "}
              {countryData?.name?.common}
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={8}>
                <h1>{weatherData?.current.temperature}°c</h1>

                <h3>Wind Speed : {weatherData?.current.wind_speed}</h3>
                <h3>Precip : {weatherData?.current.precip}</h3>
              </Grid>
              <Grid item xs={4}>
                <img src={weatherData?.current.weather_icons[0]} alt="" />
              </Grid>
            </Grid>
          </Box>
        </Modal>
      </div>
    </Container>
  );
}

export default CountryData;
