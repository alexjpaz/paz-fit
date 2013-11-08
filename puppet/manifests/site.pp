user { "apaz":
	ensure     => "present",
	managehome => true,
}

package { "tmux":
	ensure => "installed"
}

package { "npm":
	ensure => "installed"
}

package { "git":
	ensure => "installed"
}

package { "python-pip" :
	ensure => "installed"
}

package { "python-virtualenv" :
	ensure => "installed"
}

class { 'mongodb':
	service_enable => true
}

file {"/tmp/puppet-modules/pupet-modules.sh": 
	ensure =>present,
	owner=>'root',
	group=>'root',
	mode=>'777',
	source=>'puppet://puppet/manifests/puppet-modules.sh',
}

exec {"/tmp/puppet-modules/pupet-modules.sh":
	require=>File['/tmp/puppet-modules/pupet-modules.sh'],
}
