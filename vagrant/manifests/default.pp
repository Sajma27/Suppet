$puppetdb_host = 'puppet-db.home'
$postgres_host = 'postgres-db.home'

node 'puppet-master.home' {
  # Here we configure the Puppet master to use PuppetDB,
  # telling it the hostname of the PuppetDB node.
  class { 'puppetdb::master::config':
    puppetdb_server => $puppetdb_host,
  }
}

node 'postgres-db.home' {
  # Here we install and configure PostgreSQL and the PuppetDB
  # database instance, and tell PostgreSQL that it should
  # listen for connections to the `$postgres_host`.
  # We also enable SSL connections.
  class { 'puppetdb::database::postgresql':
    listen_addresses => $postgres_host,
    postgresql_ssl_on => true,
    puppetdb_server => $puppetdb_host
  }
}

node 'puppet-db.home' {
  # Here we install and configure PuppetDB, and tell it where to
  # find the PostgreSQL database. We also enable SSL connections.
  #class { 'puppetdb::server':
  #  database_host => $postgres_host,
  #  postgresql_ssl_on => true
  #}

  class { 'puppetdb': }
}
