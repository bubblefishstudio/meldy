Meldy - A mood-based melody generator
=====================================

Meldy is a simple grammar-model melody generator, based on a user-provided mood expressed in the valence-arousal plane.
It's developed as project for "Advanced Coding Tools and Methodologies" and "Computer Music: Representations and Models" courses of the MSc in Music and Acoustic Engineering of Politecnico di Milano.

The slides for ACTAM can be found [here](https://mttbernardini.github.io/nuvola/docs/slides.html).

Demo Video
----------

[![demo video thumbnail](/docs/pic/demovideo-thumb.png)](https://youtu.be/GXCEjtqoQWU)


Project Description
-------------------

![overview](/docs/pic/overview.svg)

The main focus of this project is on the _melody generation_ step.

### Mood Selection

User is expected to provide a mood for generating the melody.
We adopted the dimensional approach from Music Emotion Recognition [9] to describe moods in a two-dimentional plane, so we have _valence_ (i.e. the positivity of the mood) on the x-axis and _arousal_ (i.e. the intensity of the mood) on the y-axis.

![mood picker](/docs/video/mood.gif)

The picker is realized using `p5.js` [4] and the relevant code can be found at [`/front-end/src/p5/mood_picker_sketch.js`](/front-end/src/p5/mood_picker_sketch.js).

### Melody Generation

Melody is generated starting from _valence_ and _arousal_ values, by producing a MusicXML score for music representation.
MusicXML is better suited than other formats (e.g. MIDI), because it's meant for _notation_ representation (rather than _playing_ representation), and can effectively carry harmonical information that would be lost in other formats (e.g. enharmonic equivalence, key signature and scale mode [11]).

At first, a mapping is made between the mood and three main music features: scale **mode**, **tempo** and central **octave** of the melody, as shown in the following figure. This mapping is inspired by MER studies on music features [9].

<img alt="mood mapping" src="/docs/pic/mapping.svg" width="500">

Then, a grammar method [8] is used to generate the relative degrees (within one octave range) and the duration of each note of the melody. In the current version, we are using a hand-crafted Markov Chain that we empirically built by trial and error. Different rulesets are defined for different "snap"-points of both _valence_ and _arousal_. These can be found in files [`/back-end/data/grades.yml`](/back-end/data/grades.yml) and [`/back-end/data/durations.yml`](/back-end/data/durations.yml). An example of degree-chain is provided in the following picture, assuming a DO-mobile interpretation (i.e. DO = 1° degree):

<img alt="grammar" src="/docs/pic/grammar.svg" width="500">

_More details on the rationale of the melody generation can be found in [`/docs/melody-generation.md`](/docs/melody-generation.md)._

We employed the `music21` [1] library for the actual generation of the melody. The relevant code can be found in the class `MelodyGenerator` in source file [`/back-end/src/melody.py`](/back-end/src/melody.py). Since this is a Python library, this step is run on a separate back-end providing the following communication with the WebApp:

<img alt="client-server communication" src="/docs/pic/client-server.svg" width="500">

### Score display

![grammar](/docs/video/playback.gif)

The generated MusicXML is finally rendered on the web page thanks to `OpenSheetMusicDisplay` [2]. From this view, it's possible to playback the generate score, download it to open with a notation software (e.g. MuseScore) or go back to the mood selection view.

Navigation between views is achieved through `DOM` replacement of HTML fragments. The relevant code can be found at [`/front-end/src/navigation.js`](/front-end/src/navigation.js) and inside [`/front-end/src/views/`](/front-end/src/views/).

Resources
---------

1. [music21][m21]: a toolkit for computer-aided musicology.
2. [OpenSheetMusicDisplay][osmd]: renders MusicXML sheet music in the browser.
3. [OSMD Audio Player][osmd-ap]: browser based audio player for MusicXML scores.
4. [p5.js][p5]: JavaScript port of Processing.
5. [webpack][wp]: a bundler for JavaScript and friends.
6. [Flask][flask]: Python micro framework for building web applications.
7. [Pipenv][penv]: Python development workflow for humans.


Bibliography
------------

8. [McCormack, J. (1996). Grammar based music composition. _Complex systems,_ 96, 321-336.][grammar]
9. Yang, Y. H., & Chen, H. H. (2011). _Music emotion recognition._ CRC Press.
10. [Cuthbert, M., Ariza, C., Hogue, B., & Oberholtzer, J. W. (2020). Music21 Documentation][m21doc]
11. Sarti, A. (2019). Computer Music: Representation and Models. _Course material of MSc in Music and Acoustic Engineering_

----
 © 2020 Matteo Bernardini & Yilin Zhu


[m21]:     http://web.mit.edu/music21/
[osmd]:    https://opensheetmusicdisplay.org/
[osmd-ap]: https://github.com/jimutt/osmd-audio-player
[p5]:      https://p5js.org/
[flask]:   https://palletsprojects.com/p/flask/
[wp]:      https://webpack.js.org/
[penv]:    https://pipenv.pypa.io/en/latest/

[grammar]: http://users.monash.edu.au/~jonmc/research/Papers/L-systemsMusic.pdf
[m21doc]:  http://web.mit.edu/music21/doc/index.html
