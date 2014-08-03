#!/bin/bash
if [ $# -gt 2 ]; then
	java -Xmx8g -cp ReasonerQueryEvaluator.jar org.semanticweb.ore.execution.CompetitionEvaluationServer $2 $1 $3
elif [ $# -gt 1 ]; then
	java -Xmx8g -cp ReasonerQueryEvaluator.jar org.semanticweb.ore.execution.CompetitionEvaluationServer $2 $1 default-config.dat
elif [ $# -gt 0 ]; then
	java -Xmx8g -cp ReasonerQueryEvaluator.jar org.semanticweb.ore.execution.CompetitionEvaluationServer $2 11010 default-config.dat
else
	echo "Insufficient or no parameters given."
	echo "Usage: 'sh scripts/competition-server.sh <CompetitionFile> [<Port> <ConfigFile>]', where"
	echo "	<CompetitionFile> is the path to the competition file."	
	echo "	<Port> is the port for which the server is listening for clients that execute evaluation tasks (default port is 11010, which is automatically used if no port is specified). Note that the subsequent port of <Port> is used for listening to clients to which the status updates are streamed."
	echo "	<ConfigFile> is the path to the configuration file (default configuration file is 'default-config.dat', which is automatically used if no configuration file is specified)."	
fi