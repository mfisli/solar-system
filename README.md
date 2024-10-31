# Solar System
The purpose of this project is to model the solar system in a 3D environment with the sun and planets. The main motivation is to provide a better representation of the size and relative distances between plants and the sun. Often we see images of our solar system with all the planets having a roughly similar size and fairly close to one another. While this is easy to comprehend, it is not a good model for how vast and big things really are. This project enables the user to render the system in their browser and dynamic change of size and distances so that they can get a better feel for why Earth is often called a "pale blue dot".

For more information about this project and the developer, please see: https://maksfisli.com 

## Local Setup
- git clone
- npm install
- npm start

## Tech Stack
- Builder: Vite
- Components: React
- Language: TypeScript
- State Management: useContext and useState hooks
- Style: Pure CSS
- 3D Rendering: Three JS + Tree-Fiber + Drei
- Shaders: glsl
- Testing: Jest + React Testing Lib (TODO)
- Version Control: GitHub
- Deploymnet: GitHub Actions + GitHub Pages

## TODOS
System Items
- Correct planet rotation on axis
- Pitch / tilt of planets
- ~~ Add scale to items (relative to earth radius) ~~
- ~~ Scale ~~
  - ~~ Initial values ~~
  - ~~ Correct scale between AU and radius ~~
- Add moons
- Asteroid belt
- ~~ Rings (eg saturn) ~~
- ~~ Background stars / skybox ~~
- Ort Cloud
- Floating labels for planet names
- ~~ Orbit rings / paths ~~
- Well known comets + orbit
- Well known human-made satellites + travel paths
- Floating labels pointing to famous characteristics
  - eg Jupiter's big red dot, Saturn's hex shaped polar storm

View Settings
- ~~ Range input for AU ~~
- ~~ Range input for planet radius ~~
- ~~ Prev, next plant focus ~~
- ~~ Checkbox fixed zoom ~~
- ~~ Checkbox show orbit lines ~~
- ~~ Reset ~~
- ~~ Link to personal site ~~
- ~~ Toggle show menu ~~

Camera
- ~~ On click focus for plants ~~
- Maintain camera orbital position

Admin Panel
- Menus
- Layout
- Gameify
  - Unlock / discover plants
  - Probes for getting data
  - Graphs and tables showing plant stats
- Display facts sheet on system items
  - That is, similar to data section below

Effects
- ~~ Sun emits light ~~
- ~~ Sun emits light rays ~~
- ~~ Bloom ~~
- ~~ Shadows on planets ~~
- Eclipes / moon shadows on items
- Earth city lights in shadow
- PS1 graphics lol

## Data
Mercury
- 1,516mi (2,440km) radius (0.3) 
- about 1/3 the size of Earth
- 0.39 AU
- Days in year: 88 

Venus
– 3,760mi (6,052km) radius
- only slightly smaller than Earth (0.94)
- 0.72 AU
- Days in year: 224.7

Earth
- 3,959mi (6,371km) radius
- 1.00 AU (149,597,870.7 km)
- Days in year: 365

Mars
– 2,106mi (3,390km) radius
- about half the size of Earth (0.53)
- 1.52 AU
- Days in year: 699.584

Jupiter
- 43,441mi (69,911km) radius
- 11x Earth's size (10.97)
- 5.20 AU
- Days in year: 4346.475

Saturn
- 36,184mi (58,232km) radius
- 9x larger than Earth (9.14)
- 9.54 AU
- Days in year: 10847.92

Uranus
- 15,759mi (25,362km) radius
- 4x Earth's size (3.98)
- 19.22 AU
- Days in year: 30790.58

Neptune
- 15,299mi (24,622km) radius
- 4x Earth's size (3.86)
- 30.06 AU
- Days in year: 60193.2

## Sources and attribution
- https://github.com/theshanergy/solarsystem
- https://www.youtube.com/watch?v=XXzqSAt3UIw
- https://www.youtube.com/watch?v=0g4TI9gcZWE 
- https://www.solarsystemscope.com/textures/ 
- https://planetpixelemporium.com/earth.html 
- https://sos.noaa.gov/catalog/datasets/
- https://science.nasa.gov/solar-system/planets/ 