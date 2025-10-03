import * as auth from "./auth.service.js";
import * as token from "./token.service.js";
import * as doctor from "./doctor.service.js";
import * as patient from "./patient.service.js";
import * as appointment from "./appointment.service.js";

export const authService = auth;
export const tokenService = token;
export const doctorService = doctor;
export const patientService = patient;
export const appointmentService = appointment;