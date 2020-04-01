import React from 'react'
import Paper from '@material-ui/core/Paper'
import Box from '@material-ui/core/Box'
import { CovidMap } from './CovidMap'
import './theme.css'

const MapComponent = () => {
  React.useEffect(()=>{
    $.ajax({
      url: "/data/overview-processing-data.json",
      success: function (result) {
      var generationTime = new Date(result.timestamp)
      $("#checklist-timestamp").text(generationTime.toLocaleString());
      $("#checklist-filename").text(result.filename);
      }
  });

  var covid_map = new CovidMap();

  var last_day_data = null; 
  var coordinates_map = null;

  $.getJSON('mapdata/coordinates.json', function(coordinates) {
      covid_map.coordinates_map = coordinates;
      $.getJSON('data/data.json', function(data) {            
          // the last element of the array is the data of the last day
          covid_map.data_points = data.pop();
          covid_map.update_map();
      });
  });


  }, [])

  return (
    <Paper elevation={1} style={{margin: '8px', width: "100%", padding: '15px', maxWidth: '1280px'}}>
      <Box style={{ marginBottom: '15px', fontSize: '18px', fontWeight: 'bold'}}>Filters</Box>
      <Box>
        <div className="main-container">
            <div id="mapid"></div>
            <div className="parsing-data">Data generated on <span id="checklist-timestamp"></span> from file <span id="checklist-filename"></span></div>
            <div className="">
                <div className="btn-group btn-group-toggle top-buttons d-flex justify-content-center"  data-toggle="buttons">
                    <label className="btn btn-factory active">
                        <input type="radio" name="filter_by_type" id="radio_filter_opt_1" value="people_factory" checked />
                        People in the factory
                    </label>
                    <label className="btn btn-home">
                        <input type="radio" name="filter_by_type" id="radio_filter_opt_2" value="people_home" />
                        People at home office
                    </label>
                    <label className="btn btn-vacation">
                        <input type="radio" name="filter_by_type" id="radio_filter_opt_3" value="people_vacation"  />
                        People on vacation
                    </label>
                    <label className="btn btn-off">
                        <input type="radio" name="filter_by_type" id="radio_filter_opt_4" value="people_off"  />
                        People on temporary layoff
                    </label>
                    <label className="btn btn-quarantine">
                        <input type="radio" name="filter_by_type" id="radio_filter_opt_5" value="people_quarantine"  />
                        People in quarantine
                    </label>
                    <label className="btn btn-sick">
                        <input type="radio" name="filter_by_type" id="radio_filter_opt_6" value="people_sick" />
                        People on sick leave
                    </label>
                    <label className="btn btn-infected">
                        <input type="radio" name="filter_by_type" id="radio_filter_opt_6" value="people_infected"  />
                        People infected by COVID-19
                    </label>
                </div>
                <div className="btn-group btn-group-toggle bottom-buttons"  data-toggle="buttons">
                    <label className="btn btn-secondary active">
                        <input type="radio" name="filter_by_geo" id="filter_by_geo_opt_1" value="companies" checked />
                        Company
                    </label>
                    <label className="btn btn-secondary">
                        <input type="radio" name="filter_by_geo" id="filter_by_geo_opt_2" value="countries"  />
                        Country
                    </label>
                </div>
            </div>
        </div>

      </Box>
    </Paper>
  )
}

export default MapComponent