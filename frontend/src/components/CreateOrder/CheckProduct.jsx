import React, { useEffect } from 'react'
import { forwardRef } from 'react'
import { useRef } from 'react'

export const Checkbox = forwardRef(({ indeterminate, ...rest }, ref) => {
  const defaultRef = useRef()
  const resolvedRef = ref || defaultRef

  useEffect(() => {
    resolvedRef.current.indeterminate = indeterminate
  }, [resolvedRef, indeterminate])

  return (
    <div className=''>
      <input className='w-6 h-6' type='checkbox' ref={resolvedRef} {...rest} />
    </div>
  )
})