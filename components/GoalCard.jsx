'use client';

import Image from 'next/image';
import Switch from '@components/Switch';
import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';

const GoalCard = ({
  goal,
  handleTagClick,
  handleEdit,
  handleDelete,
  handleStatusUpdate,
}) => {
  const { data: session } = useSession();
  const pathName = usePathname();
  const { title, description, tag, endDate, status, isPrivate, creator } = goal;

  const getFormatedDate = () => {
    const endDateFormat = new Date(Date.parse(endDate));
    return `${endDateFormat.getDate()}.${endDateFormat.getMonth() + 1}.${endDateFormat.getFullYear()}`;
  };

  const isGoalDone = status === 'Done';

  const getIsDeadlinePasst = () => {
    const deadlineDate = Date.parse(endDate);
    const nowDate = Date.parse(new Date());
    return deadlineDate < nowDate;
  }

  const getIsDeadlineComming = () => {
    const deadlineDate = Date.parse(endDate);
    const nowDate = Date.parse(new Date());
    return deadlineDate > nowDate ? deadlineDate - nowDate < 432000000 : false;
  };

  const getDateTextColour = () => {
    if (getIsDeadlinePasst()) return 'text-red-600';
    if (getIsDeadlineComming()) return 'text-yellow-500';
    return 'text-green-600';
  }

  const isOwner = session?.user.id === goal.creator._id;
  const isOnProfilePage = pathName === '/profile';

  return (
    <div className="goal_card">
      <div className="flex justify-between item-start gap-5">
        <div>
          <p className="font-satoshi font-semibold text-gray-900">{title}</p>
          {!!endDate && <p className={`font-inter text-sm ${getDateTextColour()}`}>{getFormatedDate()}</p>}
        </div>
        {isOwner && isOnProfilePage && (
          <Switch onChange={e => handleStatusUpdate(e, goal)} isChecked={isGoalDone} />
        )}
      </div>

      {!!description && <p className="mt-2 text-gray-500">{description}</p>}

      {!!tag && <p className="font-inter text-sm blue_gradient cursor-pointer mt-4" onClick={() => handleTagClick && handleTagClick(tag)}>#{tag}</p>}
      
      <div className="flex-1 flex justify-start gap-3 cursor-pointer items-center mt-4">
        <Image
          className='rounded-full object-contain'
          src={creator.image}
          alt='user image'
          width={40}
          height={40}
        />
        <div className="fle flex-col">
          <p className='font-satoshi text-gray-900'>{creator.username}</p>
        </div>
      </div>

      {isOwner && isOnProfilePage && (
        <div className='mt-5 flex-center gap-4 border-t border-gray-100 pt-3'>
          <p className="font-inter text-sm text-green-600 cursor-pointer" onClick={handleEdit}>
            Edit
          </p>
          <p className="font-inter text-sm text-orange-600 cursor-pointer" onClick={handleDelete}>
            Delete
          </p>
        </div>
      )}
    </div>
  )
}

export default GoalCard