//calculating waterlevel based on interval and when it was last watered
function setWaterLevel(lastWater, interval) {
    const today = new Date();

    const last = new Date(lastWater);
    
    const differenceMs = today.getTime() - last.getTime();
    const differenceDays = Math.floor(differenceMs / 1000 / 60 / 60 / 24);

    const waterNeed = (differenceDays / interval);

    let level;

    if (waterNeed >= 0.80){
        level = "Empty";
    } else if (waterNeed >= 0.60){
        level = "Almost empty";
    } else if (waterNeed >= 0.40){
        level = "Medium";
    } else if (waterNeed >= 0.20){
        level = "Almost full";
    } else if (waterNeed >= 0){
        level = "Full";
    }

    return level;
}

//converting the long date object to a simple, readable string
function displayTime(timestamp) {
    const date = new Date(timestamp);
    let year = date.getFullYear();
    let month = date.getMonth()+1;
    let dt = date.getDate();

    if (dt < 10) {
    dt = '0' + dt;
    }
    if (month < 10) {
    month = '0' + month;
    }

    return dt + '/' + month + '/' + year;

}

//returning the right styled water bar based on waterlevel
function waterLevelBar (waterlevel) {
    if(waterlevel === 'Full') {
        return (
            <div id="bar">
                <div id="level4"></div>
                <div id="level3"></div>
                <div id="level2"></div>
                <div id="level1"></div>
            </div>
        )
    } else if(waterlevel === 'Almost full') {
        return (
            <div id="bar">
                <div id="level4"></div>
                <div id="level3"></div>
                <div id="level2"></div>
                <div id="level1" style={{backgroundColor: "white"}}></div>
            </div>
        )
    } else if(waterlevel === 'Medium') {
        return (
            <div id="bar">
                <div id="level4"></div>
                <div id="level3"></div>
                <div id="level2" style={{backgroundColor: "white"}}></div>
                <div id="level1" style={{backgroundColor: "white"}}></div>
            </div>
        )
    } else if(waterlevel === 'Almost empty') {
        return (
            <div id="bar">
                <div id="level4"></div>
                <div id="level3" style={{backgroundColor: "white"}}></div>
                <div id="level2" style={{backgroundColor: "white"}}></div>
                <div id="level1" style={{backgroundColor: "white"}}></div>
            </div>
        )
    } else if(waterlevel === 'Empty') {
        return (
            <div id="bar">
                <div id="level4" style={{backgroundColor: "white"}}></div>
                <div id="level3" style={{backgroundColor: "white"}}></div>
                <div id="level2" style={{backgroundColor: "white"}}></div>
                <div id="level1" style={{backgroundColor: "white"}}></div>
            </div>
        )
    }
}

export { setWaterLevel, displayTime, waterLevelBar };