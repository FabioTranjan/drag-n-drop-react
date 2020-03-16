import React from 'react'
import { useDrop } from 'react-dnd'

const style = {
  float: 'left',
  height: '12rem',
  width: '12rem',
  color: 'black',
  fontSize: '1rem',
  padding: '1rem',
  textAlign: 'center',
  lineHeight: 'normal',
  marginRight: '1.5rem',
  marginBottom: '1.5rem',
  border: '2px solid black',
  borderRadius: '5px',
}

const Dustbin = ({ accept, lastDroppedItem, onDrop }) => {
  const [{ isOver, canDrop }, drop] = useDrop({
    accept,
    drop: onDrop,
    collect: monitor => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  })

  const isActive = isOver && canDrop
  let backgroundColor = '#fff'
  if (isActive) {
    backgroundColor = 'darkgreen'
  } else if (canDrop) {
    backgroundColor = 'darkkhaki'
  }

  return (
    <div ref={drop} style={{ ...style, backgroundColor }}>
      <h3 style={{ textTransform: 'capitalize' }}>{isActive
        ? 'Release to drop'
        : `${accept}`}</h3>

      {lastDroppedItem && (
        <p>Dropped: {JSON.stringify(lastDroppedItem)}</p>
      )}
    </div>
  )
}

export default Dustbin
