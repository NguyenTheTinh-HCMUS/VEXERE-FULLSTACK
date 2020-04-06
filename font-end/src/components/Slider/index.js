import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Typography,Grid} from '@material-ui/core';
import Slider from '@material-ui/core/Slider';

const useStyles = makeStyles({
  root: {
    width: 200,
  },
  slider:{
  with: 200},
  range:{
      display:'flex',
      justifyContent: 'space-between'
  }

});

function valuetext(value) {
  return `${value}°C`;
}

export default function SliderCustom(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(props.default);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    // props.handleChange(value)
  };

  return (
    <div  className={classes.root}>
      <Typography id="range-slider" gutterBottom>
        {props.title}
      </Typography>
      
      
       
        <Grid item xs>
        <Slider
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
        aria-labelledby="range-slider"
        getAriaValueText={valuetext}
        step={props.step}
        min={props.min}
        max={props.max}
        className={classes.slider}
       
      />
        </Grid>
        <div className={classes.range}>
  <div>{value[0]}</div>
  <div>{value[1]}</div>

        </div>
       
     
    </div>
  );
}
