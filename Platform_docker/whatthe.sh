#! /bin/sh
# date 2>&1 | tee "$1"
 USER="loya"
 userwork="${USER}work"

 echo "$userwork"
 VAR1="Hello, "
VAR2="${VAR1}World"
echo "$VAR2"

 OBJECTCONTAINER="images_container"
OUTVOL="VM_OUTPUT/"
#node upload_dir.js  $OBJECTCONTAINER $USER_workspace/ $OUTVOL 
cd GreyDocker 
pwd