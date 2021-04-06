#!/bin/sh

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

echo $#
if [ $# -ne 1 ]
then
    usage
fi

content=$(cat $1)
alter=0
output=""

for word in $content
do
    word=$(echo $word | tr -d '"')
    word=$(echo $word | tr -d ':')
    word=$(echo $word | tr -d ',')
    
    if [ "$word" != "}" -a "$word" != "{" ]    
    then
        if [ $alter -eq 1 ]
        then
            alter=0
            equals="="
            nl="\n"
            output=$output$equals$word$nl
        else
            alter=1
            word=$(echo $word | tr '[a-z]' '[A-Z]')
            output=$output$word
        fi
    fi
done

echo $output > .env
