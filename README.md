# Cellular Automaton
Inspired by John Conway's Game of Life. My goal is to build upon his idea and try to add more lifelike properties. Also my first Processing project.

## Features:
- Float values (0.0-1.0) for cells
- Pause with spacebar. Then R for a random world and C to clear
- Debug mode with stats printing on screen

## How to contribute?
You need to have [Processing](https://processing.org) installed (tested on Processing 3 on mac). If using vscode to edit the code, the [processing plugin](https://marketplace.visualstudio.com/items?itemName=Tobiah.language-pde) and [java extention pack](https://marketplace.visualstudio.com/items?itemName=vscjava.vscode-java-pack) are good to have.

To run the code in the Processing editor, just open the `.pde` file and press the play button. For vscode, install processing-java in the mac home dir (`/Users/{username}/processing-java`) and configure this path in vscode. Then `cmd+shift+b` compiles and runs the code.

[Real Python blog](https://realpython.com/oop-in-python-vs-java/) comparing object oriented concepts in python and java

## More ideas to explore:
- click to edit cells
- prebuilt templates to add to the board
- add random probability (possibly changing)
- refine continuous value concept
- read images as starting points
- track history over time (lerp maybe)
- what if cells travel to an env they feel more suitable?
- nested automata?
- evolution?
- use audio signals?

## License
MIT
