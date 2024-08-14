import { Request, Router } from "express";
import { IVehicle } from "../models/Vehicle";
import { ObjectId, sendResponse } from "../utils";
import { db } from "..";
import { IUser } from "../models/User";

const vehicleRouter: Router = Router();

/**
 * @route GET /vehicles
 * @description Get all vehicles that are NOT approved
 * @access Public
 */
// TODO: Set up vehicles filter via params
vehicleRouter.get("/", async (req, res) => {
  try {
    let vehicles = await db
      .collection<IVehicle>("vehicles")
      .find({ approved: false })
      .toArray();
    sendResponse(res, 200, true, "Success", vehicles);
  } catch (error) {
    sendResponse(res, 500, false, "Internal Server Error", null);
  }
});

/**
 * @route POST /vehicles
 * @description Create a new vehicle (create a register request)
 * @access Public
 */
vehicleRouter.post("/", async (req: Request, res) => {
  const { userId, firstName, lastName, dob, gender, address, phone, code } =
    req.body;
  try {
    // Check if perform user exist
    const user = await db
      .collection<IUser>("users")
      .findOne({ _id: ObjectId(userId) });

    if (!user) {
      return sendResponse(res, 400, false, "Invalid user id", userId);
    }
    // Create a vehicle registration
    const createVehicleAction = await db
      .collection<IVehicle>("vehicles")
      .insertOne({ userId: user._id, code, approved: false });

    const vehicle = await db
      .collection<IVehicle>("vehicles")
      .findOne({ _id: createVehicleAction.insertedId });

    if (!vehicle) {
      return sendResponse(
        res,
        400,
        false,
        "Created vehicle not found",
        createVehicleAction.insertedId
      );
    }

    // Cross update the 2 instances
    // 1. Update user with the created vehicle
    await db.collection<IUser>("users").updateOne(
      { _id: ObjectId(userId) },
      {
        $set: {
          firstName,
          lastName,
          dob,
          gender,
          address,
          phone,
          vehicle,
        },
      }
    );
    // 2. Update vehicle with updated user
    const updatedUser = await db
      .collection<IUser>("users")
      .findOne({ _id: ObjectId(userId) });

    if (!updatedUser) {
      return sendResponse(
        res,
        400,
        false,
        "Updated user not found",
        createVehicleAction.insertedId
      );
    }

    const updatedVehicle = await db
      .collection<IVehicle>("vehicles")
      .updateOne({ _id: vehicle._id }, { $set: { user: updatedUser } });

    console.log(updatedVehicle);

    sendResponse(res, 200, true, "Success", vehicle);
  } catch (error) {
    console.log(error);
    sendResponse(res, 500, false, "Internal Server Error", null);
  }
});

/**
 * @route GET /vehicles/users/:id
 * @description Get vehicle of a user by specified user id
 * @access Public
 */
vehicleRouter.get("/users/:id", async (req, res) => {
  const { id } = req.params;
  try {
    let vehicle = await db
      .collection<IVehicle>("vehicles")
      .findOne({ userId: ObjectId(id) });

    if (!vehicle) {
      return sendResponse(
        res,
        200,
        false,
        "You have not registered a vehicle",
        null
      );
    }
    sendResponse(res, 200, true, "Success", vehicle);
  } catch (error) {
    console.log(error);
    sendResponse(res, 500, false, "Internal Server Error", null);
  }
});

/**
 * @route PUT /vehicles/:id/approve
 * @description Approve a vehicle registration request by vehicle Id
 * @access Private
 */
// TODO: Add middleware to check user role before accessing
vehicleRouter.put("/:id/approve", async (req, res) => {
  const { id } = req.params;

  try {
    // Update vehicle - approve the registration
    let updateAction = await db
      .collection<IVehicle>("vehicles")
      .updateOne({ _id: ObjectId(id) }, { $set: { approved: true } });

    // Check no vehicle found
    if (!updateAction.matchedCount) {
      return sendResponse(res, 400, false, "Vehicle not found", null);
    }

    // Query the updated vehicle
    let vehicle = await db
      .collection<IVehicle>("vehicles")
      .findOne({ _id: ObjectId(id) });

    sendResponse(res, 200, true, "Success", vehicle);
  } catch (error) {
    console.log(error);
    sendResponse(res, 500, false, "Internal Server Error", null);
  }
});

export default vehicleRouter;
