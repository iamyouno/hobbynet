# HobbyNet

We hope happy hobby life :)

- URL: https://iamyouno.github.io/hobbynet/ (Optimized in desktop size)

- Git Repo: https://github.com/iamyouno/hobbynet

- Library and frameworks: React, Font Awesome, React rating stars component, Reactjs popup

by CS374, team Passionista

## 1. Introduction

- This is website for people who can't enjoy their hobby life because of their **fixed-routine**

## 2. Description of main features

- We have 3 main features, **hobby test**, **review system**, and **hobby timetable**

- In main page, you can access to those features by clicking each icon

### 2.1. Hobby test

- It takes about 1-2 minutes

- Modifying your choice is not allowed!

- Recommend you to choose as clearly as you can :)

- You can get more information by clicking "See review", or you can test it again by clicking "Try again"

### 2.2. Review system

- You can look around reviews that other users have already written.

- If you like some review, you can give "like".

- You can use search bar or select box to find specific reviews.

- After looking around, leave your own hobby review:)

- you can leave comments and your schedule, rate points for the chosen hashtags. 

### 2.3. Hobby timetable

-  You can add your fixed schedule from the above tag container on the timetable. 

-  You can erase or reset your timetable.

-  You can find hobby based on your fixed schedule. 

-  Others' time distributions and reviews are provided.

## 3. Description of codes

<pre><code>/src/App.js</code></pre>

- Connect pages

<pre><code>/src/index.js</code></pre>

- base js file for react, It has <App/> by component.

<pre><code>/src/main.js</code></pre>

- Implementation of main page

<pre><code>/src/hobbytest/hobbyTest.js</code></pre>

- Implementation of hobby test explanation page

<pre><code>/src/hobbytest/test.js</code></pre>

- Implementation of hobby test and result page

<pre><code>/src/hobbytest/questions.js, result.js</code></pre>

- Question & results data file

<pre><code>/src/reviewpage/reviewPage.js</code></pre>

- Bulletin board type page, to see and search reviews.

<pre><code>/src/reviewpage/reviewSearch.js</code></pre>

- It is a page for each review, and we will add a comment function or a photo attachment function in the future. (In this project, we do not use)

<pre><code>/src/schedule/schedule.js</code></pre>

- Main page for treating user's timetable.

<pre><code>/src/schedule/Modal.js</code></pre>

- It is a modal layout for Find hobby button.

<pre><code>/src/schedule/Modal2.js</code></pre>

- It is a modal layout for See Time distribution button.
