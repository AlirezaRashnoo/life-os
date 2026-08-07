"use client";

import { useEffect, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

import { updateHabit } from "@/actions/habits";
import { habitIcons, HabitIconName } from "@/lib/habit-icons";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;

  habit?: {
    id: string;
    title: string;
    description: string | null;
    icon: string | null;
  };
};

export default function EditHabitDialog({ open, onOpenChange, habit }: Props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [icon, setIcon] = useState<HabitIconName>("CheckCircle");

  useEffect(() => {
    if (!habit) return;

    setTitle(habit.title);
    setDescription(habit.description ?? "");
    setIcon((habit.icon as HabitIconName) ?? "CheckCircle");
  }, [habit]);

  async function handleSave() {
    if (!habit) return;

    await updateHabit(habit.id, {
      title,
      description,
      icon,
    });

    onOpenChange(false);
  }

  if (!habit) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>ویرایش عادت</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <Input
            placeholder="عنوان عادت"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <Textarea
            placeholder="توضیحات"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">انتخاب آیکن</p>

            <div
              className="
              grid
              grid-cols-6
              gap-2
            "
            >
              {Object.entries(habitIcons).map(([name, Icon]) => (
                <button
                  key={name}
                  type="button"
                  onClick={() => setIcon(name as HabitIconName)}
                  className={`
                      flex
                      h-10
                      w-10
                      items-center
                      justify-center
                      rounded-lg
                      border
                      transition

                      ${
                        icon === name
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-border text-muted-foreground hover:bg-accent"
                      }
                    `}
                >
                  <Icon className="h-5 w-5" />
                </button>
              ))}
            </div>
          </div>

          <DialogFooter>
            <Button className="w-full" onClick={handleSave}>
              ذخیره تغییرات
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}
