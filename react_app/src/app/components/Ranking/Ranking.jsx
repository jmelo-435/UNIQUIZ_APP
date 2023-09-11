import React, { useState, useEffect } from 'react'
import { test } from '../../interfaces/interface'
import Box from '@mui/material/Box'
import HomeIcon from '@mui/icons-material/Home'
import Paper from '@mui/material/Paper'
import { Chip } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { getRanking } from '../../interfaces/interface'
import { DataGrid } from '@mui/x-data-grid'
import Typography from '@mui/material/Typography'


const Ranking = () => {
  const [results, setResults] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    async function fetch () {
      const time = await test()
      const rankingData = await getRanking()

      setResults(rankingData.data)
    }
    fetch()
  }, [])
  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'rank', headerName: 'rank', width: 90 },
    { field: 'player_name', headerName: 'Nome do Jogador', width: 130 },
    {
      field: 'start_time',
      headerName: 'Data',
      width: 90
    },
    {
      field: 'total_score',
      headerName: 'Pontuação',
      type: 'number',
      width: 90
    },
    {
      field: 'duration',
      headerName: 'Duração(segundos)',
      type: 'number',
      width: 90
    }
  ]

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        minHeight: '100vh',
        justifyContent: 'center'
      }}
      id='body'
    >
      <Typography variant='h1' gutterBottom>
        Ranking
      </Typography>
      <Paper
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          minHeight: '30vh',
          minWidth: '30vh',
          padding: '10px'
        }}
      >
        <Chip
          label={'Início'}
          icon={<HomeIcon />}
          color='primary'
          clickable
          onClick={() => {
            navigate('/')
          }}
          sx={{
            alignSelf: 'flex-end'
          }}
        />
        <DataGrid
          rows={results}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 }
            }
          }}
          pageSizeOptions={[5, 10]}
        />
      </Paper>
    </Box>
  )
}

export default Ranking
