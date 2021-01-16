# NYTimes

This repository contains codebase for "NY Times Most Popular Articles".


## Functionalities implemented in this project
- user registration and login has been implemented after integration
with local server using this repo -> https://github.com/techiediaries/fake-api-jwt-jsonserver
- The token fetched from login call, is being passed through all NY Times requests in Authorization JWT Bearer token header.
- A middleware has been implemented to refresh the token after 15 minutes or whenever it expires.
- User can either select to see categorized top news(Home, World or Science) or search for articles.
- On click of "Home" and "World" and "Science" tab , top news of each category is automatically loaded.
- Search has been implemented, we can input search text in search input, press Enter key or click 'Search' button to search the news corresponding to entered text.
- Last 5 searches are shown below the search bar and we can click on any of the search history item to search it again.
- Pagination has been implemented in search results page to fetch more results while click pagination button.
- Spinner has also been implemented whenever we are making a network call.
- Best coding practices has been used and proper modules are created for better readability.
### `npm install`
you should npm install and npm install concurrently,it is necessary to run the code
### `npm run start`
Runs the app in the development mode and start the local server\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

you can see all the page and feature.the page contains three tabs,you can click then tab and the data will reload.you can click sign in in right tab and enter the correct to sign(incorrect enter will disable the btn)

### `npm run test`

Run `npm run test` to run the unit test cases. now, I have only written a test case to test action for asyncActions


