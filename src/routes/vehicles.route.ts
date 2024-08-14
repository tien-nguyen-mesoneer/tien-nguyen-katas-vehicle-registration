import { Request, Router } from "express";
import { IVehicle, VehicleStatus } from "../models/Vehicle";
import { ObjectId, sendResponse } from "../utils";
import { db } from "..";
import { IUser } from "../models/User";

const vehicleRouter: Router = Router();

/**
 * @route GET /vehicles
 * @description Get all vehicles
 * @access Public
 */
// TODO: Set up vehicles filter
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
  const { firstName, email, lastName, dob, gender, address, phone, code } =
    req.body;
  try {
    // Create a vehicle registration
    const createVehicleAction = await db
      .collection<IVehicle>("vehicles")
      .insertOne({
        email,
        firstName,
        lastName,
        dob,
        gender,
        address,
        phone,
        code,
        status: VehicleStatus.PENDING,
      });

    sendResponse(res, 200, true, "Success", createVehicleAction.insertedId);
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
      .updateOne(
        { _id: ObjectId(id) },
        { $set: { status: VehicleStatus.APPROVED } }
      );

    // Check no vehicle found
    if (!updateAction.matchedCount) {
      return sendResponse(res, 400, false, "Vehicle not found", null);
    }

    // Check vehicle is not updated
    if (!updateAction.modifiedCount) {
      return sendResponse(res, 400, false, "Vehicle is not updated", null);
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

/**
 * @route PUT /vehicles/:id/reject
 * @description Reject a vehicle registration request by vehicle Id
 * @access Private
 */
// TODO: Add middleware to check user role before accessing
vehicleRouter.put("/:id/reject", async (req, res) => {
  const { id } = req.params;

  try {
    // Update vehicle - approve the registration
    let updateAction = await db
      .collection<IVehicle>("vehicles")
      .updateOne(
        { _id: ObjectId(id) },
        { $set: { status: VehicleStatus.REJECTED } }
      );

    // Check no vehicle found
    if (!updateAction.matchedCount) {
      return sendResponse(res, 400, false, "Vehicle not found", null);
    }

    // Check vehicle is not updated
    if (!updateAction.modifiedCount) {
      return sendResponse(res, 400, false, "Vehicle is not updated", null);
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
