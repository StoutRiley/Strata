# Weekly Goals (Windows app)

Installs like any other program, then asks where to save your data.

## Get the installer (no software to install on your PC)
1. Create a new GitHub repository (public is fine: it contains only this app's code, none of your data).
2. Upload everything in this folder, including the hidden `.github` folder, to the repository.
3. Open the Actions tab > "Build Windows installer" > Run workflow.
4. After about 5 minutes, open the finished run and download "WeeklyGoals-Setup". Unzip it to get `Weekly Goals Setup 1.0.0.exe`.
   (For a permanent public download link, tag a release such as `v1.0.0`; the installer is attached to the Releases page.)

## Install
Run the setup file, pick an install location, and finish. On first launch, choose the folder where your data will be saved.

## Windows security warning
Windows may show "Windows protected your PC" because the installer is not signed with a paid certificate. Since you built it from code in your own repository, click More info > Run anyway.

## Your data
Saved as `weekly-goals-data.json` in the folder you chose, with a `.bak.json` copy of the previous session. To back up or move to another computer, copy that file. If you choose a OneDrive folder, OneDrive will sync the file for you.
