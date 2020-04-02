import React from 'react'
import Paper from '@material-ui/core/Paper'
import Box from '@material-ui/core/Box'
import SplitButton from './SplitButton'

interface Props {
  view: "table" | "charts"
  setView: React.Dispatch<React.SetStateAction<"table" | "charts">>
  filter: React.ReactNode
}

const ViewHandler = (p: Props) => {

  return (
    <Paper elevation={1} style={{margin: '8px', width: "100%", padding: '15px', maxWidth: '1280px'}}>
      <Box style={{marginBottom: '25px'}}>
        <SplitButton setView={p.setView}/>
      </Box>
      {p.view === 'charts' && p.filter}
      {p.view === 'table' && (
        <div id="legend">
          <div className="legend-title">Legend</div>
          <Box display="flex" flexWrap="wrap" justifyContent="space-evenly">
          <div style={{width: '200px'}}><span className="green">&nbsp;</span> 100% implemented</div>
          <div style={{width: '200px'}}><span className="yellow">&nbsp;</span> 50% - 100% implemented</div>
          <div style={{width: '200px'}}><span className="red">&nbsp;</span> &lt; 50% implemented</div>
          <div style={{width: '200px'}}><span style={{ backgroundColor: "#EEE"}}>&nbsp;</span> not applicable</div>
          </Box>
        </div>
      )}
    </Paper>
  )
}

export default ViewHandler