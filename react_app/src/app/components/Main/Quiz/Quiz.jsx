import React, { useState, useEffect } from 'react'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { submitAnswerToQuiz } from '../../../interfaces/interface'
import Option from './Option'

const Quiz = ({ quizData,setResult,setStage }) => {
  const [player, setPlayer] = useState('')
  const [startTime, setStartTime] = useState('')
  const [question, setQuestion] = useState('')
  const [elapsedTime, setElapsedTime] = useState('00:00')

  useEffect(() => {
    if (quizData.player_name !== null) {
      setPlayer(quizData.player_name)
    }
    if (quizData.start_time !== null) {
      setStartTime(quizData.start_time)
    }
    if (quizData.hasOwnProperty('question')) {
      setQuestion(quizData.question)
    }
  }, [quizData])

  async function submitAnswer (answer) {
    const response = await submitAnswerToQuiz(answer)
    if (response.status === 200 && response.data.hasOwnProperty('question')) {
      setQuestion(response.data.question)
      console.log(response.data)
    } else if (response.status === 200 && response.data.is_quiz_over === true) {
        setResult(response.data)
        setStage('RESULT')
      console.log(response.data)
    }
  }

  /*Calcula o tmepo transcorrido com base na data de inicio do quiz,em segundos, no formato 00:00 */
  useEffect(() => {
    const interval = setInterval(() => {
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
      setElapsedTime(diff)
    }, 1000)
    return () => clearInterval(interval)
  }, [startTime])

  return (
    <Paper
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height: '80vh',
        minWidth: '70vw',
        justifyContent: 'space-between',
        padding: '10px'
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          height: '10vh',
          minWidth: '90%',
          justifyContent: 'space-between',
          padding: '10px'
        }}
      >
        <div>
          <Typography variant='h7' color='text.secondary' gutterBottom>
            Nome do jogador:
          </Typography>
          <Typography variant='h5' gutterBottom>
            {player}
          </Typography>
        </div>

        <div>
          <Typography variant='h7' color='text.secondary' gutterBottom>
            Tempo decorrido:
          </Typography>
          <Typography variant='h5' gutterBottom>
            {elapsedTime}
          </Typography>
        </div>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '90%',
          padding: '10px'
        }}
      >
        <Typography variant='h6' gutterBottom>
          {question.question_text}
        </Typography>
        {
          /*Itera de 1 a 5 criando uma opção para cada */
          Array.from(Array(5).keys()).map(i => {
            const propertyName = `option${i + 1}`
            const optionText = question.hasOwnProperty(propertyName)
              ? question[propertyName]
              : null
            return (
              <Option
                key={i}
                optionNumber={i + 1}
                optionText={optionText}
                submitAnswer={submitAnswer}
              />
            )
          })
        }
      </Box>
    </Paper>
  )
}
export default Quiz
