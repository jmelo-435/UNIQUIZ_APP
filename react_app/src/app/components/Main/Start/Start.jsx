import React, { useState, useEffect } from 'react'
import Paper from '@mui/material/Paper'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { Button } from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress'
import image from './logo.png'
import { Chip } from '@mui/material'
import InfoIcon from '@mui/icons-material/Info'
import { useNavigate } from 'react-router-dom'

const Start = ({setQuizData}) => {
    const [sucess, setSucess] = useState('NONE')
    const navigate = useNavigate()

  return (
    <Paper
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        minHeight: '30vh',
        justifyContent: 'center',
        padding:"10px",
      }}
    >
       <Chip
        label={'Ranking'}
        icon={<InfoIcon />}
        color='primary'
        clickable
        onClick={() => {navigate('/ranking');}}
        sx={{
          alignSelf: 'flex-end',
        }}
      />
      <img src={image} alt='logo' width='50%' />
      <Typography variant='h1' gutterBottom>
        UNIQUIZ
      </Typography>
      <TextField
          required
          id='player'
          data-testid='player'
          label='Nome de jogador'
          type='text'
          inputProps={{ maxLength: 15 , minLength: 3, pattern: "[A-Za-z0-9]"}} 
          sx={{ width: '90%', margin: '5%' }}
        />
        <Button
          data-testid='start'
          id='start'
          disabled = {sucess === "LOADING"}
          variant='contained'
          sx={{ width: '90%', margin: '5%' }}
        >
          {sucess === "LOADING" ? <CircularProgress size={20} / > : "INICIAR"}
          
        </Button>
    </Paper>
    
  )
}

export default Start
