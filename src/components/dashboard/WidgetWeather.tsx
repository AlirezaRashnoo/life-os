import { CloudSun } from "lucide-react";
import WidgetContainer from "./WidgetContainer";

export default function WidgetWeather() {
  return (
    <WidgetContainer title="آب و هوا" icon={<CloudSun />} accent="focus">
      <div className="flex flex-1 flex-col justify-between">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-display font-semibold text-foreground">۲۴°</p>
            <p className="mt-1 text-sm text-muted-foreground">تهران</p>
            <p className="text-sm text-muted-foreground">نیمه‌ابری</p>
          </div>
          <CloudSun size={44} className="text-focus" />
        </div>

        <div className="mt-4 flex justify-between border-t border-border pt-3 text-caption text-muted-foreground">
          <span>۱۴:۰۰ ۲۵°</span>
          <span>۱۶:۰۰ ۲۴°</span>
          <span>۱۸:۰۰ ۲۲°</span>
        </div>
      </div>
    </WidgetContainer>
  );
}
