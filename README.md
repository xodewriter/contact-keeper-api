# ABOUT

This is a Node/Express/MongoDB REST API for contacts that uses JWT authentication. All contact endpoints are protected and each registered user has their own contacts.

## BACKEND PACKAGES

- `Express:` A minimalist framework that comes with a robust set of featurs & methods to easily write request & response handlers, use template engines, middleware and more.

- `MongoDB:` The database being used to store the project data

- `Mongoose:` An Object Design Modeling tool (ODM) used to asynchronously work with data. It comes with methods to interact with a MongoDB. A `Schema` is defined to describe the data structure of an object, a `Model` is a fancy constructor compiled from a Schema definition used to create a document/record, and a collection is a list containing documents/records of the same type. Example: A schema is the blueprint that for example can define the properties a "user" has, the model is used to create that "user" and store it in a collection of "users".

- `Bcryptjs:` A password hashing function that can convert a string to an encrypted hash and vice versa decode a hash back into a string.

- `Config:` Organizes global configuration files and structures them in a hierarchical manner according to your structure. This file should be hidden in .gitignore

- `Express-validator:` A middleware used to validate form submissions and to ensure they follow the proper structure. Example: A username cannot be empty, a password cannot be too simple, and an email address must be of proper format.

- `Concurrently:` Allows to run the frontend & backend at the same time in a single command.

## FRONTEND PACKAGES

- `UUID:` To generate random IDs before for testing before connecting to a db.

- `axios:` HTTP request library that is promise based

- `react-router-dom:` For routing

- `react-transition-group:` For animated effects
