# Course Rating API

### Requirements

#### Database connection
:white_check_mark: Mongoose is listed as a dependency in the package.json file.  
:white_check_mark: A message is written to the console when there’s an error connecting to the database.  
:white_check_mark: A message is written to the console when the database connection is successfully opened.

#### User Model
:white_check_mark: The User schema follows the provided specification:

```
{
  _id: ObjectId,
  fullName: String,
  emailAddress: String,
  password: String
}
```

#### Course Model
:white_check_mark: The Course schema follows the provided specification:

```
{
  _id: ObjectId,
  user: User._id,
  title: String,
  description: String,
  estimatedTime: String,
  materialsNeeded: String,
  steps: Array,
  reviews: Array
}
```

#### Review Model
:white_check_mark: The Review schema follows the provided specification:

```
{
  _id: ObjectId,
  user_ User._id,
  postedOn: Date,
  rating: Number,
  review: String
}
```

#### User Routes
:white_check_mark: `GET /api/users` returns the currently authenticated user.  
:white_check_mark: `POST /api/users` creates a new user.  
:white_check_mark: `GET /api/users` responds with a 401 if not authenticated.

#### Course Routes
:white_check_mark: `GET /api/courses` returns the `_id` and `title` properties.  
:white_check_mark: `GET /api/courses/:courseId` returns all properties for the provided course ID.  
:white_check_mark: `POST /api/courses` creates a new course.  
:white_check_mark: `PUT /api/courses/:courseId` updates a course.

#### Validation Errors
:white_check_mark: Validation errors generated from Mongoose are passed to Express.  
:white_check_mark: Validation errors received by an Express route are sent to Express’s global error handler.  
:white_check_mark: Mongoose style validation errors are sent from Express’s global error handler to the user as is, in JSON format.

#### Hooks and Methods
:white_check_mark: A pre save hook on the user schema encrypts the password property before saving it to the database.  
:white_check_mark: An `authenticate` static method on the User schema compares a password to the hashed password stored on a user document instance.

#### Permissions
:white_check_mark: An Express middleware function authenticates any routes using the `authenticate` static method on the User schema.

### Notes
I'm using `bluebird` and `co` for backwards compatibility.  

Confirmed working on Node v4.8.3 and v8.1.2.

### Instructions
1. Download or clone the repo.
2. Run `mongod` to start up a MongoDB server.
3. Run `npm run start` or `yarn start` to seed the database and start the Express server.
4. Open Postman and import the `postman.json` config file.
5. Run Postman's runner to run all the tests.
