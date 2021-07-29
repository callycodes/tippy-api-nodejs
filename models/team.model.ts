import { Schema, model } from 'mongoose';

interface Team {
  identifier: string,
  nickname: string,
  avatar_url: string, 
  created_on: Date
}

interface PutTeam extends Team {
  _id: string
}

interface PatchTeam extends Partial<PutTeam> {};

const schema = new Schema<TextStreamReader>({
  identifier: { type: String, required: true },
  nickname: { type: String, required: true },
  avatar_url: { type: String, required: true },
  created_on: { type: Date, required: true}
});

const TeamModel = model<Team>('Team', schema);

export { TeamModel, Team, PutTeam, PatchTeam };