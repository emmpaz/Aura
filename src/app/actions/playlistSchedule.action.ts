
enum TimeSlot {
    WAKINGUP,
    INWORK,
    AFTERNOON,
    LOGGINGOFF
}

export interface PlaylistSchedule{
    [TimeSlot.WAKINGUP] : string,
    [TimeSlot.INWORK] : string,
    [TimeSlot.AFTERNOON] : string,
    [TimeSlot.LOGGINGOFF] : string,
}

export const getCurrentPlaylist = (schedule : PlaylistSchedule | null) => {
    if(!schedule) return null;

    const currentHour = new Date().getHours();
    if(currentHour >= 5 && currentHour <= 9) return schedule[TimeSlot.WAKINGUP];
    if(currentHour >= 9 && currentHour <= 12) return schedule[TimeSlot.INWORK];
    if(currentHour >= 12 && currentHour <= 17) return schedule[TimeSlot.AFTERNOON];
    if(currentHour >= 17) return schedule[TimeSlot.LOGGINGOFF]; 

    return '';
}