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

    $(".time-block").each(index => {
        $(this).find("textarea").removeClass("future").removeClass("present").removeClass("past")

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
    var text = $(this).prev().val();

    saveEvents(text, $(this).parent().attr("data-pos"));
}

//Saves the time blocks.
function saveEvents(text, pos) {
    loadEvents();

    for(var x = 0; x < events.length; x++) {
        if(events[x].pos === pos) {
            events.splice(x, 1, {
                text: text,
                pos: pos
            })

            localStorage.setItem("events", JSON.stringify(events));

            return
        }
    }

    events.push({
        text: text,
        pos: pos
    });

    localStorage.setItem("events", JSON.stringify(events));
}

//Loads the time blocks.
function loadEvents() {
    events = JSON.parse(localStorage.getItem("events"));

    if(!events) {
        events = [];
    }
}

//Loads saved events into the time blocks.
function loadElements() {
    loadEvents();

    $(".time-block").each(index => {
        for(var x = 0; x < events.length; x++) {
            if($(this).attr("data-pos") === events[x].pos) {
                $(this).find("textarea").val(events[x].text);
                break;
            }
        }
    })
}

setCurrentDay();

auditTimes();
setInterval(auditTimes, (60 * 1000) * 15);

$(".container").on("click", "button", saveEventHandler)

loadEvents()
loadElements()