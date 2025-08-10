# Hospital Management System - Junction Schema

A Node.js/Express application implementing a hospital management system using Mongoose with junction schema pattern for Doctor, Patient, and Consultation entities.

## Project Structure

```
├── config/
│   └── db.js                 # Database connection configuration
├── model/
│   ├── doctor.model.js       # Doctor schema
│   ├── patient.model.js      # Patient schema
│   └── consultation.model.js # Consultation junction schema
├── controller/
│   ├── doctor.controller.js  # Doctor CRUD operations
│   ├── patient.controller.js # Patient CRUD operations
│   └── consultation.controller.js # Consultation operations
├── routes/
│   ├── doctor.routes.js      # Doctor API routes
│   ├── patient.routes.js     # Patient API routes
│   └── consultation.routes.js # Consultation API routes
├── index.js                  # Main server file
├── package.json              # Dependencies
└── README.md                 # This file
```

## Database Schema

### Doctor Schema
```javascript
{
  name: String,
  specialization: String,
  isActive: { type: Boolean, default: true }
}
```

### Patient Schema
```javascript
{
  name: String,
  age: Number,
  gender: String,
  isActive: { type: Boolean, default: true }
}
```

### Consultation Schema (Junction)
```javascript
{
  doctorId: { type: ObjectId, ref: 'Doctor' },
  patientId: { type: ObjectId, ref: 'Patient' },
  consultedAt: { type: Date, default: Date.now },
  notes: String,
  isActive: { type: Boolean, default: true }
}
```

## Setup Instructions

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start MongoDB**
   Make sure MongoDB is running on your local machine (default: localhost:27017)

3. **Start the Server**
   ```bash
   node index.js
   ```

The server will start on port 3000 (or the port specified in the PORT environment variable).

## API Endpoints

### Doctor Endpoints

#### 1. Add New Doctor
- **POST** `/doctors`
- **Body:**
  ```json
  {
    "name": "Dr. John Smith",
    "specialization": "Cardiology"
  }
  ```

#### 2. Get Patients by Doctor
- **GET** `/doctors/:id/patients?limit=10`
- **Query Parameters:**
  - `limit` (optional): Number of patients to return (default: 10)
- **Response:** List of patients with consultation details

#### 3. Get Consultation Count by Doctor
- **GET** `/doctors/:id/consultations/count`
- **Response:** Total number of active consultations for the doctor

#### 4. Delete Doctor (Soft Delete)
- **DELETE** `/doctors/:id`
- **Cascade:** Marks doctor and all related consultations as inactive

### Patient Endpoints

#### 1. Add New Patient
- **POST** `/patients`
- **Body:**
  ```json
  {
    "name": "Jane Doe",
    "age": 35,
    "gender": "Female"
  }
  ```

#### 2. Get Doctors by Patient
- **GET** `/patients/:id/doctors`
- **Response:** List of doctors with consultation details

#### 3. Get Patients by Gender
- **GET** `/patients?gender=Male`
- **Query Parameters:**
  - `gender`: "Male", "Female", or "Other"
- **Response:** List of active patients of specified gender

#### 4. Delete Patient (Soft Delete)
- **DELETE** `/patients/:id`
- **Cascade:** Marks patient and all related consultations as inactive

### Consultation Endpoints

#### 1. Add New Consultation
- **POST** `/consultations`
- **Body:**
  ```json
  {
    "doctorId": "doctor_object_id",
    "patientId": "patient_object_id",
    "notes": "Patient consultation notes"
  }
  ```
- **Validation:** Only allows consultation if both doctor and patient are active

#### 2. Get Recent Consultations
- **GET** `/consultations/recent`
- **Response:** Last 5 active consultations with populated doctor and patient details

## Testing with Postman/Thunder Client

### Sample Test Data

1. **Create Doctors:**
   ```json
   POST /doctors
   {
     "name": "Dr. John Smith",
     "specialization": "Cardiology"
   }
   ```

2. **Create Patients:**
   ```json
   POST /patients
   {
     "name": "Jane Doe",
     "age": 35,
     "gender": "Female"
   }
   ```

3. **Create Consultation:**
   ```json
   POST /consultations
   {
     "doctorId": "doctor_id_from_step_1",
     "patientId": "patient_id_from_step_2",
     "notes": "Regular checkup completed"
   }
   ```

### Test Scenarios

1. **Test Cascade Delete:**
   - Create doctor, patient, and consultation
   - Delete the doctor using DELETE `/doctors/:id`
   - Verify that both doctor and consultation are marked as inactive

2. **Test Gender Filter:**
   - Create multiple patients with different genders
   - Use GET `/patients?gender=Male` to filter male patients

3. **Test Consultation Validation:**
   - Try to create consultation with inactive doctor/patient
   - Should return error message

## Features Implemented

✅ **Basic CRUD Operations**
- POST /doctors - Add new doctor
- POST /patients - Add new patient  
- POST /consultations - Add consultation (with validation)

✅ **Read Operations with Mongoose Functions**
- GET /doctors/:id/patients - Using .populate(), .select(), .sort(), .limit()
- GET /patients/:id/doctors - Using .populate(), .select()
- GET /doctors/:id/consultations/count - Using .countDocuments()
- GET /patients?gender=Male - Using .find() with filters
- GET /consultations/recent - Using .find(), .sort(), .limit()

✅ **Soft Delete with Cascade**
- DELETE /doctors/:id - Marks doctor and related consultations as inactive
- DELETE /patients/:id - Marks patient and related consultations as inactive

✅ **Best Practices**
- Clean project structure
- Consistent naming and indentation
- Proper error handling and status codes
- Input validation
- CORS support

## Error Handling

The API includes comprehensive error handling:
- 400: Bad Request (missing required fields, invalid data)
- 404: Not Found (resource doesn't exist)
- 500: Internal Server Error

All error responses follow a consistent format:
```json
{
  "success": false,
  "message": "Error description",
  "error": "Detailed error message"
}
```

## Success Responses

All success responses follow a consistent format:
```json
{
  "success": true,
  "message": "Operation completed successfully",
  "data": "Response data"
}
``` 