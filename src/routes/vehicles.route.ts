import { Request, Router } from "express";
import { IVehicle } from "../models/Vehicle";
import { ObjectId, sendResponse } from "../utils";
import { db } from "..";
import { IUser } from "../models/User";

const vehicleRouter: Router = Router();

/**
 * @route GET /vehicles
 * @description Get all vehicles
 * @access Public
 */
vehicleRouter.get("/", async (req, res) => {
  try {
    let vehicles = await db.collection<IVehicle>("vehicles").find({}).toArray();
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
    // Create a vehicle registration
    let vehicle = await db
      .collection<IVehicle>("vehicles")
      .insertOne({ user: userId, code, approved: false });

    // Update user info
    await db
      .collection<IUser>("users")
      .updateOne(
        { user: userId },
        { $set: { firstName, lastName, dob, gender, address, phone } }
      );

    sendResponse(res, 200, true, "Success", vehicle);
  } catch (error) {
    console.log(error);
    sendResponse(res, 500, false, "Internal Server Error", null);
  }
});

/**
 * @route GET /vehicles/:id
 * @description Get vehicle by specified id
 * @access Public
 */
vehicleRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    let vehicle = await db
      .collection<IVehicle>("vehicles")
      .findOne({ _id: ObjectId(id) });

    if (!vehicle) {
      return sendResponse(res, 400, false, "Vehicle is not found", null);
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
