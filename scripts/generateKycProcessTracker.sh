#!/bin/bash

contracts=../contracts
homedir=.

solc --overwrite ${contracts}/platform/kyc/KycProcessTracker.sol --bin --abi --optimize -o ${homedir}/solc-output/ --allow-paths ${contracts}/libs/ownership,${contracts}/libs,${contracts}/governance,${contracts}/platform,${contracts}/platform/kyc,${contracts}/whitelist
web3j solidity generate --javaTypes -b ${homedir}/solc-output/KycProcessTracker.bin -a ${homedir}/solc-output/KycProcessTracker.abi -o ${homedir}/java-output -p com.bitcar.api.contract
