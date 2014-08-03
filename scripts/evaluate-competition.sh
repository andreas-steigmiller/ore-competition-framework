#!/bin/bash
if [ $# -gt 1 ]; then
	java -Xmx8g -cp ReasonerQueryEvaluator.jar org.semanticweb.ore.execution.CompetitionEvaluator $1 $2
elif [ $# -gt 0 ]; then
	java -Xmx8g -cp ReasonerQueryEvaluator.jar org.semanticweb.ore.execution.CompetitionEvaluator $1 default-config.dat
else
	echo "Insufficient or no parameters given."
	echo "Usage: 'sh scripts/evaluate-competition.sh <CompetitionFile>', where"
	echo "	<CompetitionFile> is the path to the competition file"
fi