'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import Form from '@components/Form';

const UpdateGoal = () => {
  const searchParams = useSearchParams();
  const goalId = searchParams.get('id');
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [goal, setGoal] = useState({
    title: '',
    description: '',
    tag: '',
    endDate: '',
    status: '',
    isPrivate: null,
  });
  
  useEffect(() => {
    const getGoalDetails = async () => {
        const response = await fetch(`api/goal/${goalId}`);
        const data = await response.json();
console.log({data})
        setGoal({
           title: data.title,
           description: data.description,
           tag: data.tag,
           endDate: data.endDate,
           status: data.status,
           isPrivate: data.isPrivate,
        })
    };

    if (goalId) getGoalDetails();
  }, [goalId]);

  const updateGoal = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    if(!goalId) return alert('Goal ID is not found');

    try {
      const response = await fetch(`/api/goal/${goalId}`, {
        method: 'PATCH',
        body: JSON.stringify({
          goal: {
            title: goal.title,
            description: goal.description,
            tag: goal.tag,
            endDate: goal.endDate,
            status: goal.status || 'InProgress',
            isPrivate: goal.isPrivate ?? true,
          }
        })
      })

      if (response.ok) {
        router.push('/');
      }
    } catch (error) {
      console.log(error);
    } finally {
        setSubmitting(false);
    }
  }

  return (
    <Form
        type='Update'
        goal={goal}
        setGoal={setGoal}
        submitting={submitting}
        handleSubmit={updateGoal}
    />
  )
}

export default UpdateGoal