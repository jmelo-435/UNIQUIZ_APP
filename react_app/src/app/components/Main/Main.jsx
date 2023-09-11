import React, { useState, useEffect } from 'react'
import { test } from '../../interfaces/interface'
import Box from '@mui/material/Box'
import Start from './Start/Start'
import Quiz from './Quiz/Quiz'
import Result from './Result/Result'



const Main = () => {
  const [time, setTime] = useState(0)
  const [quizData, setQuizData] = useState(null)
  const [result, setResult] = useState(null)
  const [player, setPlayer] = useState('')
  const [startTime, setStartTime] = useState('')
  const [stage, setStage] = useState('START')


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
      {
      stage === 'RESULT' ? <Result result={result} playerName={player} startTime ={startTime} setStage={setStage}/> :
      stage === 'QUIZ' ? <Quiz quizData={quizData} setResult={setResult} setStage={setStage}/> :
      <Start  setQuizData={setQuizData} setPlayerName={setPlayer} setStartTime={setStartTime} setStage={setStage} />}
    </Box>
  )
}

export default Main
