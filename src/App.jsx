import React, { useState, useCallback } from 'react'
import update from 'immutability-helper'
import { ItemTypes } from './Constants'
import Container from './components/Container'
import Circle from './components/Circle'

function initCircles() {
  const circles = []
  for (let i = 1; i <= 12; i++) {
    circles.push({ number: i, type: i % 2 === 0 ? ItemTypes.EVEN : ItemTypes.ODD })
  }
  return circles
}

function initContainers() {
  const containers = []
  containers.push({ accepts: [ItemTypes.EVEN], droppedItems: [] })
  containers.push({ accepts: [ItemTypes.ODD], droppedItems: [] })
  return containers
}

const App = () => {
  const [containers, setContainers] = useState(initContainers())
  const [circles] = useState(initCircles())
  const [droppedCircleNumbers, setDroppedCircleNumbers] = useState([])

  function isDropped(circleNumber) {
    return droppedCircleNumbers.indexOf(circleNumber) > -1
  }

  const handleDrop = useCallback(
    (index, item) => {
      const { number } = item
      setDroppedCircleNumbers(
        update(droppedCircleNumbers, number ? { $push: [number] } : { $push: [] }),
      )
      setContainers(
        update(containers, {
          [index]: {
            droppedItems: {
              $push: [item],
            },
          },
        }),
      )
    },
    [droppedCircleNumbers, containers],
  )

  return (
    <div style={{ display: 'flex' }}>
      <div style={{ overflow: 'hidden', clear: 'both', width: '25%', border: '2px solid gray', borderRadius: '5px' }}>
        <h3 style={{ textAlign: 'center', color: '#222' }}>Numbers</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
          {circles.map(({ number, type }, index) => (
            <Circle
              number={number}
              type={type}
              isDropped={isDropped(number)}
              key={index}
            />
          ))}
        </div>
      </div>

      <div style={{ overflow: 'hidden', clear: 'both', width: '75%', marginLeft: '50px' }}>
        {containers.map(({ accepts, droppedItems }, index) => (
          <div>
            <Container
              accept={accepts}
              droppedItems={droppedItems}
              onDrop={item => handleDrop(index, item)}
              key={index}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
