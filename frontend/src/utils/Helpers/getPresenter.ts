import { ActivityType } from "@/types/Activities";
import { Person } from "@kokitotsos/react-components/dist/types";

export const getPresenter = (activity: ActivityType) => {

        if (activity.type === 'presentation') {
        return activity.presenter as Person[];
        } else if (activity.type === 'externalpresentation') {
        return activity.externalPresenter as Person[];
        }

}
