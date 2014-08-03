#!/bin/bash
java -Xmx8g -cp ReasonerQueryEvaluator.jar org.semanticweb.ore.execution.CompetitionEvaluationServer 11010 test-el-classification-linux.dat test-dl-classification-linux.dat default-config.dat
