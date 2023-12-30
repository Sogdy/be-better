import Link from "next/link";

const Form = ({ type, goal, setGoal, submitting, handleSubmit }) => {
  const updateField = (e, field) => {
    setGoal({
      ...goal, [field]: e.target.value,
    })
  }
  return (
    <section className="w-full max-w-full flex-start flex-col">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{type} Goal</span>
      </h1>
      <p className="desc ttext-left max-w-md">
        {type} your goal to become better
      </p>

      <form
        className='mt-10 w-full max-w-2x1 flex flex-col gap-7 glassmorphism'
        onSubmit={handleSubmit}
      >
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Your goal title
          </span>
          <input
            type='text'
            className="form_input"
            value={goal.title}
            onChange={e => updateField(e, 'title')}
            placeholder="Goal"
            required
          />
        </label>

        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Your goal description
          </span>
          <textarea
            className="form_textarea"
            value={goal.description}
            onChange={e => updateField(e, 'description')}
            placeholder="Add more details"
          />
        </label>

        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Tag {` `}
            <span className="font-normal">(#product, #webdevelopment, #idea)</span>
          </span>
          <input
            type='text'
            className="form_input"
            value={goal.tag}
            onChange={e => updateField(e, 'tag')}
            placeholder="Tag"
          />
        </label>

        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Date to achieve your goal
          </span>
          <input
            type='date'
            className="form_input"
            value={goal.endDate}
            onChange={e => updateField(e, 'endDate')}
          />
        </label>

        <div className="flex-end mx-3 mb-5 gap-4">
          <Link className="text-gray-500 text-sm" href='/'>
            Cancel
          </Link>

          <button
            type='submit'
            disabled={submitting}
            className="px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white"
          >
            {submitting ? `${type}...` : type}
          </button>
        </div>
      </form>
    </section>
  )
}

export default Form