import { Row, Col, Card } from 'antd';
import React, { useEffect, useState } from 'react';
import CasesDisplay from '../covid_news/components/home/CasesDisplay';
import CountryData from '../covid_news/components/home/CountryData';
import CountrySelector from '../covid_news/components/home/CountrySelector';
import CountriesTable from '../covid_news/components/home/CountriesTable';
import {
  getAllCountriesData,
  getCountryData,
  getCountryHistoricalData,
} from '../covid_news/apis';
import { COUNTRIES } from '../../constants/countries';
import ViewSelector from '../covid_news/components/home/ViewSelector';
import CountryChart from '../covid_news/components/home/CountryChart';

import GA4React from 'ga-4-react';


const trackingId = 'G-6MLS770X5M';
try {
  setTimeout((_) => {
  const ga4react = new GA4React(trackingId);
  ga4react.initialize();
}, 4000);
} catch (err) {
  console.log(err);
}

export default function AppWorld() {
  const [selectedCountry, setSelectedCountry] = useState('');
  const [data, setData] = useState([]);
  const [globalData, setGlobalData] = useState([]);
  const [historicData, setHistoricData] = useState({});
  const [optionView, setOptionView] = useState('');
  const fetchCountryData = (selectedCountry) => {
    const country = COUNTRIES.find(
      (country) => country.name === selectedCountry
    );
    const countryCode = country ? country.code : 'VN';
    getCountryData(countryCode)
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  };
  const fetchCountryHistoricalData = (selectedCountry) => {
    const country = COUNTRIES.find(
      (country) => country.name === selectedCountry
    );
    const countryCode = country ? country.code : 'VN';
    getCountryHistoricalData(countryCode)
      .then((res) => setHistoricData(res.data))
      .catch((err) => console.log(err));
  };

  const handleChange = (key) => {
    setSelectedCountry(key);
    console.log(key);
  };
  const handleChangeOption = (e) => {
    setOptionView(e.target.value);
  };

  useEffect(() => {
    fetchCountryData(selectedCountry);
    fetchCountryHistoricalData(selectedCountry);
  }, [selectedCountry]);

  useEffect(() => {
    getAllCountriesData()
      .then((res) => setGlobalData(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="container-fluid">
      <CasesDisplay />
      <div className="block">
        <div className="titleHolder">
          <h1>Country statistics</h1>
        </div>
        <Row gutter={[16, 16]}>
          <Col
            style={{ margin: 'auto' }}
            xs={{ span: 24 }}
            sm={{ span: 12 }}
            lg={{ span: 6 }}>
            <Card>
              <CountrySelector
                selectedCountry={selectedCountry}
                handleChange={handleChange}
              />
              <CountryData data={data} />
            </Card>
          </Col>
          <Col xs={{ span: 24 }} lg={{ span: 18 }}>
            <Card>
              <div className="flex">
                <p></p>
                <ViewSelector handleChangeOption={handleChangeOption} />
              </div>
              <CountryChart
                historicData={historicData}
                optionView={optionView}
              />
            </Card>
          </Col>
        </Row>
      </div>
      <CountriesTable data={globalData} />
    </div>
  );
}