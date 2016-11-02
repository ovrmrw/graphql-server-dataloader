REM copy files from repository dir to wwwroot dir.
robocopy . ../wwwroot /S /XD node_modules jspm_packages .git .vscode

REM change current dir to wwwroot.
cd ../wwwroot

REM run build task.
npm run build:azure
