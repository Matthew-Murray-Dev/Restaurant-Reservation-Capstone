# Capstone: Restaurant Reservation System

# Link to Live Documentation

front-end static server: https://restaurant-reservation-production-t80e.onrender.com


Back-end deployment: https://restaurant-reservation-application.onrender.com


# Capstone: Restaurant Reservation System

> I was hired as a full stack developer at _Periodic Tables_, a startup that is creating a reservation system for fine dining restaurants.
> This software is used only by restaurant personnel when a customer calls to request a reservation.
> At this point, the customers will not access the system online.
>This application contains functionality to display reservations by date, and by mobile number, and to display tables.  

Dashboard

![display functionality](.//readMeImages/Dashboard.JPG "Dashboard")

Search

![search display](./readMeImages/Search.JPG "Search")

It contains create and edit functionality for New reservations 

![create reservation](./readMeImages/NewReservation.JPG "NewReservation")

Create functionality for New tables

![create table](./readMeImages/NewTable.JPG "NewTable")

>Additional functionality includes the ability to cancel reservations, seat booked reservations, and finish seated reservations and clear seated tables.

## Api Documentation

The {url}/reservations provides a get request returning data in the form of:

 `{
    "data": [
        {
            "reservation_id": 1,
            "first_name": "firstName",
            "last_name": "lastName",
            "mobile_number": "123-456-7890",
            "reservation_date": "2021-01-01",
            "reservation_time": "20:00:00",
            "people": 1,
            "created_at": "2021-01-01T08:30:32.326Z",
            "updated_at": "2021-01-01T08:30:32.326Z",
            "status": "booked"
        }
    ]
}`

The {url}/tables provides a get request returning data in the form of:

 `{
    "data": [
        {
            "table_id": 3,
            "table_name": "#1",
            "capacity": 6,
            "reservation_id": null,
            "created_at": "2023-05-25T16:42:46.212Z",
            "updated_at": "2023-05-25T16:42:46.212Z"
        },
    ]
 }`

## Technologies used

>JavaScript
>React
>SQL
>Knex
>HTML
>CSS

## Existing files

This repository is set up as a *monorepo*, meaning that the frontend and backend projects are in one repository. This allows you to open both projects in the same editor.


The table below describes the folders in this repository:

| Folder/file path | Description                                                      |
| ---------------- | ---------------------------------------------------------------- |
| `./back-end`     | The backend project, which runs on `localhost:5001` by default.  |
| `./front-end`    | The frontend project, which runs on `localhost:3000` by default. |


## Installation

1. Fork and clone this repository.
1. Run `cp ./back-end/.env.sample ./back-end/.env`.
1. Update the `./back-end/.env` file with the connection URL's to your ElephantSQL database instance.
1. Run `cp ./front-end/.env.sample ./front-end/.env`.
1. You should not need to make changes to the `./front-end/.env` file unless you want to connect to a backend at a location other than `http://localhost:5001`.
1. Run `npm install` to install project dependencies.
1. Run `npm run start:dev` to start your server in development mode.

If you have trouble getting the server to run, reach out for assistance.

## Running tests

This project has unit, integration, and end-to-end (e2e) tests. You have seen unit and integration tests in previous projects.
End-to-end tests use browser automation to interact with the application just like the user does.
Once the tests are passing for a given user story, you have implemented the necessary functionality.

Test are split up by user story. You can run the tests for a given user story by running:

`npm run test:X` where `X` is the user story number.

Have a look at the following examples:

- `npm run test:1` runs all the tests for user story 1 (both frontend and backend).
- `npm run test:3:backend` runs only the backend tests for user story 3.
- `npm run test:3:frontend` runs only the frontend tests for user story 3.

Whenever possible, frontend tests will run before backend tests to help you follow outside-in development.

> **Note** When running `npm run test:X` If the frontend tests fail, the tests will stop before running the backend tests. Remember, you can always run `npm run test:X:backend` or `npm run test:X:frontend` to target a specific part of the application.

Since tests take time to run, you might want to consider running only the tests for the user story you're working on at any given time.

Once you have all user stories complete, you can run all the tests using the following commands:

- `npm test` runs _all_ tests.
- `npm run test:backend` runs _all_ backend tests.
- `npm run test:frontend` runs _all_ frontend tests.
- `npm run test:e2e` runs only the end-to-end tests.

If you would like a reminder of which npm scripts are available, run `npm run` to see a list of available commands.

Note that the logging level for the backend is set to `warn` when running tests and `info` otherwise.

> **Note**: After running `npm test`, `npm run test:X`, or `npm run test:e2e` you might see something like the following in the output: `[start:frontend] Assertion failed:`. This is not a failure, it is just the frontend project getting shutdown automatically.

> **Note**: If you are getting a `unable to resolve dependency tree` error when running the frontend tests, run the following command: `npm install --force --prefix front-end`. This will allow you to run the frontend tests.

> **Hint**: If you stop the tests before they finish, it can leave the test database in an unusual state causing the tests to fail unexpectedly the next time you run them. If this happens, delete all tables in the test database, including the `knex_*` tables, and try the tests again.

### Frontend test timeout failure

Running the frontend tests on a resource constrained computer may result in timeout failures.

If you believe your implementation is correct, but needs a bit more time to finish, you can update the `testTimeout` value in `front-end/e2e/jest.config.js`. A value of 10000 or even 12000 will give each test a few more seconds to complete.

#### Screenshots

To help you better understand what might be happening during the end-to-end tests, screenshots are taken at various points in the test.

The screenshots are saved in `front-end/.screenshots` and you can review them after running the end-to-end tests.

You can use the screenshots to debug your code by rendering additional information on the screen.

