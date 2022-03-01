# BAGEL-Javascript

BAGEL: The Basic Adaptable Game Engine Library (JavaScript implementation)

The meaning behind the BAGEL acronym:
* *Basic*: built from first principles and does not make use of any other software libraries
* *Adaptable*: can be used to create a variety of video games
* *Game Engine*: a software framework primarily designed for the development of video games
* *Library*: a collection of reusable functions and classes that serve a particular purpose

[BAGEL Documentation](https://stemkoski.github.io/BAGEL-Javascript/out/index.html)

Example games available:
* [Starfish Collector](https://stemkoski.github.io/BAGEL-Javascript/examples/starfish-collector.html)
    * a collection-style game (the "Hello, world!" of game programming)
* [Starfish Collector Deluxe](https://stemkoski.github.io/BAGEL-Javascript/examples/starfish-collector-deluxe.html)
    * an improved version of the Starfish Collector game; includes automatic Sprite update system, Physics, world boundary and wrapping functions, and Gamepad support
* [Space Rocks](https://stemkoski.github.io/BAGEL-Javascript/examples/space-rocks.html)
    * an Asteroids-inspired game; play with keyboard or (XBox-style) gamepad

Notes:
* Running locally requires a web server. This is easy with Python, but requires a bit of configuration so that *.js files are served as "application/javascript" and not "text/plain"; this is handled by the file `server.py` in the root directory.
