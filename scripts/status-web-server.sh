#!/bin/bash
if [ $# -gt 3 ]; then
	java -Xmx8g -cp ReasonerQueryEvaluator.jar org.semanticweb.ore.wep.CompetitionStatusWebPageServer $1 $2 $3 $4
elif [ $# -gt 2 ]; then
	java -Xmx8g -cp ReasonerQueryEvaluator.jar org.semanticweb.ore.wep.CompetitionStatusWebPageServer $1 $2 $3 default-config.dat
elif [ $# -gt 1 ]; then
	java -Xmx8g -cp ReasonerQueryEvaluator.jar org.semanticweb.ore.wep.CompetitionStatusWebPageServer $1 $2 8008 default-config.dat
elif [ $# -gt 0 ]; then
	java -Xmx8g -cp ReasonerQueryEvaluator.jar org.semanticweb.ore.wep.CompetitionStatusWebPageServer $1 11011 8008 default-config.dat
else
	echo "Insufficient or no parameters given."
	echo "Usage: 'sh scripts/status-web-server.sh <Address> [<Port> <WebPort> <ConfigFile>]', where"
	echo "	<Address> is the address of the competition server."
	echo "	<Port> is the port for which the server is listening for clients to which the results can be streamed (default port is 11011, which is automatically used if no port is specified). Note that the port that is specified for the competition server is for the clients that execute the evaluation and the subsequent port is for the client to which the status updates are streamed (which is required here)."
	echo "	<WebPort> is the port for which the web server is listening for clients (default port is 8008, which is automatically used if no port is specified)."
	echo "	<ConfigFile> is the path to the configuration file (default configuration file is 'default-config.dat', which is automatically used if no configuration file is specified)."	
fi