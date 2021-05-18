import { NoticeJobScheduler } from "../../notice/schedule/notice.scheduler";
import { JobScheduler } from "./schedule.type";

const setGlobalSchedule = () => {
  const schedules: JobScheduler[] = [
    new NoticeJobScheduler()
  ];

  for(const schedule of schedules) {
    schedule.setSchedule();
  }
}

export { setGlobalSchedule };