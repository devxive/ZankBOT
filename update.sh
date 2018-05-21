#!/bin/bash
#############################################################
## Phantombot Installer Tool for Ubtuntu 16.04             ##
##                                                         ##
##                                                         ##
## Released under the MIT-License                          ##
##                                                         ##
## (c) 2016 - 2017 by SteamTeam Devs. All rights reserved. ##
## lead developer Lahmizzar                                ##
#############################################################
clear
#############################################################
## TODO
## CHECK FOR MISSING THINGS AND BUILD HOW TO
## HOW-TO: INSTALL AND CONFIGURE REQUIREMENTS
#############################################################

## First, thest if we have root prevs
if [[ $EUID -ne 0 ]]; then
   echo "This script must be run as root" 1>&2
   exit 1
fi

## Second, check if the var is not empty
if [ -z "$1" ]
then
	echo "Sie müssen ein Usernamen als Botuser deklarieren z.B.:# ./update.sh botuser"
	exit 1;
else
	echo "** Update wird durchgeführt mit Botuser-Accounts ($1) **"
	echo
	echo "... stoppe $USERNAME"
	systemctl stop $USERNAME

	## Lowercase username
	USERNAME="${1,,}"

	## Check if user already exists
	if id "$USERNAME" >/dev/null 2>&1; then
        echo "Der Benutzer existiert bereits!"
		echo "Die Einrichtung des Benutzeraccounts wird übersprungen..."
	else
		echo "Der Benutzer wurde nicht gefunden. Bitte überprüfen Sie Ihre Angaben"
		exit 1;
	fi

	## Backup des alten Verzeichnisses
	TIMESTAMP=`date +%Y-%m-%d_%H-%S-%s`
	echo "Download and backup phantombot"
	echo
	echo "Get latest version..."
	VERSION=$(wget -O - "https://raw.githubusercontent.com/devxive/meebot/master/version")
	
	mv meebot meebot-old_${TIMESTAMP}
	## wget https://github.com/devxive/meebot/releases/download/v${VERSION}/meebot-${VERSION}.zip
	wget https://github.com/devxive/meebot/blob/master/archive/meebot-${VERSION}.zip?raw=true -O /home/$USERNAME/meebot-${VERSION}.zip
	unzip meebot-${VERSION}.zip

	mv source meebot
	rm meebot-${VERSION}.zip

	cp -R /home/$USERNAME/meebot-old_${TIMESTAMP}/config/ /home/$USERNAME/meebot/

	cd /home/$USERNAME/meebot
	chmod u+x launch-service.sh launch.sh

	echo "Set File and Folder Ownership to $USERNAME:$USERNAME"
	chown -R $USERNAME:$USERNAME /home/$USERNAME/meebot

	echo
	echo "Melden Sie sich mit dem neuen Benutzernamen folgendermaßen an (Es wird kein Passwort benötigt):"
	echo "su - $USERNAME"
	echo "Starten Sie den Bot anschließend mit sudo systemctl start $USERNAME"
fi