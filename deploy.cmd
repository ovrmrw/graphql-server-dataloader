robocopy . ../wwwroot /s /XD node_modules
cd ../wwwroot
npm run build:azure
