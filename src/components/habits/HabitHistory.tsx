type Props = {
  completions: {
    date: Date;
  }[];
};

export default function HabitHistory({ completions }: Props) {
  const days = Array.from({ length: 30 }, (_, i) => {
    const date = new Date();

    date.setDate(date.getDate() - i);

    date.setHours(0, 0, 0, 0);

    return date;
  }).reverse();

  return (
    <div className="flex gap-1 flex-wrap">
      {days.map((day) => {
        const completed = completions.some((item) => {
          const date = new Date(item.date);

          date.setHours(0, 0, 0, 0);

          return date.getTime() === day.getTime();
        });

        return (
          <div
            key={day.toISOString()}
            title={day.toDateString()}
            className={`
              h-6
              w-6
              rounded
              ${completed ? "bg-green-500" : "bg-muted"}
            `}
          />
        );
      })}
    </div>
  );
}
