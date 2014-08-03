#!/bin/bash
if [ $# -gt 1 ]; then
	java -Xmx8g -cp ReasonerQueryEvaluator.jar org.semanticweb.ore.execution.CompetitionEvaluationClient 127.0.0.1 $1 $2
elif [ $# -gt 0 ]; then
	java -Xmx8g -cp ReasonerQueryEvaluator.jar org.semanticweb.ore.execution.CompetitionEvaluationClient 127.0.0.1 $1 default-config.dat
else
	java -Xmx8g -cp ReasonerQueryEvaluator.jar org.semanticweb.ore.execution.CompetitionEvaluationClient 127.0.0.1 11010 default-config.dat
fi