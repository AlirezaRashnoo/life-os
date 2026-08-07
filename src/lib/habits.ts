export function calculateHabitStreak(
  completions: {
    date: Date;
  }[],
) {
  if (!completions.length) return 0;

  const dates = completions
    .map((item) => {
      const date = new Date(item.date);

      date.setHours(0, 0, 0, 0);

      return date.getTime();
    })
    .sort((a, b) => b - a);

  let streak = 0;

  const today = new Date();

  today.setHours(0, 0, 0, 0);

  let current = today.getTime();

  for (const date of dates) {
    if (date === current) {
      streak++;

      current -= 24 * 60 * 60 * 1000;
    } else if (date < current) {
      break;
    }
  }

  return streak;
}

export function calculateWeeklyProgress(
  completions: {
    date: Date;
  }[],
) {
  const today = new Date();

  today.setHours(0, 0, 0, 0);

  const day = today.getDay();

  const monday = new Date(today);

  monday.setDate(today.getDate() - (day === 0 ? 6 : day - 1));

  monday.setHours(0, 0, 0, 0);

  const completedDays = completions.filter((item) => {
    const date = new Date(item.date);

    date.setHours(0, 0, 0, 0);

    return date >= monday && date <= today;
  });

  return completedDays.length;
}
