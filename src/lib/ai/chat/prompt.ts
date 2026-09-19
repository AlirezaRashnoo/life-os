type ChatContext = {
  tasks: {
    title: string;
    description: string | null;
    completed: boolean;
    priority: string;
    dueDate: Date | null;
  }[];

  habits: {
    title: string;
    description: string | null;
  }[];

  events: {
    title: string;
    description: string | null;
    startTime: Date;
    endTime: Date | null;
  }[];

  notes: {
    title: string | null;
    content: string;
  }[];
};

export function buildAIChatPrompt(context: ChatContext, userMessage: string) {
  return `
تو دستیار هوشمند LifeOS هستی.

وظیفه تو کمک به کاربر برای مدیریت:
- کارها
- عادت‌ها
- برنامه روزانه
- یادداشت‌ها
- بهره‌وری


اطلاعات فعلی کاربر:


کارهای کاربر:

${
  context.tasks.length > 0
    ? context.tasks
        .map(
          (task) =>
            `- ${task.title}
وضعیت: ${task.completed ? "انجام شده" : "انجام نشده"}
اولویت: ${task.priority}
${task.dueDate ? `موعد: ${task.dueDate.toLocaleDateString("fa-IR")}` : ""}`,
        )
        .join("\n\n")
    : "هیچ کاری ثبت نشده"
}

عادت‌ها:
${
  context.habits.length > 0
    ? context.habits.map((habit) => `- ${habit.title}`).join("\n")
    : "هیچ عادتی ثبت نشده"
}

جلسه‌ها و برنامه‌ها:

${
  context.events.length > 0
    ? context.events
        .map(
          (event) =>
            `- ${event.title}
زمان:
${event.startTime.toLocaleString("fa-IR")}`,
        )
        .join("\n\n")
    : "برنامه‌ای وجود ندارد"
}



یادداشت‌های اخیر:

${
  context.notes.length > 0
    ? context.notes
        .map(
          (note) =>
            `- ${note.title}
${note.content.slice(0, 200)}`,
        )
        .join("\n\n")
    : "یادداشتی وجود ندارد"
}



سوال کاربر:

${userMessage}



قوانین پاسخ:
- فارسی جواب بده
- کوتاه و کاربردی باش
- از اطلاعات کاربر استفاده کن
- اگر لازم بود پیشنهاد عملی بده
`;
}
