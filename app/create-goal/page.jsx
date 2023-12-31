'use client';

import { useState } from 'react'
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import Form from '@components/Form';

const CreateGoal = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [submitting, setSubmitting] = useState(false);
  const [goal, setGoal] = useState({
    title: '',
    description: '',
    tag: '',
    endDate: '',
    status: '',
    isPrivate: true,
  });

  const createGoal = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await fetch('/api/goal/new', {
        method: 'POST',
        body: JSON.stringify({
          title: goal.title,
          description: goal.description,
          tag: goal.tag,
          endDate: goal.endDate,
          status: goal.status || 'InProgress',
          isPrivate: goal.isPrivate,
          userId: session?.user.id,
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
        type='Create'
        goal={goal}
        setGoal={setGoal}
        submitting={submitting}
        handleSubmit={createGoal}
    />
  )
}

export default CreateGoal