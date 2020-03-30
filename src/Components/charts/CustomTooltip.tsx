import React from 'react'
import Card from '@material-ui/core/Card'
import Box from '@material-ui/core/Box'

interface Payload {
  name: string
  color: string
  value: number
}

const CustomTooltip = (format: boolean) => ({ active, payload, label }: any) => {
  if (active) {
    const content = payload as Payload[]
    const valueformatter = (el: number) => format ? `${Math.floor(el * 100 * 100) / 100}%` : el
    const sum = content.reduce((acc, el) => acc + el.value, 0)
    return (
      <Card className="custom-tooltip" elevation={2}>
        <Box fontSize="14px" padding="15px">
          <Box marginBottom="8px">
            Date: {label}
          </Box>
          {content.map((el, i) => (
              <Box color={el.color} key={i} marginBottom="3px">
                {`${el.name} : ${valueformatter(el.value)}`}
              </Box>
          ))}
          <Box marginTop="8px" fontWeight="bold">
            Sum: {valueformatter(sum)}
          </Box>
        </Box>
      </Card>
    )
  }
  return null
}

export default CustomTooltip