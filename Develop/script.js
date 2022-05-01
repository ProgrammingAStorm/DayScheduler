var events = [];

//Sets the text of currentDay element to the current day. 
function setCurrentDay() {
    $('#currentDay')
    .text(
        moment().format( 
            "dddd, MMMM Do YYYY, h:mm:ss A" //This string is to set the right formatting of the moment object.
        )
    );
}

//Checks the time of each block against the current time and replaces its class accordingly.
function auditTimes() {
    var now = moment().format("h A");//The format needs to be set when now is initialized, otherwise isSame() won't compare properly, and the present class will never get assigned.

    $(".time-block").each(function(index){
        $(this).removeClass("future").removeClass("present").removeClass("past")

        if(moment(now, "h A").isBefore(
           moment($(this).attr("data-hour"),
           "h A"))) {
            $(this).find("textarea").addClass("future");
        }
        if(moment(now, "h A").isSame(
            moment($(this).attr("data-hour"),
            "h A"))) {
            $(this).find("textarea").addClass("present");
        }
        if(moment(now, "h A").isAfter(
            moment($(this).attr("data-hour"),
            "h A"))) {
            $(this).find("textarea").addClass("past");
        }        
    })
}

//Handler for the save event button
function saveEventHandler() {

}

//Saves the time blocks.
function saveEvents() {

}

//Loads the time blocks.
function loadEvents() {
    events = localStorage.getItem("events")

    if(!events) {
        events = []
    }
}

setCurrentDay();

auditTimes();
setInterval(auditTimes, (60 * 1000) * 15);

$(".container").on("click", "button", saveEventHandler)

loadEvents()