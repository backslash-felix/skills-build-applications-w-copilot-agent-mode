import mongoose from 'mongoose';
import User from '../models/User';
import Team from '../models/Team';
import Activity from '../models/Activity';
import Leaderboard from '../models/Leaderboard';
import Workout from '../models/Workout';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);
    console.log('Connected to octofit_db');

    // Clear existing collections
    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      Leaderboard.deleteMany({}),
      Workout.deleteMany({}),
    ]);
    console.log('Cleared existing data');

    // --- Users ---
    const users = await User.insertMany([
      { username: 'mona_octocat', email: 'mona@github.example', password: 'hashed_pw_1' },
      { username: 'hubot_runner', email: 'hubot@github.example', password: 'hashed_pw_2' },
      { username: 'codercat',     email: 'coder@github.example', password: 'hashed_pw_3' },
      { username: 'defunkt',      email: 'defunkt@github.example', password: 'hashed_pw_4' },
      { username: 'pjhyett',      email: 'pj@github.example', password: 'hashed_pw_5' },
    ]);
    console.log(`Inserted ${users.length} users`);

    // --- Teams ---
    const teams = await Team.insertMany([
      { name: 'Octo Sprinters', members: [users[0]._id, users[1]._id] },
      { name: 'Code Runners',   members: [users[2]._id, users[3]._id, users[4]._id] },
    ]);
    console.log(`Inserted ${teams.length} teams`);

    // --- Activities ---
    const activities = await Activity.insertMany([
      { user: users[0]._id, type: 'Running',   duration: 30, date: new Date('2026-07-01') },
      { user: users[1]._id, type: 'Cycling',   duration: 45, date: new Date('2026-07-02') },
      { user: users[2]._id, type: 'Swimming',  duration: 60, date: new Date('2026-07-03') },
      { user: users[3]._id, type: 'Running',   duration: 25, date: new Date('2026-07-04') },
      { user: users[4]._id, type: 'Yoga',      duration: 50, date: new Date('2026-07-05') },
      { user: users[0]._id, type: 'Weightlifting', duration: 40, date: new Date('2026-07-06') },
      { user: users[1]._id, type: 'Running',   duration: 35, date: new Date('2026-07-07') },
    ]);
    console.log(`Inserted ${activities.length} activities`);

    // --- Workouts ---
    const workouts = await Workout.insertMany([
      {
        name: 'Morning Cardio Blast',
        description: 'High-intensity morning cardio session',
        exercises: ['Jumping Jacks', 'High Knees', 'Burpees', 'Mountain Climbers'],
        duration: 30,
      },
      {
        name: 'Core Strength',
        description: 'Full core workout targeting abs and lower back',
        exercises: ['Plank', 'Crunches', 'Leg Raises', 'Russian Twists', 'Superman Hold'],
        duration: 25,
      },
      {
        name: 'Upper Body Power',
        description: 'Bodyweight upper body strength training',
        exercises: ['Push-Ups', 'Tricep Dips', 'Pike Push-Ups', 'Shoulder Taps'],
        duration: 35,
      },
      {
        name: 'Active Recovery',
        description: 'Light movement and stretching for recovery days',
        exercises: ['Walking', 'Hip Circles', 'Cat-Cow Stretch', 'Child\'s Pose'],
        duration: 20,
      },
    ]);
    console.log(`Inserted ${workouts.length} workouts`);

    // --- Leaderboard ---
    const leaderboardEntries = await Leaderboard.insertMany([
      { user: users[0]._id, score: 980 },
      { user: users[1]._id, score: 850 },
      { user: users[2]._id, score: 760 },
      { user: users[3]._id, score: 640 },
      { user: users[4]._id, score: 520 },
    ]);
    console.log(`Inserted ${leaderboardEntries.length} leaderboard entries`);

    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
