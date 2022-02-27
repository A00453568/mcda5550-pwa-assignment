# PWA Assignemnt
Create a PWA todo app.

*P.S. You can use plain JavaScript (Vanilla) or React*

## Step 1: Build your app
Create a page containing the following elements: 

1. A header containing the name of the app 
2. A subheader containing your name
3. A form with 3 inputs 
    a. Task Name
    b. Due Date
    c. Assigned To (The name of the task assignee)
    *(Bonus: now you can have all the values as plain string types, but **+0.5pts** if you can save "Due Date" as a date type)*
4. A list of all the tasks with its information, you can markdown your tasks like this: 
```html
<h1>Task name</h1>
<h2>Due Date: 01/01/2023</h2>
<p>Assigned: Jon Snow</p>
```
The goal is to load the tasks in that list element.

### Code references you can use
For the **form** check out `02-local-storage/index.html`, lines 20 - 23. And, `03-indexeddb/index.html`, lines 23 - 34.

For loading the task list, check `02-local-storage/index.html`, line 18. And `02-local-storage/script.js`, line 4 + lines 16 - 22.

## Step 2: Add IndexedDB
The tasks should be saved to IndexedDB and be read from there (you can use Dexie)

Create a table with these elements:
- `id`
- `taskName`
- `dueDate`
- `assignedTo`

For how to hook IndexedDB and read/write data to it, check `03-indexeddb/index.html`, line 42-44 , and check the `db.js` file.
*(Bonus: **+0.5pts**, if you can make the `id` auto-incremental, see Dexie documentation)*

Don't forget to import dexie, (see `03-indexeddb/index.html` line 42)

## Step 3: Enhance your app
Make the app into a PWA! Add the service workers, manifest file, the icons (you can use any icons), and the tags.
Check out `01-simple-pwa/finished` for reference.

## Rubric
At the end, you'll have an app similar to the todo app in `02-local-storage` but with extra inputs and data.
I will grade based on the following: 
- Todo app is working (2.5 pts)
- Data gets saved correcly to IndexedDB (2.5 pts)
- The app is PWA (3pts) – App works offline, app has icon, & app is installable (you can check that, by making sure you see the app manifest file inside Chrome Dev Tool) 
- Bonus point: see above (1 pt)

## Misc
To access the app information in the chrome devtool, right click, then click inspect, then go to the "Application" tab.

