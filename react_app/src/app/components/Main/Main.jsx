import React, { useState, useEffect } from 'react'
import { test } from '../../interfaces/interface'

const Main = () => {
 const [time, setTime] = useState(0)

  useEffect(() => {
    async function fetch () {
      const time = await test()
      
      setTime(time.data.serverTime)
    }
    fetch()
  }, [])

  return (
    <div>
      <h1>React App</h1>
      <p>Time: {time}</p>
    </div>
  )
  
}

export default Main
