'use client';

import { useState, useEffect } from 'react'
import GoalCard from './GoalCard';
import { useSession } from 'next-auth/react';

const List = () => {
  const [searchText, setSearchText] = useState('');
  const [goals, setGoals] = useState([]);
  const { data: session } = useSession();

  useEffect(() =>  {
    const fetchGoals = async () => {
      const response = await fetch('api/goal', {
        method: "GET",
        headers: { 'X-Customer-ID': session?.user.id },
      });
      const data = await response.json();

      setGoals(data);
    }

    fetchGoals();
  }, []);

  const handleSearchChange = (e) => {

  }

  return (
    <section className="list">
      <form className="relative w-full flex-center">
        <input
          type="text"
          className="search_input peer"
          value={searchText}
          onChange={handleSearchChange}
          placeholder='Search for a goal'
          required
        />
      </form>

      <div className="mt-16 list_layout">
        {goals.map(goal => (
          <GoalCard
            goal={goal}
          />
        ))}
      </div>
    </section>
  )
}

export default List