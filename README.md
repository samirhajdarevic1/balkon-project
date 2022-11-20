Unit 01: Introduction to School Database project

Unit 02: Overview
This is a Full Stack React App with Rest API to provide a way for users to administer a school database containing information about:

- subjects: users can interact with the database by retrieving a list of subjects, viewing detail for a specific course, as well as creating, updating and deleting subjects in the database.
- teachers: users can interact with the database by retreiving a list of teachers, viewing the details about specific teacher, and creating,
  updating and deleteing specific teachers
- pupils: users can interact with the database by retreiving pupils, reading informations about all or specific pupil, and also performing CRUD (create, read, update and delete) operations on every pupil
- grades: users can interact with the database by retreiving pupil's grades during school year and perform CRUD operations on every grade during active school year
- classes: users are able to filter school classes by selecting optioned school year, and also create new classes and add new pupils in it

* NOT FINNISHED admin: should be authorised, and after authorisation user can be able to perform crud operation on school years
* NOT FINNISHED In addition, the project will require users to create an account and sign in to make changes to the database.

Technologies used in this project
1.FOR CLIENT SIDE:
-HTML
-CSS
-JavaScript:
-React:
-Redux
2.FOR SERVER SIDE:
-Node JS 3. FOR PERFORMING TESTS:
-Cypress

In case you are not familiar with chosen technologies here are some link that'll help: -https://developer.mozilla.org/en-US/docs/Web/HTML -https://developer.mozilla.org/en-US/docs/Web/CSS -https://developer.mozilla.org/en-US/docs/Web/JavaScript -https://reactjs.org/ -https://redux.js.org/ -https://nodejs.org/en/ -https://www.cypress.io/blog/2019/02/05/modern-frontend-testing-with-cypress/

Unit 03: How to install and run the project:

Before starting project you'll need three separated terminals, one is for back-end, the other one for front-end and the third for running tests

To start server side:
Pay attention about folder navigation. If you are in the top point of folder you should navigate to the right folder by usnig cd server comand in your terminal
In the api terminal, run npm install to install the necessary modules.
Now, run npm start in the api terminal.

To start client side:
Navigate in client folder, and open the terminal.
In the client terminal, run npm install to install the necessary dependencies and modules.
After installation, run npm start. The app should open an instance on the web to view the project.
If a new instance did not open automatically, copy this http://localhost:3000/ to view the project.

To run UI tests:
Navigate to the client folder, and open the terminal.
In the terminal coppy this comand npx cypress open.
After this it should be opened your browser where you can choose typ of tests that you are performing.
Choose E2E tests, than navigate in the spec folder that holds our tests.
Now you are ready to perform some written tests

Unit 04: How to use project

\*\*\*LATER WILL BE SHOWED HOW TO REGISTER AND LOGIN FOLLOWED BY SCREENSHOTS
In this unit we'll describe some of the utilities that this app can do.
Here we will give the simpliest example of how to perform CRUD operations on the subjects.

1. How to CREATE subject:
   -After login in the application you should see navigation. In the navigation choose subjects route.
   You should be able to see subjects if they already exist in the database, if not there you should be a button with text "Add subject".
   Click on that button, it will open a form where you will be able to type name of subject in the input field.
   After you are done with typing, click on the "Finnish adding" button, and than you should be redirected on the page where you see your recently added button.

2. How to READ created subjects (If they exists in the database):
   -This is the easiest part of the project. All you need is to navigate to subjects route from the navbar, and you will be able to see all subjects

3. How to UPDATE existing subject:
   -In the navigation click on the "subjects", and than choose the subject that you want to update, and than click "details" buton. In the subject details section click on "edit" button. Now you can change the name field of the subject and than click on "finish updating" button to finish the updating operation.

4. How to delete subject:
   -Choose "subjects" from the navbar, than click on the "details" button on subject that you want to delete. In details section click on delete button, that will delete selectd subject and redirect you to the subjects section where you can see that your subject is deleted.
