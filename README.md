<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://sensishare.org/">
    <img src="http://sensishare.org/img/logo_green_mini.png" alt="Logo">
  </a>

  <h3 align="center"><a href="http://sensishare.org/api/">SensIshare.org</a></h3>

  <p align="center">
    An API system to share sensor data
    <br />
    <a href="https://sensishare.org/api/"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://sensishare.org/contact/">Ask for demo</a>
    ·
    <a href="https://github.com/GuiZ88/sensishare/issues">Report Bug</a>
    ·
    <a href="https://github.com/GuiZ88/sensishare/issues">Request Feature</a>
  </p>
</p>



<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#arduino">Arduino Examples</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

SenshIshare is an educational tool based on a REST API communication system, with NodaJs technology, for communication with and between IoT devices for the detection of specific measures. The need for centralization of surveys is a fundamental phase for the subsequent analysis of the same, in this project the aim is to create a server architecture capable of centralizing different data sensors, not homogeneous, interfaced through an API system. All in the perspective of an easy and accessible management.You can already imagine the usefulness of sharing sensors, eliminating redundancies, accessing remote data from a sensor in the repository managed by another user.

You can find request access to the system or create your own. Please go to sensishare.org for more information.

### Built With
* [NodeJs](https://nodejs.org/)
* [Express](https://expressjs.com/)
* [moongoose](https://mongoosejs.com/)
* [MongoDB](https://www.mongodb.com/)

<!-- GETTING STARTED -->
## Getting Started

This is an example of how you may give instructions on setting up your project locally.
To get a local copy up and running follow these simple example steps.

### Prerequisites

This is an example of how to list things you need to use the software and how to install them.
* npm
  ```sh
  npm install npm@latest -g
  ```
You will also need a MongoDB database. Please follow this instructions [https://docs.mongodb.com/manual/installation/](https://docs.mongodb.com/manual/installation/)

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/GuiZ88/sensishare.git
   ```
2. Install NPM packages
   ```sh
   npm install express --save
   npm install mongoose --save
   ```
3. Update the environment configuration in `common/auth/env.config.js`
   ```JS
   module.exports = {
    "port": 3600,
    "appEndpoint": "http://api.sensishare.org:3600", // app
    "apiEndpoint": "http://api.sensishare.org:3600", // api
    "AdminAuthKey": "N&sWc4]s&ae*r<5y.n!GL{M8_C^-sR2~XzMF5z-$r:{y)d(vWGa{K7_3@z4", // strong password for admin operation
    "environment": "dev" // enviroment
  };
   ```
4. Change MondoDB connection string `common/services/mongoose.service.js`
   ```JS
   mongoose.connect("mongodb://localhost:27017/sensors", options)
   ```



<!-- USAGE EXAMPLES -->
## Usage
To use the API you can follow the documentation on the site where all available calls are described.
_For more examples, please refer to the [API Documentation](http://sensishare.org/api/)_

<!-- ROADMAP -->
## Roadmap

See the [open issues](https://github.com/GuiZ88/sensishare/issues) for a list of proposed features (and known issues).

<!-- ARDUINO -->
## arduino

See the [arduino examples](https://github.com/GuiZ88/sensishare/tree/main/arduino/mkr_1010) for some examples of integration with Arduino.


<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request


<!-- LICENSE -->
## License

Distributed under the GNU GENERAL PUBLIC LICENSE Version 3 . See `LICENSE` for more information.


<!-- CONTACT -->
## Contact

Guido Camerlingo - [@Guiz88](https://twitter.com/guiz88) - g.camerlingo@gmail.com

Project Link: [https://github.com/GuiZ88/sensishare](https://github.com/GuiZ88/sensishare)
