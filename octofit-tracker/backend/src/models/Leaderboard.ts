import { Schema, model, Document, Types } from 'mongoose';

export interface ILeaderboardEntry extends Document {
  user: Types.ObjectId;
  score: number;
  updatedAt: Date;
}

const leaderboardSchema = new Schema<ILeaderboardEntry>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  score: { type: Number, required: true, default: 0 },
  updatedAt: { type: Date, default: Date.now },
});

export default model<ILeaderboardEntry>('Leaderboard', leaderboardSchema);
