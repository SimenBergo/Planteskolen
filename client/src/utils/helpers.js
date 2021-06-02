function setWaterLevel(lastWater, interval) {
    const today = new Date();

    const last = new Date(lastWater);
    
    //console.log('dato sist vann: ' + last);

    const differenceMs = today.getTime() - last.getTime();
    const differenceDays = Math.floor(differenceMs / 1000 / 60 / 60 / 24);

    //console.log('difference in miliseconds: ' + differenceMs);
    //console.log('difference in days: ' + differenceDays);

    //console.log('last water: ' + lastWater);
    //console.log('interval: ' + interval);

    const waterNeed = (differenceDays / interval);
    //console.log('need: ' + waterNeed);

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

    //console.log('level: ' + level);

    return level;
}

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