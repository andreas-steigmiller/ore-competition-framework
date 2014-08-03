#!/bin/bash
if [ $# -gt 0 ]; then
	java -Xmx8g -jar ReasonerQueryEvaluator.jar classification $1
else
	echo "Insufficient or no parameters given."
	echo "Usage: 'sh test-classification.sh <reasoner>', where"
	echo "	<reasoner> is the path to the reasoner data file, or the name of the reasoner's subdirectory in the 'data/reasoners/' folder."
fi