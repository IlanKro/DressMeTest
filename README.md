# Dress Me

App to help a user decide what to wear based on a fixed API, this app is basically a closet simulator.

-   Hours to make: 24.

# How to run

-   yarn (install dependecies)
-   yarn dev

*   make sure you have yarn installed, was made with node v20.9.0 using Vite.

# Navigation

Navigation is be both from a side menu and from the main screen, this is a small app and adding multiple ways to access the same screens easily makes for better user experience.
Once a clothing item is selected the user will navigate to the next one based on nullability of the selected array, when he finishes choosing the last item he will get to the saved sets page after a popup.

There's a back button at any stage that is not homepage.
Pressing the Title (H1) on the header will navigate to the homepage, even on homepage, it's a common behavior to refresh the page.

# Clothing Select

-   All clothing are in the same component it is obvious case of polymorphism.
-   Sorting is based on an algorithm or size/color(alphabetically)
-   For simplicity select just adds the item and continues the process.
-   The card element supports adding more elements without changing the structure, it's easier to maintain, the design is not very supportive of the fact though.
-   The button placement just looks right.
-   I decided to put a little icon instead of a picture.
-   I didn't manage to find a solution for popups and navigation, since popups only appear on one screen I made it local. if I were to revisit the app I would find a way to implement it as a global thing.
-   On entering a clothing page without any clothing selected the timer(how much time it took to pick a set) will refresh.

# Saved Sets

-   Decided using a table since it's the simplest and most efficient way to show this info + completion time out of the table.
-   I wanted to make a popup for the deletion but it's not required, and it would mean more time making a 2 button popup.
-   I opted to put the deletion button in the header since it's efficient use of space which is needed for mobile apps, the garbage can icon is well known for deletion, I checked that deleting an item returns it to the array after going back to home, there might be a bug when going to other clothing items pages directly from the side menu, but I don't think it's such a big issue, could block navigation to those pages or ake the api call after the deletion, seems over complicating in this case.
-   I decided to make the array reversed as a user who just completed a set wants to look at it first.

# Recommendation Algorithm

the algorithem will recommend the user items based on size and color of the first selected element.

-   Size - looked up convertion rates of letters to sizes, used the UK/US convertions size it is similar, used a proximity sort, if it's closer to the first item it will be recommended, using an absolute function.
-   Color - sadly the values given are in words I originally wanted a hexcode matching technique, but due to time constraints I will match the color and recommend it first using both sorting methods.
    I don't take options from the user this is just for sorting.

# General Notes

-   The design and color choices are not made by a graphic designer so it won't look pretty, the layout is also lacking and I am aware of it, it's something that on a product you ask the customer's opinion or UI/UX designer.

-   In the context of a closet it makes no sense to take out elements of the selection but that's what was requested.

-   The API works on the home page, seemed the most logical, it refreshes every time the user goes to the main page, it's probably not ideal.

# Acknowledgments

-   Icons are from FreePik
-   Made with Vite

# Known bugs

-   Some bugs that due to time constraints were not adressed, I think that being aware of bugs in a project and respecting time limits is important if they are not making the product unusable they can be prioritized later and fixed. as this project had a time limit and I did not have much time I did not solve them.

*   There's a problem with mobx persist, due to the time constraint so far I couldn't find a solution it's a console bug mostly, but, refreshing the pages just doesn't work too well, so avoid that.
*   The color sorting might not work, the size one works.
*   Avoid navigating to a clothing select screen directly after deleting an item, it won't include the deleted item.
*   Popup doesn't work as an universal component.
