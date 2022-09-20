export function convertMinToHourString(min: number){
    const hourString = String(Math.floor(min/60)).padStart(2, '0');
    const minString = String(min % 60).padEnd(2,'0');
    const timeString = [hourString,minString].join(':')

    return timeString;
}