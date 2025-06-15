echo 'deb http://download.opensuse.org/repositories/shells:/fish:/release:/4/Debian_12/ /' |  tee /etc/apt/sources.list.d/shells:fish:release:4.list
curl -fsSL https://download.opensuse.org/repositories/shells:fish:release:4/Debian_12/Release.key | gpg --dearmor |  tee /etc/apt/trusted.gpg.d/shells_fish_release_4.gpg > /dev/null
 apt update
 apt install fish