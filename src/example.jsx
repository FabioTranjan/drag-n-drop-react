import React, { useState, useCallback } from 'react'
import { NativeTypes } from 'react-dnd-html5-backend'
import Dustbin from './Dustbin'
import Box from './Box'
import { ItemTypes } from './Constants'
import update from 'immutability-helper'

function renderBoxes() {
  const boxes = []
  for (let i = 1; i <= 12; i++) {
    boxes.push({ number: i, type: i % 2 == 0 ? ItemTypes.EVEN : ItemTypes.ODD })
  }
  return boxes
}

const Container = () => {
  const [dustbins, setDustbins] = useState([
    { accepts: [ItemTypes.EVEN], lastDroppedItem: null },
    { accepts: [ItemTypes.ODD], lastDroppedItem: null },
  ])
  const [boxes] = useState(renderBoxes())
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
      setDustbins(
        update(dustbins, {
          [index]: {
            lastDroppedItem: {
              $set: item,
            },
          },
        }),
      )
    },
    [droppedBoxNumbers, dustbins],
  )
  return (
    <div>
      <div style={{ overflow: 'hidden', clear: 'both' }}>
        {dustbins.map(({ accepts, lastDroppedItem }, index) => (
          <Dustbin
            accept={accepts}
            lastDroppedItem={lastDroppedItem}
            onDrop={item => handleDrop(index, item)}
            key={index}
          />
        ))}
      </div>

      <div style={{ overflow: 'hidden', clear: 'both' }}>
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
  )
}

export default Container
