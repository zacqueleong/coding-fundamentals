function getDays(date1, date2) {

    const milisecondsPerDay = 1000 * 60 * 60 * 24;

    // Minus date1 with date2 with getTime() method, to obtain difference in Miliseconds
    let diffTime = date2.getTime() - date1.getTime();
    
    // Divide Total Miliseconds difference with Miliseconds/day to get how many days difference.
    let diffDays = diffTime / milisecondsPerDay;
    console.log(diffDays);
    return diffDays;
}

// Test cases
getDays(new Date("June 14, 2019"),
    new Date("June 20, 2019")
);

getDays(new Date("December 29, 2018"),
    new Date("January 1, 2019")
);

getDays(new Date("July 20, 2019"),
    new Date("July 30, 2019")
);