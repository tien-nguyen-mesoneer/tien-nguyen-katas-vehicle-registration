# tien-nguyen-katas-vehicle-registration

## API Documentation

### Authentication

#### Sign In

- **Endpoint:** `POST /auth/login`
- **Description:** Sign users in
- **Access:** Public
- **Request Body:**
  - `email`: string
  - `password`: string

### Users

#### Get All Users

- **Endpoint:** `GET /users`
- **Description:** Get all users
- **Access:** Public

#### Create a User

- **Endpoint:** `POST /users`
- **Description:** Create a new user
- **Access:** Public
- **Request Body:**
  - `email`: string
  - `role`: string

### Vehicles

#### Get All Vehicles

- **Endpoint:** `GET /vehicles`
- **Description:** Get all vehicles
- **Access:** Public

#### Create a Vehicle

- **Endpoint:** `POST /vehicles`
- **Description:** Create a new vehicle (register request)
- **Access:** Public
- **Request Body:**
  - `userId`: string
  - `code`: string

#### Get Vehicle by ID

- **Endpoint:** `GET /vehicles/:id`
- **Description:** Get a vehicle by specified ID
- **Access:** Public

#### Approve Vehicle Registration

- **Endpoint:** `PUT /vehicles/:id/approve`
- **Description:** Approve a vehicle registration request by vehicle ID
- **Access:** Private
