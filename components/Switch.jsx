import React from 'react'

const Switch = ({ onChange, isChecked }) => {
    return (
        <label class="switch">
            <input type="checkbox" checked={isChecked} onChange={onChange} />
            <span></span>
        </label>
    )
}
  
export default Switch