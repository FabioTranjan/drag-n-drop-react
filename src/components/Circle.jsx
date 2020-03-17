import React from 'react'
import { useDrag } from 'react-dnd'

const style = {
  width: '1rem',
  cursor: 'move',
  margin: '0.5rem',
  textAlign: 'center',
  borderRadius: '50%',
  padding: '0.5rem 1rem',
  border: '0.1rem solid gray',
  backgroundColor: 'lightGray',
}

const Circle = ({ number, type }) => {
  const [{ opacity }, drag] = useDrag({
    item: { number, type },
    collect: monitor => ({
      opacity: monitor.isDragging() ? 0.4 : 1,
    }),
  })

  return (
    <div ref={drag} style={{ ...style, opacity }}>
      {number}
    </div>
  )
}

export default Circle
