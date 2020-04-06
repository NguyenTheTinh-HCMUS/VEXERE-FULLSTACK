import React from 'react';
import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

export default function SimpleRating(props) {
  const [value, setValue] = React.useState(props.default);
  const handleOnchagen=(event, newValue)=>{
    setValue(newValue);
  }

  return (
    <div>
      <Box component="fieldset" mb={3} borderColor="transparent">
  <Typography component="legend" className='mb-3'>{props.title}</Typography>
        <Rating
          name="simple-controlled"
          value={value}
          onChange={handleOnchagen}
        />
        <p className='pl-3'>{`${value} sao trở lên`}</p>
      </Box>
   
    </div>
  );
}
