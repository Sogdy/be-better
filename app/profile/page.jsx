'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import Profile from '@components/Profile'

const MyProfile = () => {
    
  const router = useRouter();
  const { data: session } = useSession();
  const [goals, setGoals] = useState([])

  useEffect(() =>  {
    if (session?.user.id) fetchGoals();
  }, []);

  const fetchGoals = async () => {
    const response = await fetch(`api/users/${session?.user.id}/posts`);
    const data = await response.json();
    setGoals(data);
  }

  const handleEdit = async (goal) => {
    router.push(`/update-goal?id=${goal._id}`);
  };

  const handleStatusUpdate = async (e, goal) => {

    if(!goal._id) return alert('Goal ID is not found');

    try {
        const response = await fetch(`/api/goal/${goal._id}`, {
            method: 'PATCH',
            body: JSON.stringify({
                goal: {
                    ...goal,
                    status: e.target.checked ? 'Done' : 'inProgress',
                }
            })
        })

        if (response.ok) {
            fetchGoals();
        }
    } catch (error) {
        console.log(error);
    }
  };
  
  const handleDelete = async (goal) => {
    const isConfirmed = confirm('Are you sure you want to delete this prompt?');
    if (!isConfirmed) return;

    try {
        await fetch(`api/goal/${goal._id.toString()}`, {
            method: "DELETE",
        });
        
        const filterGoals = goals.filter(item => item._id !== goal._id);

        setGoals(filterGoals);
    } catch (error) {
        console.log(error);
    }
  };

  return (
    <Profile
        name='My'
        desc='Welcome to your personalised profile page'
        data={goals}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        handleStatusUpdate={handleStatusUpdate}
    />
  )
}

export default MyProfile