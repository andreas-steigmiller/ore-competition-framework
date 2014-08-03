#!/bin/bash
if [ $# -gt 2 ]; then
	java -Xmx8g -cp ReasonerQueryEvaluator.jar org.semanticweb.ore.execution.CompetitionEvaluationClient $1 $2 $3
elif [ $# -gt 1 ]; then
	java -Xmx8g -cp ReasonerQueryEvaluator.jar org.semanticweb.ore.execution.CompetitionEvaluationClient $1 $2 default-config.dat
elif [ $# -gt 0 ]; then
	java -Xmx8g -cp ReasonerQueryEvaluator.jar org.semanticweb.ore.execution.CompetitionEvaluationClient $1 11010 default-config.dat
else
	echo "Insufficient or no parameters given."
	echo "Usage: 'sh scripts/client.sh <Address> [<Port> <ConfigFile>]', where"
	echo "	<Address> is the address of the competition server."	
	echo "	<Port> is the port for which the server is listening for clients (default port is 11010, which is automatically used if no port is specified)."
	echo "	<ConfigFile> is the path to the configuration file (default configuration file is 'default-config.dat', which is automatically used if no configuration file is specified)."	
fi