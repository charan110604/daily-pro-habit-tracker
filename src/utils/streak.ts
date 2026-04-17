import type { DayData } from "../types/calendar";

export function calculateStreak(days: DayData[]): number {

  if (!days || days.length === 0) return 0;

  const today = new Date();
  today.setHours(0,0,0,0);

  const dayMap = new Map(
    days.map(d => [
      new Date(d.date).toDateString(),
      d
    ])
  );

  let streak = 0;
  let current = new Date(today);

  while (true) {

    const key = current.toDateString();
    const day = dayMap.get(key);

    if (!day) break;

    const completed = day.habits.every(h => h);

    if (!completed) break;

    streak++;

    current.setDate(current.getDate() - 1);
  }

  return streak;
}