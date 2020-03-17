import React from 'react'
import { useDrop } from 'react-dnd'
import Circle from './Circle'

const style = {
  float: 'left',
  color: 'black',
  width: '14rem',
  height: '14rem',
  padding: '1rem',
  fontSize: '1rem',
  textAlign: 'center',
  lineHeight: 'normal',
  marginRight: '1.5rem',
  marginBottom: '1.5rem',
  borderRadius: '0.5rem',
  border: '0.15rem solid black',
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

      <div className='content'>
        {circles.map(({ number, type }) => 
          <Circle
            number={number}
            type={type}
            key={number}
          />
        )}
      </div>
    </div>
  )
}

export default Container
