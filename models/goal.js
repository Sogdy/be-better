import { Schema, model, models } from "mongoose";

const GoalSchema = new Schema({
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    title: {
        type: String,
        required: [true, 'Title is required!'],
    },
    description: {
        type: String,
    },
    tag: {
        type: String,
        required: [true, 'Tag is required!'],
    },
    endDate: {
        type: String,
    },
    status: {
        type: String,
    },
    isPrivate: {
        type: Boolean,
    },
})

const Goal = models.Goal || model('Goal', GoalSchema);

export default Goal;