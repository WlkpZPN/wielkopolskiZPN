#!/bin/bash

# FTP server details
FTP_SERVER="serwer1710802.home.pl"
FTP_USER="licencje_ftp@wielkopolskizpn.pl"
FTP_PASSWORD="4Wt8EQYsfre54ges4f"
FTP_FOLDER="wnioski"

# Path to save the output file (change to your preferred file path)
OUTPUT_FILE="/c/Users/wawat/Desktop/ftp_file_list.txt"

# Use lftp to fetch the list of files
lftp -f << EOF
open -u $FTP_USER,$FTP_PASSWORD $FTP_SERVER
cd $FTP_FOLDER        # Navigate to the folder
cls -1 > $OUTPUT_FILE # Save the file list
bye
EOF

# Print message upon completion
echo "The list of files in folder '$FTP_FOLDER' has been saved to: $OUTPUT_FILE"