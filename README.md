The entire contents of this repository is written and belongs to me, except for the following:

1. cytoscape.min.js - Cytoscape.js library (https://github.com/cytoscape/cytoscape.js)

2. Icons in assets/ folder - Were taken from Flaticon (https://www.flaticon.com/free-icons/media-control) 


## Requirements

This system requires Node.js and NPM (Node Package Manager) to be installed:

1. Go to https://nodejs.org/en.

2. Navigate to 'Download' in the navbar.

3. Select the latest 'LTS' version and select your OS and system architecture.

4. Once installer is downloaded, run it (run as administrator if possible).
   Leave all options as default. Follow the instructions closely.


## Notes

In the following sections, project folder refers to the 'MST' folder/the directory containing index.html and the other files.


## First Time Installation

In your system's terminal, navigate to the project folder and run the following command:

```
npm install
```

## Run

Once installation process is done, anytime you want to launch the project, just follow the instructions in this section.

In your system's terminal, navigate to project folder and run:

```
npx serve
```

The URL should be copied to your clipboard, paste it in your browser. If not copied, copy from terminal manually.


## Testing

If you want to run tests, navigate to project folder and run:

```
npm test
```

## User guide and tips

- In the sandbox, comparison or PACO sandbox pages, calculate steps must be clicked before any playback happens (nothing
will happen if calculate steps isn't pressed). The steps must be loaded into the Algorithm Controller.

- Changing the graph, algorithm or any options should always reset the Algorithm Controller. There is no need to press calculate steps
multiple times when the steps are already calculated, it may lead to differences/out of sync animations, edge queue or MST cost

- If running any PACO algorithm in sandbox, comparison or PACO sandbox pages, after pressing calculate, please wait. The algorithm
runs many cycles and takes a couple of seconds to complete. When complete, you will be alerted that the algorithm has completed. You may
then use the media controls to play the steps.

- In the graph creation page as well as some pages like sandbox etc., 1 or more nodes may need to be selected. To do this, if it's any page
other than the graph creation page, you can click and drag your mouse to highlight the nodes, or hold SHIFT or CTRL and click nodes to select/unselect
multiple nodes (or even edges).
However if in the graph creation page, simple dragging clicking will not work as it will move the graph around. You must hold SHIFT or CTRL and then click
and drag, or alternatively hold SHIFT or CTRL and click nodes to select/unselect

- In graph creation page, the '+' button creates a node in the middle of the screen. '-' button deletes all selected elements

- In the graph creation page, to create edges, only 2 nodes must be selected (look at bullet point above this), and then add edge button must be pressed.
To delete elements (nodes or edges), once again select all elememts you want to delete then press the '-' button.