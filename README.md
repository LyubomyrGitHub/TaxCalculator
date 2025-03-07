# IncomeTaxCalculator

## Overview
This is a solution for a UK Income Tax Calculator built with .NET 9 (backend) and Angular 19 (frontend).
It calculates tax based on predefined tax bands stored in an database and provides a responsive UI.

## How to Run
1. **Backend**:
   - Navigate to `backend/TaxCalculator.WebApi/`.
   - Run `dotnet run`.
   - Access Swagger at `http://localhost:5000/swagger`.
2. **Frontend**:
   - Navigate to `frontend/TaxCalculator.UI/`.
   - Run `npm install` and `ng serve`.
   - Access the app at `http://localhost:4200`.

## How to Run Frontend Tests:
   **Navigate to `frontend/TaxCalculator.UI/`.**
   
   - Interactive mode: `ng test --project=tax-calculator-ui`

   - Single run (headless): `ng test --project=tax-calculator-ui --watch=false --browsers=ChromeHeadless`
   
   - Troubleshoot if needed: `ng test --project=tax-calculator-ui --verbose`

## Docker Setup
- Ensure Docker is installed.
- Run `docker-compose up --build` from the root directory.
- Backend: `http://localhost:5000`
- Frontend: `http://localhost:4200`
- SQL Server: `localhost:1433`

## Notes
- Update the connection string in `appsettings.json` or Docker environment variables to match your SQL Server setup.