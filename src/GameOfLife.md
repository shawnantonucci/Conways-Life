                                                      Shawn Antonucci’s
                                                        Game Of Life
                                                    based off John Conways

Conway's Game of life is a cellular automaton game. Game of life is a zero player game where the user picks a predetermined preset
or creates their own configuration of cells that either die off, reproduce and die off, or overpopulate. The game requires that you
have a grid of empty cells where the cells are either dead or alive. When a cell lives its illuminated and visable.

Rules

1.  Any live cell with fewer than two live neighbors dies, as if by under population.
2.  Any live cell with two or three live neighbors lives on to the next generation.
3.  Any live cell with more than three live neighbors dies, as if by overpopulation.
4.  Any dead cell with three live neighbors becomes a live cell, as if by reproduction.


                                                        Implementation

For any of this to work we need a data structure. I went with using arrays in JavaScript. I built out a function that created a grid
by looping over a predetermined grid length and height, where the length is the rows and the height is the columns. The next step would
require us to take a cell any one cell in the grid and check its neighboring cells. If a neighboring cell exists we need to add that to
a count. We take that total count and run a conditional on it to either kill or create a new cell based on the count of neighbors. To animate
this process i chose to use the DOM itself in react no additional libraries used but you could use something like canvas, pixi.js, or three.js
they are all libraries for 2d and 3d rendering. for my code base i used react with react hooks.

With react hooks re rendering is a bit tricky because unlike a class component with a state value you set with setState. SetState reads the
current value and the next value its receiving and will update correctly. However with react hooks a usestate only checks its current value
and changes state rendering one time. To get my state to render on each change I had to do some research and found an article by Dan Abromov
explaining how to re render on each change with hooks. Using a custom hook we have a setInterval function where we pass our game logic function
in as a callback along with a game speed we then can use two useEffects to get our updated state at every state change.

For styling I used semantic UI for the buttons I am using to play, pause or clear out the automaton. I have a group of buttons to choose your
default speed and a group of buttons to change the initial grid size. then last but not least a group of buttons with preset cells that do
some pretty cool animations with the automaton grid.

When building out the presets I built them so that they would scale no matter the grid size by looping over the grid and finding the middle.
after getting the middle I used bracket notation to pick on an x, y axis of what additional cells I wanted and where I wanted them.
