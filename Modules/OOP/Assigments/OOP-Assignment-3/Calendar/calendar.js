class CalendarEvent {
    constructor(eventTitle, eventDate, eventTime) {
        this.eventId = eventList.length + 1;
        this.eventTitle = eventTitle;
        this.eventDate = eventDate;
        this.eventTime = eventTime;
    }

    viewCalendarEvents() {
        console.log(`You have ${eventList.length} events planned.`);
        eventList.forEach((evt) => {
            console.log('-----------')
            console.log(`Event #${evt.eventId}: ${evt.eventTitle}  `);
            console.log(`Date: ${evt.eventDate}`);
            console.log(`Time: ${evt.eventTime}`);
        })
    }

    addCalendarEvent(obj) {
        console.log('Add Calendar Event');
        eventList.push(obj);
        console.log(`Event with Id ${obj.eventId} successfully created.`);
    }

    editCalendarEvent(eventId, eventTitle, eventDate, eventTime) {
        const editIdx = eventId - 1;
        eventList[editIdx].eventTitle = eventTitle;
        eventList[editIdx].eventDate = eventDate;
        eventList[editIdx].eventTime = eventTime;
        console.log(`Event with Id ${eventId} successfully edited.`);
    }

    deleteCalendarEvent(eventId) {
        eventList.splice(eventId - 1, 1);
        console.log(`Event with Id ${eventId} successfully cancelled and deleted.`);
    }
}

class CalendarApp extends CalendarEvent {
    constructor() {
        super();
        this.quitApp = false;
    }

    start() {
        while (!this.quitApp) {
            // Render menu
            this.renderMenu();

            // Ask question
            const option = prompt('Enter (1/2/3/4/5/6):');
            console.log(option);

            switch (option) {
                case '1':
                    super.viewCalendarEvents();
                    break;
                case '2':
                    const eventTitle = prompt('Enter your event:');
                    const eventDate = prompt('Enter your event date:');
                    const eventTime = prompt('Enter your event time:');
                    const itemObj = new CalendarEvent(eventTitle, eventDate, eventTime);
                    super.addCalendarEvent(itemObj);
                    break;
                case '3':
                    const editEventId = prompt('Enter the event ID you want to edit:');
                    const editEventTitle = prompt('Change the event title to ?:');
                    const editEventDate = prompt('Change the event date to ?:');
                    const editEventTime = prompt('Change the event time to ?:');
                    super.editCalendarEvent(editEventId, editEventTitle, editEventDate, editEventTime);
                    break;
                case '4':
                    const deleteEventId = prompt('Enter the event ID you want to cancel:');
                    super.deleteCalendarEvent(deleteEventId);
                    break;
                case '5':
                    console.log('Quit app');
                    this.quitApp = true;
                    break;
            }
        }
    }

    renderMenu() {
        console.log('');
        console.log('------ CALENDAR APP ------');
        console.log('What would you like to do?');
        console.log('1  View my schedule');
        console.log('2  Add new event');
        console.log('3  Edit existing event');
        console.log('4  Cancel event');
        console.log('5  Quit app');
        console.log('');
    }
}

const prompt = require('prompt-sync')();
let eventList = [];
const calendarSession = new CalendarApp();
calendarSession.start();