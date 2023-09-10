import React, { useState, useEffect } from 'react'
import { test } from '../../interfaces/interface'
import Box from '@mui/material/Box'
import Start from './Start/Start'



const Main = () => {
  const [time, setTime] = useState(0)
  const [quizData, setQuizData] = useState(null)



  useEffect(() => {
    async function fetch () {
      const time = await test()

      setTime(time.data.serverTime)
    }
    fetch()
  }, [])

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
      {quizData ? <Quiz quizData={quizData} /> :
      <Start  setQuizData={setQuizData}/>}
    </Box>
  )
}

export default Main
