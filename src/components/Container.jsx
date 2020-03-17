import React from 'react'
import { useDrop } from 'react-dnd'
import Circle from './Circle'

const style = {
  float: 'left',
  height: '12rem',
  width: '12rem',
  color: 'black',
  fontSize: '1rem',
  padding: '1rem',
  borderRadius: '5px',
  textAlign: 'center',
  lineHeight: 'normal',
  marginRight: '1.5rem',
  marginBottom: '1.5rem',
  border: '2px solid black',
  textTransform: 'capitalize',
}

const Container = ({ accept, onDrop, circles }) => {
  const [{ isOver, canDrop }, drop] = useDrop({
    accept,
    drop: onDrop,
    collect: monitor => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  })

  const borderColor = (accept === 'even') ? 'blue' : 'red'

  const isActive = isOver && canDrop
  let backgroundColor = '#fff'
  if (isActive) {
    backgroundColor = 'darkgreen'
  } else if (canDrop) {
    backgroundColor = 'darkkhaki'
  }

  return (
    <div ref={drop} style={{ ...style, backgroundColor, borderColor }}>
      <h3>{isActive
        ? 'Release to drop'
        : `${accept} Numbers`}</h3>

      {circles.map(({ number, type}) => 
        <Circle
          number={number}
          type={type}
          key={number}
        />
      )}
    </div>
  )
}

export default Container
