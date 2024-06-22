# DressMe

App to help a user decide what to wear based on a fixed API.
Hours to make: 20.

# How to run

-   yarn (install dependecies)
-   yarn dev

*   make sure you have yarn installed, was made with node v20.9.0 using Vite.

# Navigation

Navigation is be both from a side menu and from the main screen, this is a small app and adding multiple ways to access the same screens easily makes for better user experience.
Once a clothing item is selected the user will navigate to the next one based on nullability of the selected array, when he finishes choosing the last item he will get to the saved sets page after a popup.

There's a back button at any stage that is not homepage.

# Clothing Select

-   All clothing are in the same component it is obvious case of polymorphism.
-   Sorting is based on an algorithm or size/color(alphabetically)
-   For simplicity select just adds the item and continues the process.
-   The card element supports adding more elements without changing the structure, it's easier to maintain, the design is not very supportive of the fact though.
-   The button placement just looks right.
-   I decided to put a little icon instead of a picture.
-   I didn't manage to find a solution for popups and navigation, since popups only appear on one screen I made it local. if I were to revisit the app I would find a way to implement it as a global thing.

# Recommendation Algorithm

the algorithem will recommend the user items based on size and color of the first selected element.
Size - looked up convertion rates of letters to sizes, used the UK/US convertions size it is similar, used a proximity sort, if it's close tot he first item it will be recommended.
Color - sadly the values given are in words I originally wanted a convoluted hexcode matching technique, but due to time constraints I will match the color.
I don't take options from the user this is just for sorting.

# General Notes

-   The design and color choices are not made by a graphic designer so it won't look pretty, the layout is also lacking and I am aware of it, it's somethign that on a product you ask the customer's opinion or UI/UX designer.

-   Since it wasn't requested there is no "reset set" button, or a way to delete sets, also in the context of a closet it makes no sense to take out elements of the selection but that's what was requested.

# Known bugs

-   There's a problem with mobx persist, due to the time constraint so far I couldn't find a solution it's a console bug, refreshing the pages just doesn't work too well, so avoid that.
