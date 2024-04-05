import { ActivityType } from "@/types/Activities";
import { getWeek } from "date-fns";

const hasOverlappingActivity = (activity: ActivityType, activities: ActivityType[]) => {
    return activities.some(
      (otherActivity) =>
        otherActivity !== activity &&
        otherActivity.start.getTime() < activity.end.getTime() &&
        otherActivity.end.getTime() > activity.start.getTime(),
    );
  };

  const hasThreeOngoingActivities = (activity: ActivityType, activities: ActivityType[]) => {
    const activityStart = activity.start.getTime();
    const activityEnd = activity.end.getTime();

    // Iterate over each minute in the duration of the activity
    for (let time = activityStart; time < activityEnd; time += 60000) {
      let overlappingActivities = 0;

      // Check if there are three or more activities that overlap with the current time
      for (let otherActivity of activities) {
        if (otherActivity !== activity) {
          const otherStart = otherActivity.start.getTime();
          const otherEnd = otherActivity.end.getTime();

          if (otherStart < time && otherEnd > time) {
            overlappingActivities++;
          }

          if (overlappingActivities >= 2) {
            return true;
          }
        }
      }
    }

    return false;
  };

const calculateStartQuarter = (activity: ActivityType) => {
    const startHour = new Date(activity.start).getHours();
    const startMinutes = new Date(activity.start).getMinutes();
    const startQuarter = startHour * 4 + Math.floor(startMinutes / 15);
    return Math.ceil(startQuarter);
  };

  const calculateEndQuarter = (activity: ActivityType) => {
    const endHour = new Date(activity.end).getHours();
    const endMinutes = new Date(activity.end).getMinutes();
    const endQuarter = endHour * 4 + Math.floor(endMinutes / 15);
    return Math.ceil(endQuarter);
  };

const getGridLayout = (
    activity: ActivityType,
    sortedActivitesByDate: ActivityType[],
    separatedActivities: ActivityType[],
  ) => {
    let gridRowStart = calculateStartQuarter(activity) + 1;
    let gridRowEnd = calculateEndQuarter(activity) + 1;
    let columnSpan = 0;
    let detailsSlice = 200;
    let numberOfParallellActivities = 1;

    const startWeek = getWeek(sortedActivitesByDate[0].start);
    const currentActivityWeek = getWeek(activity.start);

    // Calculate the number of days between the first activity and the current activity
    const firstActivityDate = new Date(sortedActivitesByDate[0].start).getDay();
    const currentActivityDate = new Date(activity.start).getDay();
    const diffDays = currentActivityDate - firstActivityDate;

    // Adjust the gridRowStart and gridRowEnd values based on the number of days difference
    gridRowStart += diffDays * 24 * 4; // Multiply by 24 hours and 4 quarters per hour
    gridRowEnd += diffDays * 24 * 4;

    if (currentActivityWeek > startWeek) {
      gridRowStart += 24 * 4 * 7;
      gridRowEnd += 24 * 4 * 7;
    }

    if (hasThreeOngoingActivities(activity, separatedActivities)) {
      columnSpan = 2;
      detailsSlice = 50;
      numberOfParallellActivities = 3;
    } else if (hasOverlappingActivity(activity, separatedActivities)) {
      columnSpan = 3;
      detailsSlice = 100;
      numberOfParallellActivities = 2;
    } else {
      columnSpan = 6;
    }
    return {
      gridRowStart,
      gridRowEnd,
      columnSpan,
      detailsSlice,
      numberOfParallellActivities,
    };
  };