//Sets the text of currentDay element to the current day. 
function setCurrentDay() {
    $('#currentDay')
    .text(
        moment().format( 
            "dddd, MMMM Do YYYY, h:mm:ss a"
        )
    );
}

setCurrentDay()