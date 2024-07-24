#!/bin/bash
echo -e "\nStarting setup...\n"

# Install node packages in the root folder
echo -e "\nInstalling packages in the root folder...\n"
npm install

# Install node packages in the frontend folder
cd frontend || exit
echo -e "\nInstalling packages in the frontend folder...\n"
npm install

cd ..

# Build application
echo -e "\nBuilding application...\n"
npm run build

echo -e "\n\033[0;32mSuccess! Serve the project by running \033[0;35mnpm start\033[0m"