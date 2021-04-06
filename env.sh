#!/bin/bash

# This is a script that takes a .json file and converts it into
# .env file. The .json file can be of the format,
# {
# "var1"="value"
# "var2"="value"
# }
# The corresponding .env file would contain
# VAR1=value
# VAR2=value

usage() {
    echo "Usage: env.sh <path to your .json file>"
    exit 1
}

if [ $# -ne 1 ]
then
    usage
fi

content=$(cat $1)
alter=0
hold=0
output=""

for word in $content
do
    word=$(echo $word | tr -d '"')
    word=$(echo $word | tr -d ':')
    word=$(echo $word | tr -d ',')
    
    if [ "$word" = "-----BEGIN" ]
    then
        hold=1
        equals="="
        output=$output$equals
    fi

    if [ "$word" = "client_email" ]
    then
        hold=0
        /bin/echo -E $output >> .env
        output=$(echo $word | tr '[a-z]' '[A-Z]')
        continue
    fi

    if [ $hold -eq 1 ]
    then
        space=" "
        output=$output$space$word
    fi
    
    if [ "$word" != "}" -a "$word" != "{" -a $hold -eq 0 ]    
    then
        if [ $alter -eq 1 ]
        then
            alter=0
            equals="="
            output=$output$equals$word
            echo $output >> .env
            output=""
        else
            alter=1
            word=$(echo $word | tr '[a-z]' '[A-Z]')
            output=$output$word
        fi
    fi
done
