import React from 'react'
import Button from '@mui/material/Button'

const Option = ({ optionNumber, optionText, submitAnswer }) => {
  return (
    <Button
      variant='contained'
      color='primary'
      onClick={() => submitAnswer(optionNumber)}
      sx={{
        width: '70vw',
        margin: '5px',
        fontSize: '15px',
        fontWeight: 'bold'
      }}
    >
      {optionText}
    </Button>
  )
}

export default Option
