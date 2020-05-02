import axios from "axios";

const url = "https://covid19.mathdro.id/api";

export const fetchData = async (country) => {
  let strURL = url;

  if(country){
    strURL = `${url}/countries/${country}`
  }

  try {
    const {
      data: { confirmed, recovered, deaths, lastUpdate },
    } = await axios.get(strURL);

    
    const modifiedData = {
      confirmed,
      recovered,
      deaths,
      lastUpdate,
    };

    return modifiedData;
  } catch (error) {
    console.log(error);
  }
};

// For Chart
export const fetchDailyData = async () => {
  try {
    const { data } = await axios.get(`${url}/daily`);
    // console.log(data);

    const mdifiedData = data.map((dailyData) => ({
      confirmed: dailyData.confirmed.total,
      deaths: dailyData.deaths.total,
      recovered: dailyData.recovered.total,
      date: dailyData.reportDate,
    }));
    return mdifiedData;
  } catch (error) {
    console.log(error);
  }
};

// For Country Picker
export const fetchCountries = async () => {
  try {
    const {
      data: { countries },
    } = await axios.get(`${url}/countries`);

    return countries.map((country) => country.name);
  } catch (error) {
    console.log(error);
  }
};
