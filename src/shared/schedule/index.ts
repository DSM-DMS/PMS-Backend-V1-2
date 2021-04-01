import { MealJobScheduler } from "../../event/meal/meal.scheduler";
import { NoticeJobScheduler } from "../../notice/notice.scheduler";
import { JobScheduler } from "./schedule.type";

const setGlobalSchedule = () => {
  const schedules: JobScheduler[] = [
    new MealJobScheduler(),
    new NoticeJobScheduler()
  ];

  for(const schedule of schedules) {
    schedule.setShedule();
  }
}

export { setGlobalSchedule };