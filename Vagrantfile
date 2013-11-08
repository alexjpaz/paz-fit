Vagrant.configure("2") do |config|
	config.vm.box = "base"
	config.vm.box_url = "http://files.vagrantup.com/precise32.box"
	config.vm.provision :puppet do |puppet|
		puppet.manifests_path = 'puppet/manifests'
		puppet.manifest_file = 'site.pp'
		puppet.module_path = 'puppet/modules'
	end
	config.vm.network :forwarded_port, host: 8080, guest: 8080
	#	config.vm.share_folder "", "/guest/path", "/host/path"
end
