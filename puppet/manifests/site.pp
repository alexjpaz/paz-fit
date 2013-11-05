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

file {"/tmp/puppet-modules/pupet-modules.sh": 
	ensure =>present,
	owner=>'root',
	group=>'root',
	mode=>'777',
	source=>'puppet://puppet/files/puppet-modules.sh',
}

exec {"/tmp/puppet-modules/pupet-modules.sh":
	require=>File['/tmp/puppet-modules/pupet-modules.sh'],
}

class { 'mongodb':
	#enable_10gen => true,
}
