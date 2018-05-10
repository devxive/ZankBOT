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
PBVERSION="https://github.com/PhantomBot/PhantomBot/releases/download/v2.4.0.3/PhantomBot-2.4.0.3.zip"
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

###		## Do some updates and install required software
###		LOGFILE="/tmp/phantombot-installer.log"
###		if [ ! -f "$LOGFILE" ]
###		then
###			echo "Performing Updates..."
###			apt update && apt-get upgrade -y > $LOGFILE
	apt install -y openjdk-8-jdk-headless wget unzip bzip2 htop
###		fi

## Second, check if the var is not empty
if [ -z "$1" ]
then
	echo "Sie müssen ein Usernamen als Botuser deklarieren z.B.:# ./install.sh botuser"
	exit 1;
else
	echo "** Einrichtung des Botuser-Accounts ($1) **"
	echo

	## Lowercase username
	USERNAME="${1,,}"

	## Check if user already exists
	if id "$USERNAME" >/dev/null 2>&1; then
        echo "Der Benutzer existiert bereits!"
		echo "Die Einrichtung des Benutzeraccounts wird übersprungen..."
	else
		## Create the user
		echo "Folgender Benutzer wird eingerichtet: $USERNAME"
		adduser --disabled-password --gecos "" $USERNAME
	fi

	## Download and install phantombot
	echo "Download and install phantombot"
	echo
	echo "Get latest version..."
	VERSION=$(wget -O - "https://raw.githubusercontent.com/devxive/meebot/master/version")

	cd /home/$USERNAME
	wget https://github.com/devxive/meebot/blob/master/archive/meebot-${VERSION}.zip?raw=true -O /home/$USERNAME/meebot-${VERSION}.zip
	unzip meebot-${VERSION}.zip
	rm meebot-${VERSION}.zip
	mv source meebot
	cd /home/$USERNAME/meebot
	chmod u+x launch-service.sh launch.sh

	echo "Set File and Folder Ownership to $USERNAME:$USERNAME"
	chown -R $USERNAME:$USERNAME /home/$USERNAME/meebot

	echo "Setting up a systemd Unit"
	rm /etc/systemd/system/${USERNAME}.service
	cat > /etc/systemd/system/${USERNAME}.service <<EOL
[Unit]
Description=${USERNAME}
After=network.target remote-fs.target nss-lookup.target

[Service]
User=${USERNAME,,}
Group=${USERNAME,,}
Restart=on-failure
RestartSec=30
ExecStart=/home/${USERNAME}/meebot/launch-service.sh
KillSignal=SIGTERM

[Install]
WantedBy=multi-user.target
EOL

systemctl daemon-reload
systemctl enable ${USERNAME}

echo "${USERNAME} ALL=NOPASSWD: /bin/systemctl start ${USERNAME}, /bin/systemctl stop ${USERNAME}, /bin/systemctl restart ${USERNAME}, /bin/systemctl status ${USERNAME}" >> /etc/sudoers
fi

echo
echo "Melden Sie sich mit dem neuen Benutzernamen folgendermaßen an (Es wird kein Passwort benötigt):"
echo "su - $USERNAME"
echo "Starten Sie den Bot anschließend mit sudo systemctl start $USERNAME"