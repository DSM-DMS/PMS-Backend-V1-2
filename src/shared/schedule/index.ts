import { MealJobScheduler } from "../../event/meal/meal.scheduler";
import { NoticeJobScheduler } from "../../notice/schedule/notice.scheduler";
import { JobScheduler } from "./schedule.type";

const setGlobalSchedule = () => {
  const schedules: JobScheduler[] = [
    new MealJobScheduler(),
    new NoticeJobScheduler()
  ];

  for(const schedule of schedules) {
    schedule.setSchedule();
  }
}

export { setGlobalSchedule };