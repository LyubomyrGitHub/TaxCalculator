# IncomeTaxCalculator

## Overview
This is a solution for a UK Income Tax Calculator built with .NET 9 (backend) and Angular 19 (frontend).
It calculates tax based on predefined tax bands stored in an database and provides a responsive UI.

## Requirements
- Runtime: Node v22.14.0 (use [nvm](https://github.com/coreybutler/nvm-windows) to manage more versions if you need)

## How to Run
1. **Backend**:
   - Navigate to `backend/TaxCalculator.WebApi/`.
   - Run `dotnet run`.
   - Access Swagger at `http://localhost:5000/swagger`.
2. **Frontend**:
   - Navigate to `frontend/TaxCalculator.UI/`.
   - Run `npm install`
   - Run `ng serve`
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

   **How to Rebuild:** 
   - Run next commands from the root directory.
powershell
    `docker-compose down`
    `docker-compose build --no-cache backend` for Backend or  `docker-compose build --no-cache frontend`for Frontend
    `docker-compose up --build`    or if needs logs     `docker-compose up --build > all_logs.txt 2>&1`