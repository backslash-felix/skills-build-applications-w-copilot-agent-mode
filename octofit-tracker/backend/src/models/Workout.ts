import { Schema, model, Document } from 'mongoose';

export interface IWorkout extends Document {
  name: string;
  description: string;
  exercises: string[];
  duration: number;
}

const workoutSchema = new Schema<IWorkout>({
  name: { type: String, required: true },
  description: { type: String, default: '' },
  exercises: [{ type: String }],
  duration: { type: Number, required: true },
});

export default model<IWorkout>('Workout', workoutSchema);
