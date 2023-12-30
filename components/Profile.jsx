import React from 'react'

import GoalCard from './GoalCard'

const Profile = ({ name, desc, data, handleEdit, handleDelete, handleStatusUpdate }) => {
  
  return (
    <section className="w-full">
      <h1 className='head_text text-left blue_gradient'>{name} Profile</h1>
      <p className="desc text-left">{desc}</p>

      <div className="mt-10 list_layout">
        {data.map(goal => (
          <GoalCard
            key={goal._id}
            goal={goal}
            handleEdit={()  => handleEdit && handleEdit(goal)}
            handleDelete={()  => handleDelete && handleDelete(goal)}
            handleStatusUpdate = {(e) => handleStatusUpdate && handleStatusUpdate(e, goal)}
          />
        ))}
      </div>
    </section>
  )
}

export default Profile