import React from 'react'
import { measure } from './measure'
import './style.css'

interface Props {
}

const TableComponent = (p: Props) => {
  React.useEffect(()=>{
    measure($)
  }, [])

  return (
   
      <div id="measure-box">
        <table id="measure">
          <tr id="measure-header">
            <th></th>
          </tr>
        </table>
        <div className="parsing-data">Data generated at <span id="checklist-timestamp"></span> from file <span
            id="checklist-filename"></span></div>
      </div>
  )
}

export default TableComponent