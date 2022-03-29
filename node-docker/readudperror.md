Recently I faced problem while setup docker compose application

ERROR: Get https://registry-1.docker.io/v2/: dial tcp: lookup registry-1.docker.io on [::1]:53: read udp [::1]:57728->[::1]:53: read: connection refused
after short internet reading I discovered that it is connected with DNS query problems that are generated from my machine to ISP DNS server.

To avoid that kind of problems in future just redirected all my DNS traffic to the Google DNS instead of local ISP.

For doing it just need to edit resolv.conf file in Your Debian based machine:

Step 1

vi /etc/resolv.conf
Step 2
Insert following lines if the file is empty or edit appropriate

nameserver 8.8.8.8
nameserver 8.8.4.4
After changing the DNS, 

Then restart Docker, 
In my case I installed Docker via snap so run,

sudo systemctl daemon-reload

Run this command to list all the services:

sudo systemctl list-units --type=service
Look for the correct Docker service name (in my case it is snap.docker.dockerd.service) then run:

sudo systemctl restart snap.docker.dockerd.service

The problem is then resolved.