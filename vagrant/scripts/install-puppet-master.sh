
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


#sudo chown vagrant -hR etc/puppetlabs/

sudo touch /etc/puppetlabs/code/environments/production/manifests/default.pp
sudo echo "file { '/home/vagrant/agents/agent1.txt':
      content => 'works!',
}" >> /etc/puppetlabs/code/environments/production/manifests/default.pp