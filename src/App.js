import React, { useState } from 'react';
import './App.css';
import data from './data';
import Table from './components/table';
import PageSelection from './components/pageSelector';
import PageMessage from './components/pageMessage';
import Select from './components/select';
import Map from './components/map';

const App = () =>  {
  const [page, setPage] = useState(0);
  const [airline, setAirline] = useState('All Airlines');
  const [airport, setAirport] = useState('All Airports');
  const perPage = 25;
  let filteredRoutes = data.routes;
  let airlines = data.airlines;
  let airports = data.airports;

  if (airline !== 'All Airlines') {
    filteredRoutes = filteredRoutes.filter((route) => route.airline === airline);
  }

  if (airport !== 'All Airports') {
    filteredRoutes = filteredRoutes.filter((route) => route.src === airport || route.dest === airport);
  }

  if (filteredRoutes !== data.routes) {
    airlines = airlines.map((airline) => {
      if (filteredRoutes.some((route) => route.airline === airline.id)) {
        return airline;
      } else {
        return {...airline, disabled: true};
      }
    });

    airports = airports.map((airport) => {
      if (filteredRoutes.some((route) => route.src === airport.code || route.dest === airport.code)) {
        return airport;
      } else {
        return {...airport, disabled: true};
      }
    });
  }

  const filteredRouteLocations = filteredRoutes.map((route) => {
    const src = data.getLocationByCode(route.src);
    const dest = data.getLocationByCode(route.dest);
    return {...route, x1: src.x, y1: src.y, x2: dest.x, y2: dest.y};
  });

  const chooseAirline = (event) => {
    event.preventDefault();
    event.target.value === 'All Airlines'
      ? setAirline('All Airlines')
      : setAirline(Number(event.target.value))
    setPage(0);
  };

  const chooseAirport = (event) => {
    event.preventDefault();
    event.target.value === 'All Airports'
      ? setAirport('All Airports')
      : setAirport(event.target.value)
    setPage(0);
  };

  const clearFilters = () => {
    setAirline('All Airlines');
    setAirport('All Airports');
  }

  const formatValue = (property, value) => {
    if (property === 'airline') {
      return data.getAirlineById(value);
    } else if (property === 'src' || property === 'dest') {
      return data.getAirportByCode(value);
    }

    return null;
  };

  const columns = [
    {name: 'Airline', property: 'airline'},
    {name: 'Source Airport', property: 'src'},
    {name: 'Destination Airport', property: 'dest'},
  ];

  return (
    <div className="app">
    <header className="header">
      <h1 className="title">Airline Routes</h1>
    </header>
    <Map routes={filteredRouteLocations} />
    <section>
      <p>
        Show routes on 
        <Select
          options={airlines}
          valueKey="id"
          titleKey="name"
          allTitle="All Airlines"
          activeKey="disabled"
          value={airline}
          onSelect={chooseAirline}
        />
        flying in or out of 
        <Select
          options={airports}
          valueKey="code"
          titleKey="name"
          allTitle="All Airports"
          activeKey="disabled"
          value={airport}
          onSelect={chooseAirport}
        />
        <button onClick={clearFilters} disabled={airline === 'All Airlines' && airport === 'All Airports'}>Show All Routes</button>
      </p>

      <Table
        className="routes-table"
        page={page}
        perPage={perPage}
        columns={columns}
        rows={filteredRoutes}
        format={formatValue}
      />
    </section>
    <section>
      <PageMessage
        page={page}
        perPage={perPage}
        rowCount={filteredRoutes.length}
      />
      <PageSelection
        rowCount={filteredRoutes.length}
        page={page}
        setPage={setPage}
        perPage={perPage}
      />
    </section>
  </div>
  )
};

export default App;