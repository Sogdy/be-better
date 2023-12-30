import { connectToDB } from "@utils/database";
import Goal from "@models/goal";

// GET

export const GET = async (req, { params }) => {
    try {
        await connectToDB();

        const goal = await Goal.findById(params.id).populate('creator');

        if (!goal) return new  Response('Goal is not found', { status: 404 });

        return new Response(JSON.stringify(goal), { status: 200 });
    } catch (error) {
        return new Response('Failed to get all goals', { status: 500 });
    }
}

// PATCH
export const PATCH = async (req, { params }) => {
    const { goal } = await req.json();
    const { title, description, tag, endDate, status, isPrivate } = goal || {};

    try {
        await connectToDB();

        const existingGoal = await Goal.findById(params.id);

        if (!existingGoal) return new Response('Goal is not found', { status: 404 });

        existingGoal.title = title;
        existingGoal.description = description;
        existingGoal.tag = tag;
        existingGoal.endDate = endDate;
        existingGoal.status = status;
        existingGoal.isPrivate = isPrivate;

        await existingGoal.save();

        return new Response(JSON.stringify(existingGoal), { status: 200 });
    } catch (error) {
        return new Response('Failed to update goal', { status: 500 });
    }
}

//DELETE
export const DELETE = async (req, { params }) => {
    try {
        await connectToDB();
        await Goal.findByIdAndDelete(params.id);

        return new Response('Goal was successfully removed', { status: 200 });
    } catch (error) {
        return new Response('Failed to remove the goal', { status: 500 });
    }
}