# cardtrackr
Credit Card Expense Tracker

CARDTrackr is a credit card expense tracker web application developed for Sigma School's Intermediate Final Project.

Technology used:
HTML / CSS / JAVASCRIPT

Charts was made possible by Chart.js

Walkthrough / Tour Video of the Application:
https://youtu.be/Hu_SJUAO5MA

This web application contains a few sections explained below.

Login Section
- You can create new account/user and login
- Simple validation where it will check if existing username has been created, it wont allow you to create the account with the same username.

Dashboard Section
- This section will provide a few helpful metrics derived from the cards and expenses added in the application
  
Card Section
- You can add / edit / delete cards here
- Card selection is stored in bankJson.json (located in the json folder)
- Credit card number integrity can be validated with Luhn's Algorithm by toggling the "Validation" switch during add/edit card.

Expenses Section
- You can add / edit / delete / filter expenses here after adding a card.
- Recent Expenses would show the top 3 recent expenses added, click on "Show All" to see more.

Analytics Section
- Select a card and you can view your expenses data in graphs
- Graphs was rendered using chart.js
- As of initial release, there are 2 graphs generated namely
    - Expenses by Category
    - Expenses by Month

All data created through this web application persist in LocalStorage. 

