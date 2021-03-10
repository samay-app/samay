#!/bin/bash

# A shell script to start the Node.js servers 
# along with the mongod process, all of which
# are necessary for RocketMeet-client to function.

# Get the init system of the developer's platform.
initSystem=`ps --no-headers -o comm 1`

# Perform a check and start mongod.
if [ "$initSystem" = "init" ]
then
    sudo service mongod start
else 
    sudo systemctl start mongod
fi

# Start RocketMeet-server
npm run dev --prefix ../RocketMeet-server/ &

# Start RocketMeet-mailer
npm run dev --prefix ../RocketMeet-mailer/ &

# Start RocketMeet-client
npm run dev