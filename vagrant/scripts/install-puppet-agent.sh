
wget https://apt.puppet.com/puppet7-release-focal.deb
sudo dpkg -i puppet7-release-focal.deb
sudo apt update -y
sudo apt install -y puppet-agent
sudo echo "$1 puppet" >> /etc/hosts

#sudo puppet agent -t 
