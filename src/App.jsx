import React, { useState, useCallback } from 'react'
import update from 'immutability-helper'
import { ItemTypes } from './Constants'
import Container from './components/Container'
import Circle from './components/Circle'
import './App.css'

function initCircles() {
  const circles = []
  for (let i = 1; i <= 12; i++) {
    circles.push({ number: i,
                   container: null,
                   type: i % 2 === 0 ? ItemTypes.EVEN : ItemTypes.ODD })
  }
  return circles
}

function initContainers() {
  return [{ accept: ItemTypes.EVEN },
          { accept: ItemTypes.ODD }]
}

const App = () => {
  const [containers] = useState(initContainers())
  const [circles, setCircles] = useState(initCircles())

  const handleDrop = useCallback(
    (index, item) => {
      const { number, type } = item
      setCircles(
        update(circles, {
          [number - 1]: {
            container: { 
              $set: type
            },
          },
        })
      )
    }, [circles]
  )

  return (
    <div className='main'>
      <div className='container'>
        <h3 className='header'>Numbers</h3>
        <div className='content'>
          {circles.filter(({ container }) => !container) 
                  .map(({ number, type }) => (
            <Circle
              number={number}
              type={type}
              key={number}
            />
          ))}
        </div>
      </div>

      <div className='containers'>
        {containers.map(({ accept }, index) => (
          <Container
            accept={accept}
            onDrop={item => handleDrop(index, item)}
            circles={circles.filter(({ container }, index) => container === accept)}
            key={index}
          />
        ))}
      </div>
    </div>
  )
}

export default App
