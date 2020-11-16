function formatTime(time) {

    let yy = time.getFullYear();
    let mm = time.getMonth().toString().padStart(2, 0);
    let dd = time.getDate().toString().padStart(2, 0);
    let h = time.getHours().toString().padStart(2, 0);
    let m = time.getMinutes().toString().padStart(2, 0);
    let s = time.getSeconds().toString().padStart(2, 0);

    return `${yy}-${mm}-${dd} ${h}:${m}:${s}`
}

export default formatTime