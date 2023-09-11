import React, { useState, useEffect } from 'react'

import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import { Chip } from '@mui/material'
import HomeIcon from '@mui/icons-material/Home'


const Result = ({ result, playerName, startTime,setStage }) => {
  const [tempoDecorrido, setTempoDecorrido] = useState('00:00')

  useEffect(() => {
    const now = new Date()
    const start = new Date(startTime)
    let diff = now - start
    diff = Math.floor(diff / 1000)
    let minutes = Math.floor(diff / 60)
    let seconds = diff % 60
    /*Adiciona um zero a esquerda caso o numero seja menor que 10*/
    if (minutes < 10) {
      minutes = `0${minutes}`
    }
    if (seconds < 10) {
      seconds = `0${seconds}`
    }
    diff = `${minutes}:${seconds}`
    setTempoDecorrido(diff)
  }, [startTime])

  return (
    <Paper
      sx={{
        width: '70vw',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '10px'
      }}
    >
      <Chip
        label={'Início'}
        icon={<HomeIcon />}
        color='primary'
        clickable
        onClick={() => {
          setStage('START')
        }}
        sx={{
          alignSelf: 'flex-end'
        }}
      />
      <h1>Resultado</h1>

      <Typography variant='h7' color='text.secondary' gutterBottom>
        Nome do jogador:
      </Typography>
      <Typography variant='h5' gutterBottom>
        {playerName}
      </Typography>
      <Typography variant='h7' color='text.secondary' gutterBottom>
        Tempo decorrido:
      </Typography>
      <Typography variant='h5' gutterBottom>
        {tempoDecorrido}
      </Typography>
      <Typography variant='h7' color='text.secondary' gutterBottom>
        Pontuação:
      </Typography>
      <Typography variant='h5' gutterBottom>
        {result.score}
      </Typography>
      <Typography variant='h7' color='text.secondary' gutterBottom>
        Classificação no ranking:
      </Typography>
      <Typography variant='h5' gutterBottom>
        {result.rank}
      </Typography>
    </Paper>
  )
}

export default Result
