import React from 'react'
import Card from '@material-ui/core/Card'
import Box from '@material-ui/core/Box'

interface Payload {
  name: string
  color: string
  value: number
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active) {
    const content = payload as Payload[]
    const valueformatter = (el: number) => `${Math.floor(el * 100 * 100) / 100}%`
    const sum = content.reduce((acc, el) => acc + el.value, 0)
    return (
      <Card className="custom-tooltip" elevation={2}>
        <Box fontSize="14px" padding="10px">
          <Box marginBottom="4px">
            Date: {label}
          </Box>
          {content.map((el, i) => (
              <Box color={el.color} key={i}>
                {`${el.name} : ${valueformatter(el.value)}`}
              </Box>
          ))}
          <Box marginTop="4px">
            Sum: {valueformatter(sum)}
          </Box>
        </Box>
      </Card>
    )
  }
  return null
}

export default CustomTooltip