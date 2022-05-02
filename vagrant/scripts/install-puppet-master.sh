
wget https://apt.puppet.com/puppet7-release-focal.deb
sudo dpkg -i puppet7-release-focal.deb
sudo apt update -y 
sudo apt install -y puppetserver 
sudo echo "$1 puppet" >> /etc/hosts
sudo systemctl enable puppetserver.service
sudo systemctl start puppetserver.service

wget https://apt.puppet.com/puppet-tools-release-focal.deb
sudo dpkg -i puppet-tools-release-focal.deb
sudo apt-get update 
sudo apt-get install puppet-bolt

wget https://apt.puppet.com/puppet-tools-release-focal.deb
sudo dpkg -i puppet-tools-release-focal.deb
sudo apt-get update
sudo apt-get install pdk

sudo apt-get update
sudo apt-get upgrade -y

sudo apt install default-jdk -y
sudo apt install default-jre -y

sudo group add puppeters
sudo usermod -a -G puppeters puppet
sudo usermod -a -G puppeters vagrant

sudo chgrp -R puppeters etc/puppetlabs
sudo chmod -R 770 etc/puppetlabs

sudo puppet module install puppetlabs-puppetdb --version 7.10.0

sudo cp /vagrant/manifests/default.pp /etc/puppetlabs/code/environments/production/manifests/default.pp
sudo cp /vagrant/manifests/agents.pp /etc/puppetlabs/code/environments/production/manifests/agents.pp
sudo cp -r /vagrant/manifests/agents /etc/puppetlabs/code/environments/production/manifests/agents

sudo puppet agent -t