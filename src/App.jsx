import React, { useState, useCallback } from 'react'
import update from 'immutability-helper'
import { ItemTypes } from './Constants'
import Container from './components/Container'
import Circle from './components/Circle'

function initCircles() {
  const circles = []
  for (let i = 1; i <= 12; i++) {
    circles.push({ number: i, container: null, type: i % 2 === 0 ? ItemTypes.EVEN : ItemTypes.ODD })
  }
  return circles
}

function initContainers() {
  const containers = []
  containers.push({ accept: ItemTypes.EVEN, droppedItems: [] })
  containers.push({ accept: ItemTypes.ODD, droppedItems: [] })
  return containers
}

const App = () => {
  const [containers, setContainers] = useState(initContainers())
  const [circles, setCircles] = useState(initCircles())
  const [droppedCircleNumbers, setDroppedCircleNumbers] = useState([])

  const handleDrop = useCallback(
    (index, item) => {
      const { number, type } = item
      setDroppedCircleNumbers(
        update(droppedCircleNumbers, number ? { $push: [number] } : { $push: [] })
      )
      setContainers(
        update(containers, {
          [index]: {
            droppedItems: {
              $push: [item],
            },
          },
        })
      )
      setCircles(
        update(circles, {
          [number - 1]: {
            container: { 
              $set: type
            },
          },
        })
      )
    }, [droppedCircleNumbers, containers, circles]
  )

  return (
    <div style={{ display: 'flex' }}>
      <div style={{ overflow: 'hidden', clear: 'both', width: '25%', border: '2px solid gray', borderRadius: '5px' }}>
        <h3 style={{ textAlign: 'center', color: '#222' }}>Numbers</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
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

      <div style={{ overflow: 'hidden', clear: 'both', width: '75%', marginLeft: '50px' }}>
        {containers.map(({ accept, droppedItems }, index) => (
          <div>
            <Container
              accept={accept}
              droppedItems={droppedItems}
              onDrop={item => handleDrop(index, item)}
              circles={circles.filter(({ container }, index) => container === accept)}
              key={index}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
