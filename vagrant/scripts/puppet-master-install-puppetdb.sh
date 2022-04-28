
sudo apt update
sudo apt install -y postgresql
sudo su - postgres
createuser -DRSP puppetdb
