import React from 'react'
import { useDrag } from 'react-dnd'

const style = {
  border: '1px dashed gray',
  borderRadius: '50%',
  backgroundColor: 'lightGray',
  padding: '0.5rem 1rem',
  marginRight: '1.5rem',
  marginBottom: '1.5rem',
  textAlign: 'center',
  cursor: 'move',
  float: 'left',
  width: '15px',
}

const Circle = ({ number, type, isDropped }) => {
  const [{ opacity }, drag] = useDrag({
    item: { number, type },
    collect: monitor => ({
      opacity: monitor.isDragging() ? 0.4 : 1,
    }),
  })

  let display = 'block';
  if (isDropped) {
    display = 'none';
  }

  return (
    <div ref={drag} style={{ ...style, opacity, display }}>
      {isDropped ? <s>{number}</s> : number}
    </div>
  )
}

export default Circle
