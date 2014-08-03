#!/bin/bash
if [ $# -gt 2 ]; then
	java -Xmx8g -cp ReasonerQueryEvaluator.jar org.semanticweb.ore.wep.CompetitionStatusWebPageServer 127.0.0.1 $1 $2 $3
elif [ $# -gt 1 ]; then
	java -Xmx8g -cp ReasonerQueryEvaluator.jar org.semanticweb.ore.wep.CompetitionStatusWebPageServer 127.0.0.1 $1 $2 default-config.dat
elif [ $# -gt 0 ]; then
	java -Xmx8g -cp ReasonerQueryEvaluator.jar org.semanticweb.ore.wep.CompetitionStatusWebPageServer 127.0.0.1 $1 8008 default-config.dat
else
	java -Xmx8g -cp ReasonerQueryEvaluator.jar org.semanticweb.ore.wep.CompetitionStatusWebPageServer 127.0.0.1 11011 8008 default-config.dat
fi