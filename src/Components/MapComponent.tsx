import React from 'react'
import Paper from '@material-ui/core/Paper'
import Box from '@material-ui/core/Box'

interface Props {
}

const MapComponent = (p: Props) => {
  React.useEffect(()=>{
    $("p").click(function(){
      $(this).hide();
    });
  }, [])

  return (
    <Paper elevation={1} style={{margin: '8px', width: "100%", padding: '15px', maxWidth: '1280px'}}>
      <Box style={{ marginBottom: '15px', fontSize: '18px', fontWeight: 'bold'}}>Filters</Box>
      <p>Test Qjery</p>
      <Box></Box>
    </Paper>
  )
}

export default MapComponent