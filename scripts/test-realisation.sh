#!/bin/bash
if [ $# -gt 0 ]; then
	java -Xmx8g -jar ReasonerQueryEvaluator.jar realisation $1
else
	echo "Insufficient or no parameters given."
	echo "Usage: 'sh test-realisation.sh <reasoner>', where"
	echo "	<reasoner> is the path to the reasoner data file, or the name of the reasoner's subdirectory in the 'data/reasoners/' folder."
fi