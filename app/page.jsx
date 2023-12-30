import React from 'react'
import List from '@components/List';

const Home = () => {
  return (
    <section className="w-full flex-center flex-col">
        <h1 className="head_text text-center">
            <span className='text-sm font-semibold'>Don't be sorry, <br /></span><span className="orange_gradient">Be better!</span>
        </h1>
        <p className="desc text-center">Here should be motivational words</p>

        {/* Content for logged in customers and for guests */}
        <List/>
    </section>
  )
}

export default Home