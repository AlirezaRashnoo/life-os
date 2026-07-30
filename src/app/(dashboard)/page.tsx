import DashboardGrid from "@/components/dashboard/DashboardGrid";
import WidgetAIBrief from "@/components/dashboard/WidgetAIBrief";
import WidgetWeather from "@/components/dashboard/WidgetWeather";
import WidgetFocusTimer from "@/components/dashboard/WidgetFocusTimer";
import WidgetHabitTracker from "@/components/dashboard/WidgetHabitTracker";
import WidgetTodo from "@/components/dashboard/WidgetTodo";
import WidgetCalendar from "@/components/dashboard/WidgetCalendar";

export default function Home() {
  return (
    <DashboardGrid>
      <div className="col-span-12">
        <WidgetAIBrief />
      </div>
      <div className="col-span-3">
        <WidgetWeather />
      </div>
      <div className="col-span-3">
        <WidgetHabitTracker />
      </div>
      <div className="col-span-3">
        <WidgetFocusTimer />
      </div>
      <div className="col-span-3">
        <WidgetCalendar />
      </div>
      <div className="col-span-4">
        <WidgetTodo />
      </div>
    </DashboardGrid>
  );
}
