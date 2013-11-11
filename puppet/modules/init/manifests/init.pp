file {"/tmp/puppet-modules/pupet-modules.sh": 
	ensure =>present,
	owner=>'root',
	group=>'root',
	mode=>'777',
	source=>'puppet://puppet/init/puppet-modules.sh',
}

exec {"/tmp/puppet-modules/pupet-modules.sh":
	require=>File['/tmp/puppet-modules/pupet-modules.sh'],
}
