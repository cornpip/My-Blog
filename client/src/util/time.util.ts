function timeShow(time: string) {
    const rtime = new Date(time);
    return `${rtime.getFullYear()}-${(rtime.getMonth() + 1).toString().padStart(2, "0")}-${rtime.getDate().toString().padStart(2, "0")}`;
}

export {timeShow};