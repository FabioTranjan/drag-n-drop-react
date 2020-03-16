import React, { useState, useCallback } from 'react'
import update from 'immutability-helper'
import { ItemTypes } from './Constants'
import Container from './components/Container'
import Box from './components/Box'

function initBoxes() {
  const boxes = []
  for (let i = 1; i <= 12; i++) {
    boxes.push({ number: i, type: i % 2 === 0 ? ItemTypes.EVEN : ItemTypes.ODD })
  }
  return boxes
}

function initContainers() {
  const containers = []
  containers.push({ accepts: [ItemTypes.EVEN], droppedItems: [] })
  containers.push({ accepts: [ItemTypes.ODD], droppedItems: [] })
  return containers
}

const App = () => {
  const [containers, setContainers] = useState(initContainers())
  const [boxes] = useState(initBoxes())
  const [droppedBoxNumbers, setDroppedBoxNumbers] = useState([])

  function isDropped(boxNumber) {
    return droppedBoxNumbers.indexOf(boxNumber) > -1
  }

  const handleDrop = useCallback(
    (index, item) => {
      const { number } = item
      setDroppedBoxNumbers(
        update(droppedBoxNumbers, number ? { $push: [number] } : { $push: [] }),
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
    [droppedBoxNumbers, containers],
  )

  return (
    <div style={{ display: 'flex' }}>
      <div style={{ overflow: 'hidden', clear: 'both', width: '25%', border: '2px solid gray', borderRadius: '5px' }}>
        <h3 style={{ textAlign: 'center', color: '#222' }}>Numbers</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
          {boxes.map(({ number, type }, index) => (
            <Box
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
